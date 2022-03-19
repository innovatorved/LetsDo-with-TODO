import { createContext, useState } from 'react';

// Createcontext
const StateManager = createContext();


const States = (props) => {

    const [userInfo , setUserInfo] = useState({
        name : '',
    });

    const list = [];

    const [data , setData] = useState(list);

    const AddData = (note) =>{
        const add = {
            name : note.name,
            msg : note.msg,
            timestamp : note.time,
            state : false
        };
        setData(data => [add ,...data]);
    }

    const changeState=(index)=>{
        const exactIndex = index;
        const newArray =  [...data];
        let ele = newArray[exactIndex]
        newArray[exactIndex] = {...ele , state : !ele.state }
        setData(newArray);
    }

    
    return (
        <StateManager.Provider value={{data , AddData , changeState , userInfo , setUserInfo}}>
            {props.children}
        </StateManager.Provider>
    )
}

export default States;
export {
    StateManager
};