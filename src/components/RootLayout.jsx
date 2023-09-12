import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducers } from '../reducers'
import '../index.css'
import Navbar from './Navbar/Navbar'
import { GoogleOAuthProvider } from '@react-oauth/google'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { GlobalVariablesProvider } from '../context/globalVariables'
import { Container, ThemeProvider, createTheme } from '@mui/material'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
// const store = configureStore({
//   reducer: reducers,
//   middleware: [...getDefaultMiddleware({
//       thunk: {
//           extraArgument: {getFirebase,getFirestore}
//       }
//   })],
// })

const theme = createTheme()

export default function RootLayout({ children }) {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="172814880951-g88h6lvoupkcgore600n9qt83oilascb.apps.googleusercontent.com">
            <GlobalVariablesProvider>
              <ThemeProvider theme={theme}>
                <Container>
                  <Navbar />
                  {children}
                </Container>
              </ThemeProvider>
            </GlobalVariablesProvider>
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </>
  )
}
