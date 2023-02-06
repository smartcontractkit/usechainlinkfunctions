import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5fa97474da20bc75f63bfdc4_Chainlink-favicon-32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5fa97474da20bc75f63bfdc4_Chainlink-favicon-32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5fa97474da20bc75f63bfdc4_Chainlink-favicon-32.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5fa97474da20bc75f63bfdc4_Chainlink-favicon-32.png"
        color="#000000"
      />
      <link rel="shortcut icon" href="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5fa97474da20bc75f63bfdc4_Chainlink-favicon-32.png" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Powered by the Chainlink developer community. Quick and easy to understand code examples for Chainlink Functions. Browse or add your code to the gallery.`}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  )
}

export default Meta
