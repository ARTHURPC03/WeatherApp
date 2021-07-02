import React from 'react'
import { TouchableOpacity } from 'react-native'
import { DashboardProps } from '../../routes/types'

import { Container, Text } from './styles'

function Dashboard({ navigation }: DashboardProps) {
  return (
    <Container>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default Dashboard
