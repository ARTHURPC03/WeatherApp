import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  background: ${props => props.theme.colors.background};
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 10%;
  width: 100%;
`

export const HeaderLocation = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
`

export const Main = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
`

export const ActivityContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const Text = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 25px;
  text-align: center;
  font-weight: bold;
`

export const Temperature = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const TemperatureText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 75px;
  text-align: center;
  font-weight: bold;
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  height: 30%;
  width: 100%;
  align-items: center;
`
