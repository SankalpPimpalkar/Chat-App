import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'
import RoomContextProvider from './context/RoomContext.jsx'
import SocketProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <RoomContextProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </RoomContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
