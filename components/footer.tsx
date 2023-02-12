import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="pt-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            What will you build with <br /> <span className="text-[#375bd2]">Chainlink</span> Functions?
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://github.com/bryanjowers/usechainlinkfunctions#add-your-own-example-to-the-site"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
              target="_blank"
            >
              Add Your Own Example
            </a>
            <a
              href={`https://docs.chain.link`}
              target="_blank"
              className="mx-3 font-bold hover:underline"
            >
              Read Chainlink Docs
            </a>
          </div>
        </div>
        <div className="pb-28 pt-10 w-full text-center lg:text-left px-10 lg:px-0 lg:w-1/3 tracking-tighter leading-tight text-slate-400	">Code examples on this site are contributed by the community and have not been audited. Use at your own risk. This site was an independent weekend hack project to inspire the community.</div>
      </Container>
    </footer>
  )
}

export default Footer
