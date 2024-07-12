import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import Loader from './components/Loader'
import './index.module.css'

const App = lazy(() => import('./App'))
const node = document.getElementById('root')
const root = createRoot(node)

root.render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </StrictMode>,
)
