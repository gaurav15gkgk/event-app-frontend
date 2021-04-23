import MainRouter from './MainRouter'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
        <MainRouter />
    </BrowserRouter>
  )
}
