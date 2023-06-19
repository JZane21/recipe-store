import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'
import { SecondStoreProvider, StoreProvider } from './context/ContextProvider'

function App() {

  return (
    <>
    <StoreProvider>
      <SecondStoreProvider>
        <AppTheme>
          <BrowserRouter>
            <AppRouter/>
          </BrowserRouter>
        </AppTheme>
      </SecondStoreProvider>
    </StoreProvider>
    </>
  )
}

export default App
