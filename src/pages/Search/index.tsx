import React, { useCallback, useContext, useRef, useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'

import Input from '../../components/Input'
import ThemeSwitcher from '../../components/ThemeSwitcher'

import api from '../../services/api'
import * as Yup from 'yup'

import WeatherData from '../../types/WeatherData'

import {
  ActivityContainer,
  Container,
  Header,
  ImageView,
  Image,
  Main,
  Temperature,
  TemperatureText,
  Text,
  Content,
} from './styles'
import getValidationErrors from '../../utils/getValidationErrors'
import weatherImage from '../../utils/weatherImage'
import { ThemeContext } from 'styled-components'
import { capitalize } from '../../utils/capitalize'

interface SearchFormData {
  search: string
}

function Search() {
  const formRef = useRef<FormHandles>(null)
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null)
  const [loadingData, setLoadingData] = useState(false)

  const { colors } = useContext(ThemeContext)

  const handleSearch = useCallback(async (data: SearchFormData) => {
    try {
      setLoadingData(true)
      console.log(data, 'handleSearch')
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        search: Yup.string().required('Digite o nome de uma cidade'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      const response = await api.get(
        `/weather?q=${data.search}&appid=b0e004dd3e03d8de5555236297c8926c&units=metric&lang=pt_br`,
      )
      setWeatherData(response.data)
      setLoadingData(false)
    } catch (err) {
      setLoadingData(false)
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)

        return
      }

      if (err.response?.data?.message === 'city not found') {
        formRef.current?.setErrors({
          search: 'Cidade não encontrada',
        })

        Alert.alert(
          'Cidade não encontrada',
          'Confira o nome da cidade e tente novamente',
        )
        return
      }

      Alert.alert(
        'Erro na busca',
        'Ocorreu um erro ao buscar uma cidade, tente novamente',
      )
    }
  }, [])

  return (
    <Container>
      <Header>
        <Text>Buscar por cidade</Text>
        <ThemeSwitcher />
      </Header>
      <Main>
        <Form ref={formRef} onSubmit={handleSearch}>
          <Input
            name="search"
            icon="search-location"
            placeholder="Madrid"
            onSubmitEditing={() => {
              formRef.current?.submitForm()
            }}
          />
        </Form>

        {!loadingData ? (
          <>
            {weatherData?.main.temp && weatherData?.weather[0].description && (
              <Content>
                <ImageView>
                  {weatherData?.weather[0].icon && (
                    <Image
                      source={weatherImage(weatherData?.weather[0].icon)}
                      style={{ width: 250, height: 250 }}
                    />
                  )}
                </ImageView>
                <Temperature>
                  <Text>
                    {weatherData.name}, {weatherData.sys.country}
                  </Text>
                  <Text>{capitalize(weatherData?.weather[0].description)}</Text>
                  <TemperatureText>
                    {weatherData?.main.temp.toFixed(0)}
                    <TemperatureText style={{ color: colors.primary }}>
                      º
                    </TemperatureText>
                  </TemperatureText>
                </Temperature>
              </Content>
            )}
          </>
        ) : (
          <ActivityContainer>
            <ActivityIndicator size="large" color={colors.text} />
          </ActivityContainer>
        )}
      </Main>
    </Container>
  )
}

export default Search