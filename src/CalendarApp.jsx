import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes'
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux'
import { store } from './store'

const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle/>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default CalendarApp

 
const GlobalStyle = createGlobalStyle`
  * {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
