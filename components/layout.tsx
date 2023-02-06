import Alert from './alert'
import Intro from './intro'
import Footer from './footer'
import About from './about'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview}/>
        <Intro />
        <About/>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
