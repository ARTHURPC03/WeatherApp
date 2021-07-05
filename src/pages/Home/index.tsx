import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native'

import { HomeProps } from '../../routes/types'

import {
  Container,
  Footer,
  Header,
  Main,
  Temperature,
  TemperatureText,
  Text,
} from './styles'

import Geolocation from 'react-native-geolocation-service'

import appConfig from '../../../app.json'
import api from '../../services/api'
import { capitalize } from '../../utils/capitalize'

import CloudZap from '../../assets/CloudZap/CloudZap.png'
import WorldMap from '../../assets/WorldMap/WorldMap.png'

interface WeatherData {
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: -10800
  id: 3447779
  name: string
  cod: 200
}

function Home({ navigation }: HomeProps) {
  const [location, setLocation] = useState<Geolocation.GeoPosition | null>(null)
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (hasLocationPermission()) {
      getLocation()
    }
  }, [])

  useEffect(() => {
    console.log(location?.coords?.latitude, 'location?.coords?.latitude')

    if (location?.coords?.latitude && location?.coords?.longitude) {
      LoadWeatherData()
    }
  }, [location])

  async function LoadWeatherData() {
    setLoadingData(true)
    const { data } = await api.get(
      `/weather?lat=${location?.coords?.latitude}&lon=${location?.coords?.longitude}&appid=b0e004dd3e03d8de5555236297c8926c&units=metric&lang=pt_br`,
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
        console.log(position, 'position')
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
      <Header></Header>

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
        <Main>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Image source={CloudZap} style={{ width: 250, height: 250 }} />
          </View>
          {!loadingData &&
          weatherData?.main.temp &&
          weatherData?.weather[0].description ? (
            <Temperature>
              <Text>{capitalize(weatherData?.weather[0].description)}</Text>
              <TemperatureText>
                {weatherData?.main.temp.toFixed(0)}
                <TemperatureText style={{ color: '#FEEF0A' }}>
                  º
                </TemperatureText>
              </TemperatureText>
            </Temperature>
          ) : (
            <Temperature>
              <ActivityIndicator size="large" color="#fff" />
            </Temperature>
          )}

          <TouchableOpacity
            style={{ backgroundColor: '#333', padding: 10, borderRadius: 5 }}
            onPress={() => LoadWeatherData()}
          >
            <Text>Reload</Text>
          </TouchableOpacity>

          <Footer>
            <Text>Min: {weatherData?.main.temp_min.toFixed(0)}º</Text>
            <Text>Max: {weatherData?.main.temp_max.toFixed(0)}º</Text>
          </Footer>
        </Main>
      </ImageBackground>
    </Container>
  )
}

export default Home
