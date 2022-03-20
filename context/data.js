import { createContext, useState, useEffect } from 'react';

// Createcontext
const StateManager = createContext();


const States = (props) => {

    const [userInfo, setUserInfo] = useState({
        name: '',
        username:''
    });

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

    }, [1])


    const list = [];

    const [data, setData] = useState(list);

    const AddData = (note) => {
        const add = {
            name: note.name,
            msg: note.msg,
            timestamp: note.time,
            state: false
        };
        setData(data => [add, ...data]);
    }

    const changeState = (index) => {
        const exactIndex = index;
        const newArray = [...data];
        let ele = newArray[exactIndex]
        newArray[exactIndex] = { ...ele, state: !ele.state }
        setData(newArray);
    }


    return (
        <StateManager.Provider value={{ data, AddData, changeState, userInfo, setUserInfo }}>
            {props.children}
        </StateManager.Provider>
    )
}

export default States;
export {
    StateManager
};