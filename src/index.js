import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
require('@babel/polyfill')

const root = createRoot(document.getElementById('app'))

root.render(<App />)
