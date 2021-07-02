import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  Dashboard: undefined
}

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>

export type DashboardProps = {
  navigation: DashboardScreenNavigationProp
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export type HomeProps = {
  navigation: HomeScreenNavigationProp
}
