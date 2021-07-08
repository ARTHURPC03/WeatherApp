import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { useTheme } from '../../hooks/theme'

import { Container, Button, Image } from './styles'

import Image01d from '../../assets/Weather/01d/01d.png'
import Image01n from '../../assets/Weather/01n/01n.png'

const ThemeSwitcher: React.FC = () => {
  const { title } = useContext(ThemeContext)
  const { toggleTheme } = useTheme()

  return (
    <Container>
      <Button onPress={toggleTheme}>
        {title === 'light' ? (
          <Image source={Image01d} />
        ) : (
          <Image source={Image01n} />
        )}
      </Button>
    </Container>
  )
}

export default ThemeSwitcher
