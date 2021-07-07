import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/FontAwesome5'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 80%;
  height: 55px;
  padding: 0 16px;
  background: ${props => props.theme.colors.inputBackground};
  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.background};
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #3a3836;
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${props => props.theme.colors.inputTextColor};
  font-size: 16px;
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
