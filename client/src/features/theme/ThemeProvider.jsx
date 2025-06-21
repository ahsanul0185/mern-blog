import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({children}) => {

  const {theme} = useSelector(state => state.themeR);

  return (
    <div data-theme={theme}>
        {children}
    </div>
  )
}

export default ThemeProvider