import React from 'react'
import './App.css'
import GlobalStyle from './config/GlobalStyle'
import Routes from './config/routes'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './config/themes'

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  )
}

export default App
