import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`
export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: ${props => props.theme.colors.switcherBackground};
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 5px black;
`

export const Image = styled.Image`
  width: 60px;
  height: 60px;
`
