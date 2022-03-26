import React, { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import { StateManager } from '../context/data';
import Head from 'next/head';
import Link from 'next/link';


export default function login() {
    const { host } = useContext(StateManager);
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: ""
    })

    const [pass, setPass] = useState({
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            Router.push('/');
        }
    })

    const OnChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const ChangePass = (e) => {
        setPass({
            ...pass,
            [e.target.name]: e.target.value
        })
    };

    const CreateNewUser = (e) => {
        e.preventDefault();
        const user = {
            name: data.firstname + " " + data.lastname,
            username: data.username,
            email: data.email,
            password: pass.password
        }
        fetch(host + '/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(newUser => {
                if (newUser.success) {
                    localStorage.setItem('token', newUser.authtoken);
                    Router.push('/login');
                }
                else {
                    alert(newUser.error);
                }
            }
            )
    }



    return (
        <>
            <Head>
                <title>Create Acoount on TODO</title>
                <link rel="icon" href="/logonew.png" />
            </Head>
            <div className='pt-16'>
                <div className="flex items-center justify-center" >
                    <div className="xl:w-10/12 w-full px-8">
                        <div className="xl:px-24">
                            <div>
                                <img className="mx-auto h-12 w-auto" src="./plus.png" alt="Workflow" />
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Account in  <span className='text-indigo-600'>TODO</span></h2>
                            </div>
                            <div className="px-5 py-4 bg-gray-100 rounded-lg flex items-center justify-between mt-7">

                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19 9.99999H20C20.2652 9.99999 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 9.99999 4 9.99999H5V8.99999C5 8.08074 5.18106 7.17049 5.53284 6.32121C5.88463 5.47193 6.40024 4.70026 7.05025 4.05025C7.70026 3.40023 8.47194 2.88462 9.32122 2.53284C10.1705 2.18105 11.0807 1.99999 12 1.99999C12.9193 1.99999 13.8295 2.18105 14.6788 2.53284C15.5281 2.88462 16.2997 3.40023 16.9497 4.05025C17.5998 4.70026 18.1154 5.47193 18.4672 6.32121C18.8189 7.17049 19 8.08074 19 8.99999V9.99999ZM17 9.99999V8.99999C17 7.67391 16.4732 6.40214 15.5355 5.46446C14.5979 4.52678 13.3261 3.99999 12 3.99999C10.6739 3.99999 9.40215 4.52678 8.46447 5.46446C7.52678 6.40214 7 7.67391 7 8.99999V9.99999H17ZM11 14V18H13V14H11Z"
                                                fill="#4f46e5"
                                            />
                                        </svg>
                                    </div>

                                    <p className="text-sm text-gray-800 pl-3">We take privacy issues seriously. You can be sure that your personal data is securely protected.</p>
                                </div>
                                <button className="md:block hidden focus:outline-none focus:ring-2 focus:ring-gray-700 rounded">
                                    <svg aria-label="Close this banner" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.8337 5.34166L14.6587 4.16666L10.0003 8.825L5.34199 4.16666L4.16699 5.34166L8.82533 10L4.16699 14.6583L5.34199 15.8333L10.0003 11.175L14.6587 15.8333L15.8337 14.6583L11.1753 10L15.8337 5.34166Z" fill="#79808F" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={CreateNewUser}>
                                <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
                                    <div className="w-80">
                                        <div className="flex items-center">
                                            <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">Personal Information</h1>
                                        </div>
                                        <p className="mt-4 text-sm leading-5 text-gray-600">Information about the section could go here and a brief description of how this might be used.</p>
                                    </div>
                                    <div>
                                        <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                                            <div className="md:w-64">
                                                <label className="text-sm leading-none text-gray-800" id="firstName" >First name</label>
                                                <input type="name" tabIndex="0" value={data.firstname} onChange={OnChangeData} className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" name="firstname" aria-labelledby="firstName" placeholder="John" required={true} />
                                            </div>
                                            <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                                <label className="text-sm leading-none text-gray-800" id="lastName">Last name</label>
                                                <input type="name" tabIndex="0" value={data.lastname} onChange={OnChangeData} name="lastname" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="lastName" placeholder="Doe" required={true} />
                                            </div>
                                        </div>
                                        <div className="md:flex items-center lg:ml-24 mt-8">
                                            <div className="md:w-64">
                                                <label className="text-sm leading-none text-gray-800" id="username">Username</label>
                                                <input type="text" tabIndex="0" value={data.username} onChange={OnChangeData} name="username" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="username" placeholder="johndoe" required={true} />
                                            </div>
                                            <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                                <label className="text-sm leading-none text-gray-800" id="emailAddress">Email address</label>
                                                <input type="email" tabIndex="0" name="email" value={data.email} onChange={OnChangeData} className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="emailAddress" placeholder="youremail@example.com" required={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
                                    <div className="w-80">
                                        <div className="flex items-center">
                                            <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">Security</h1>
                                        </div>
                                        <p className="mt-4 text-sm leading-5 text-gray-600">Information about the section could go here and a brief description of how this might be used.</p>
                                    </div>
                                    <div>
                                        <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                                            <div className="md:w-64">
                                                <label className="text-sm leading-none text-gray-800" id="password">Password</label>
                                                <input type="password" tabIndex="0" name="password" value={pass.password} onChange={ChangePass} className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="password" minLength={8} placeholder="Enter your password" required={true} />
                                            </div>
                                            <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                                <label className="text-sm leading-none text-gray-800" id="confirmPassword">Confirm Password <span className={`${pass.password === pass.confirmPassword ? "hidden" : ""} font-serif mt-4 pl-4 text-sm leading-5 text-red-600`}>Not Matched !</span></label>
                                                <input type="password" tabIndex="0" name="confirmPassword" value={pass.confirmPassword} onChange={ChangePass} className={`${pass.password === pass.confirmPassword ? "" : "border-red-800"} w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800`} aria-labelledby="confirmPassword" placeholder="Confirm Your Password" minLength={8} required={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
                                    <div className="w-80">
                                        <Link href="/login">
                                            <button type="button" className="group relative w-64 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                    &gt;
                                                </span>
                                                SignIn
                                            </button>
                                        </Link>
                                    </div>
                                    <div>
                                        <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                                            <div className="md:w-64 md:mt-0 mt-4">
                                                <button type="submit" disabled={pass.password === pass.confirmPassword ? false : true} className={`${pass.password === pass.confirmPassword ? "hover:bg-indigo-700" : ""} group relative w-64 lg:w-96 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                        <svg className={`h-5 w-5 text-indigo-500 ${pass.password === pass.confirmPassword ? "group-hover:text-indigo-400" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>Create Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}