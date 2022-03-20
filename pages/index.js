import Head from 'next/head';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import { useEffect , useContext} from 'react';
import Router from 'next/router';

import { StateManager } from '../context/data';


export default function Home() {
  const {setUserInfo} = useContext(StateManager);

  useEffect(()=>{
    if (!localStorage.getItem('token')) {
      Router.push('/login');
    }
  })

  useEffect(async () => {
    if (localStorage.getItem('name') === null) {
        const tok = localStorage.getItem("token");
        const response = await fetch('http://localhost:3000/api/getUserInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': tok
            }
        });
        const data = await response.json();
        if (data.success) {
            setUserInfo(data.data);
            localStorage.setItem('name' , data.data.name);
            localStorage.setItem('username' , data.data.username);
        }
    }
    else{
        setUserInfo({
            name : localStorage.getItem("name"),
            username : localStorage.getItem("username")
        })
    }
  },[1])

  return (
    <div>
      <Head>
        <title>ToDo</title>
        <meta name="description" content="Let's Do : with ToDo" />
        <link rel="icon" href="/logonew.png" />
      </Head>

      <main className=''>
        <img
          className="h-auto mx-auto mt-24 cursor-pointer"
          src="/logo__1_-removebg-preview.png"
          alt='Contkt Logo'
          width={200}
          height={200}
        />
        <SendMessage />
        <Messages />
      </main>
    </div>
  )
}
