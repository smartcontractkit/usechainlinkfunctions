import { CMS_NAME } from '../lib/constants'
import Link from 'next/link'

import Image from 'next/image'

const Intro = () => {
  return (
    <section className="flex-col md:flex-col flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <Link href="/" className="hover:none">

        <h1 className="whitespace-nowrap xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-bold tracking-tighter leading-tight ">
          use
          <span className="text-[#375bd2]">Chainlink</span>
          Functions<span className="relative top-[-8px] xl:top-[-14px] lg:top-[-12px] md:top-[-10px] sm:top-[-10px] xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl">(</span>
          <Image
            src="/assets/blog/dynamic-routing/linklogo.png"
            alt=""
            width={70}
            height={70}
            className="w-7 md:w-10 lg:w-16 xl:w-20 relative top-[-8px] xl:top-[-14px] lg:top-[-12px] md:top-[-10px] sm:top-[-10px] xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl"
            style={{
              display: 'inline',
              position: 'relative',
            }}
          />
          <span className="relative top-[-8px] xl:top-[-14px] lg:top-[-12px] md:top-[-10px] sm:top-[-10px] xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl">)</span>

        </h1>
      </Link>
      <h4 className="text-center md:text-left text-lg mt-5 px-20">
        Collection of community submitted examples for {' '}
        <a
          href="https://chain.link/functions"
          className="underline hover:text-blue-600 duration-200 transition-colors"
          target="_blank"
        >
          Chainlink Functions
        </a>
      </h4>
    </section>
  )
}

export default Intro
