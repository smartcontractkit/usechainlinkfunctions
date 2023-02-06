import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const About = () => {
    return (
        <div className="mt-10 mb-10 py-10 bg-neutral-50 border border-neutral-200 ">
            <Container>
                <div className="py-5 px-5 flex flex-col lg:flex-row items-center">
                    <div className=" lg:text-left lg:mb-0 lg:pr-4 lg:w-1/2">
                        <h3 className="text-3xl lg font-bold  tracking-tighter text-center lg:text-left mb-2 lg:mb-0 lg:pr-4" >
                            Get inspired from quick examples

                        </h3>
                        <h3 className="text-1xl font-normal tracking-tighter leading-tighttext-center lg:text-left mb-10 lg:mb-0">Chainlink just announced Chainlink Functions, a new self-service platform that allows anyone to write serverless code to fetch any data from any API and run custom compute on Chainlink's network. Learn from other's examples or contributer your own! < br/><a
                            href="https://chain.link/functions"
                            className="underline hover:text-blue-600 duration-200 transition-colors"
                        >
                            Jump to Chainlink Docs
                        </a>
                        </h3>

                    </div>

                    <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
                        <a
                            href="https://chain.link/functions"
                            className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
                        >
                            Add Your Own Example
                        </a>
                        {/* comment here  
                        <a
                            href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                            className="mx-3 font-bold hover:underline"
                        >
                            View on GitHub
                        </a>
*/}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default About
