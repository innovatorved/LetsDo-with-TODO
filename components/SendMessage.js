import React, { useState, useContext } from 'react';
import Image from 'next/image';

import { StateManager } from '../context/data';
import Router from 'next/router';

export default function SendMessage() {
    const { AddData , userInfo , LogOut} = useContext(StateManager);

    const [Plus, setPlus] = useState({
        height: 30,
        weigth: 30
    });

    const messageSubmitted = (e) => {
        e.preventDefault();
        const line = e.target.elements.message.value;
        if (line.trim() !== "" && line.trim() !== null) {
            const data2 = {
                name: userInfo.name,
                msg: line,
                time: new Date().toLocaleTimeString()
            }
            e.target.elements.message.value = '';
            AddData(
                data2
            );
        }
    }

    return (
        <div className='grid place-items-center'>
            <form className='mt-10' autoComplete='off' onSubmit={messageSubmitted}>
                <div className='flex justify-between mx-2 mb-5'>
                    <div>
                        Hi , <span className='font-medium text-indigo-700'>{userInfo.name}</span>
                    </div>
                    <div className='text-xs ml-2 cursor-pointer text-orange-500 font-medium hover:text-orange-600 pr-4' title='Logout'  onClick={()=>{
                        LogOut();
                        Router.push('/Login');
                    }}>
                        <Image src='/log.svg' alt="logo svg" width={Plus.weigth} height={Plus.height} />
                    </div>
                </div>
                <div className='flex'>
                    <div>
                        <label htmlFor="message">
                            <input type="text" name="message" className='inline outline-none border-[1px] w-96 h-10 rounded-md p-2 border-gray-400 focus:border-gray-600' />
                        </label>
                    </div>
                    <button type="submit" className='ml-3 mt-1'>
                        <Image
                            className='hover:rotate-[45deg] hover:opacity-90 '
                            alt='Submit send'
                            src="/plus.png"
                            width={Plus.height}
                            height={Plus.weigth} />
                    </button>
                </div>
            </form>
        </div>
    )
}
