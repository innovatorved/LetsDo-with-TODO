import { createContext, useState, useEffect } from 'react';

// Createcontext
const StateManager = createContext();


const States = (props) => {

    const host = process.env.host || 'http://localhost:3000';

    const [userInfo, setUserInfo] = useState({
        name: '',
        username: ''
    });


    const list = [];

    const [data, setData] = useState(list);

    const LogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('username');
        setUserInfo({
            name: '',
            username: ''
        });
        setData([]);
    };

    const AddData = (note) => {
        const add = {
            msg: note.msg,
            timestamp: note.time,
            state: false
        };
        setData(data => [add, ...data]);
        fetch(host + "/api/todo/createone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authtoken: localStorage.getItem("token"),
            },
            body: JSON.stringify(add),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.success);
                }
            })
            .catch((err) => console.log(err));
    }

    const changeState = (index) => {
        const exactIndex = index;
        const newArray = [...data];
        let ele = newArray[exactIndex]
        newArray[exactIndex] = { ...ele, state: !ele.state }
        setData(newArray);
    }


    return (
        <StateManager.Provider value={{ host, data, setData , AddData, changeState, LogOut, userInfo, setUserInfo }}>
            {props.children}
        </StateManager.Provider>
    )
}

export default States;
export {
    StateManager
};