import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      primary: string

      background: string
      switcherBackground: string
      text: string

      tabBarActiveBackgroundColor: string
      tabBarIconInactiveColor: string

      inputBackground: string
      inputTextColor: string
      inputIconFill: string
      inputIconNotFill: string
      inputFocusBorderColor: string
    }
  }
}
