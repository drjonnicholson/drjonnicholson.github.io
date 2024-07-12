// import { StrictMode, Suspense, lazy } from 'react'
// import Loader from './components/Loader'
import App from './App'
import './index.module.css'
import { createRoot } from 'react-dom/client'

// const App = lazy(() => import('./App'))
const node = document.getElementById('root')
const root = createRoot(node)

// root.render(
//   <StrictMode>
//     <Suspense fallback={<Loader />}>
//       <App />
//     </Suspense>
//   </StrictMode>,
// )

// root.render(
//   <Suspense fallback={<Loader />}>
//     <App />
//   </Suspense>,
// )

root.render(<App />)
