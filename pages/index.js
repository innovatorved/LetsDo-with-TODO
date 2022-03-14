import Head from 'next/head';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ToDo</title>
        <meta name="description" content="Let's Do : with ToDo" />
        <link rel="icon" href="/logonew.png" />
      </Head>

        <img
          className="h-auto mx-auto mt-24 cursor-pointer"
          src="/logo__1_-removebg-preview.png"
          alt='Contkt Logo'
          width={200}
          height={200}
        />

      <main className=''>
        <SendMessage/>
        <Messages/>
      </main>
    </div>
  )
}
