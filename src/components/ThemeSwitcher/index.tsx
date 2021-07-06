import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { useTheme } from '../../hooks/theme'

import { Container, Button } from './styles'

import Image01d from '../../assets/Weather/01d/01d.png'
import Image01n from '../../assets/Weather/01n/01n.png'
import { Image } from 'react-native'

const ThemeSwitcher: React.FC = () => {
  const { title } = useContext(ThemeContext)
  const { toggleTheme } = useTheme()

  return (
    <Container>
      <Button onPress={toggleTheme}>
        {title === 'light' ? (
          <Image source={Image01d} style={{ width: 60, height: 60 }} />
        ) : (
          <Image source={Image01n} style={{ width: 60, height: 60 }} />
        )}
      </Button>
    </Container>
  )
}

export default ThemeSwitcher
