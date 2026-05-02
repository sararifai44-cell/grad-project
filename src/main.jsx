import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. استيراد الـ Provider من مكتبة react-redux
import { Provider } from 'react-redux'

// 2. استيراد الـ store الذي قمتِ بإنشائه في مجلد App
import { store } from './App/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. تغليف التطبيق بالـ Provider وتمرير الـ store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)