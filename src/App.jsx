import About from './components/About'
import Acclaim from './components/Acclaim'
import ErrorBoundary from './components/ErrorBoundary'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Header from './components/Header'
import Publications from './components/Publications'
import Skills from './components/Skills'

const App = () => {
  return (
    <ErrorBoundary>
      <Header />
      <main>
        <About />
        <Skills />
        <Experience />
        <Acclaim />
        <Publications />
      </main>
      <Footer />
    </ErrorBoundary>
  )
}

export default App
