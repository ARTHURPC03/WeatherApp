import React from 'react'

import { ThemeProvider } from './theme'

const AppProvider: React.FC = ({ children }: any) => (
  <ThemeProvider>{children}</ThemeProvider>
)

export default AppProvider
