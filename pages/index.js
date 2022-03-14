import Head from 'next/head';
import SendMessage from '../components/SendMessage';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Contkt</title>
        <meta name="description" content="Contkt App : Online Messaging Application" />
        <link rel="icon" href="/logonew.png" />
      </Head>

        <img
          className="h-auto mx-auto mt-24 cursor-pointer"
          src="/logo__1_-removebg-preview.png"
          alt='Contkt Logo'
          width={200}
          height={200}
        />

      <main>
        <SendMessage/>
      </main>
    </div>
  )
}
