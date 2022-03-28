import Head from 'next/head';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import { useEffect, useContext } from 'react';
import Router from 'next/router';
import { StateManager } from '../context/data';

export default function Home() {
  const { setUserInfo, LogOut, host, data, setData } = useContext(StateManager);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      LogOut();
      Router.push('/Login');
    }
  })

  useEffect(async() => {
    if (data.length === 0) {
      fetch(host + "/api/todo/fetchall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((dataNotes) => {
          const notes = [];
          if (dataNotes.success) {
            dataNotes.note.map((note) => {
              const state = localStorage.getItem(note._id);
              const add = {
                id : note._id,
                msg: note.main,
                timestamp: note.timestamp,
                state: state===null?false:state==="true"?true:false
              };
              notes.push(add);
            });
            // reverse notes
            notes.reverse();
            setData(notes);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);



  useEffect(async () => {
    if (localStorage.getItem('name') === null) {
      const tok = localStorage.getItem("token");
      const response = await fetch(host + '/api/getUserInfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': tok
        }
      });
      const data = await response.json();
      if (data.success) {
        setUserInfo(data.data);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('username', data.data.username);
      }
    }
    else {
      setUserInfo({
        name: localStorage.getItem("name"),
        username: localStorage.getItem("username")
      })
    }
  }, [])

  return (
    <div>
      <Head>
        <title>ToDo</title>
        <meta name="description" content="Let's Do : with ToDo" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/logonew.png" />
      </Head>

      

      <main className=''>
        <img
          className="h-auto mx-auto md:mt-24 mt-14 cursor-pointer"
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
