import React from 'react'
import { TouchableOpacity } from 'react-native'
import { HomeProps } from '../../routes/types'

import { Container, Text } from './styles'

function Home({ navigation }: HomeProps) {
  return (
    <Container>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text>Go to Dashboard</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default Home
