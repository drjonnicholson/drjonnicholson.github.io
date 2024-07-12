import About from './components/About'
import Acclaim from './components/Acclaim'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Header from './components/Header'
import Publications from './components/Publications'
import Skills from './components/Skills'

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
