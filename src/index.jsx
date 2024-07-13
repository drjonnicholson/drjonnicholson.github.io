import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from './components/ErrorBoundary'
import Loader from './components/Loader'
import './index.module.css'

const App = lazy(() => import('./App'))
const node = document.getElementById('root')
const root = createRoot(node)

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
