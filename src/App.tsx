import 'react-native-gesture-handler'

import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'
import { StatusBar } from 'react-native'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Routes />
    </NavigationContainer>
  )
}

export default App
