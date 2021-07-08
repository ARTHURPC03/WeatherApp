import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  ImageBackground,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  ActivityContainer,
  Container,
  Footer,
  Header,
  HeaderLocation,
  Main,
  Temperature,
  TemperatureText,
  Text,
  Image,
  ImageView,
  ReloadButton,
} from './styles'

import Geolocation from 'react-native-geolocation-service'

import appConfig from '../../../app.json'
import api from '../../services/api'
import { capitalize } from '../../utils/capitalize'

import WorldMap from '../../assets/WorldMap/WorldMap.png'

import ThemeSwitcher from '../../components/ThemeSwitcher'
import { ThemeContext } from 'styled-components'
import WeatherData from '../../types/WeatherData'
import weatherImage from '../../utils/weatherImage'

import { WEATHER_API_KEY } from '@env'

function Home() {
  const [location, setLocation] = useState<Geolocation.GeoPosition | null>(null)
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null)
  const [loadingData, setLoadingData] = useState(false)

  const { colors } = useContext(ThemeContext)

  useEffect(() => {
    if (hasLocationPermission()) {
      getLocation()
    }
  }, [])

  useEffect(() => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      LoadWeatherData()
    }
  }, [location])

  async function LoadWeatherData() {
    setLoadingData(true)
    const { data } = await api.get(
      `/weather?lat=${location?.coords?.latitude}&lon=${location?.coords?.longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`,
    )
    setWeatherData(data)
    setLoadingData(false)
  }

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings')
      })
    }

    const status = await Geolocation.requestAuthorization('whenInUse')

    if (status === 'granted') {
      return true
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied')
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      )
    }

    return false
  }

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS()
      return hasPermission
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      )
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      )
    }

    return false
  }

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission()

    if (!hasPermission) {
      return
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position)
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message)
        setLocation(null)
        console.log(error, 'error')
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        // enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        // forceRequestLocation: forceLocation,
        // showLocationDialog: locationDialog,
      },
    )
  }

  return (
    <Container>
      <Header>
        {!loadingData && weatherData && (
          <View style={{ flexDirection: 'row' }}>
            <HeaderLocation style={{ fontWeight: 'bold' }}>
              {weatherData.name},
            </HeaderLocation>
            <HeaderLocation> {weatherData.sys.country}</HeaderLocation>
          </View>
        )}
        <ThemeSwitcher />
      </Header>

      <ImageBackground
        resizeMode="stretch"
        source={WorldMap}
        style={{
          width: '100%',
          height: '40%',
          flex: 1,
          alignItems: 'center',
        }}
      >
        {!loadingData ? (
          <Main>
            {weatherData?.main.temp && weatherData?.weather[0].description && (
              <Temperature>
                <ImageView>
                  {weatherData?.weather[0].icon && (
                    <Image
                      source={weatherImage(weatherData?.weather[0].icon)}
                    />
                  )}
                </ImageView>
                <Text>{capitalize(weatherData?.weather[0].description)}</Text>
                <TemperatureText>
                  {weatherData?.main.temp.toFixed(0)}
                  <TemperatureText style={{ color: colors.primary }}>
                    º
                  </TemperatureText>
                </TemperatureText>
                <ReloadButton onPress={() => LoadWeatherData()}>
                  <Icon name="reload-circle" size={75} color={colors.primary} />
                </ReloadButton>
              </Temperature>
            )}

            <Footer>
              {weatherData?.main && (
                <>
                  <Text>
                    Min: {weatherData?.main.temp_min.toFixed(0)}
                    <Text style={{ color: colors.primary }}>º</Text>
                  </Text>
                  <Text>
                    Max: {weatherData?.main.temp_max.toFixed(0)}
                    <Text style={{ color: colors.primary }}>º</Text>
                  </Text>
                </>
              )}
            </Footer>
          </Main>
        ) : (
          <ActivityContainer>
            <ActivityIndicator size="large" color={colors.text} />
          </ActivityContainer>
        )}
      </ImageBackground>
    </Container>
  )
}

export default Home
