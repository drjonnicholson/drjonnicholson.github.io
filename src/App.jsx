import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'
import Skills from './components/Skills'
import Publications from './components/Publications'
import Acclaim from './components/Acclaim'
import Experience from './components/Experience'

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <About />
        <Skills />
        <Experience />
        <Acclaim />
        <Publications />
      </main>
      <Footer />
    </div>
  )
}

export default App
