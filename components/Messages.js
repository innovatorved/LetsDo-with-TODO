import { useContext } from 'react';
import { StateManager } from '../context/data';

export default function Messages() {
    const { data, changeState } = useContext(StateManager);
    return (
        <div className='grid place-items-center my-10'>
            <div className=''>
                {
                    data.map((item, index) => {
                        return (
                            <div className='flex' key={index} >
                                <div className={`flex border-[1px] mt-2 rounded-lg py-2 px-2 w-52 sm:w-64 md:w-80 mr-3 ${item.state?"bg-indigo-500 text-violet-100  border-stone-500 font-sans":"border-stone-400 cursor-pointer font-serif"}`}>
                                    {
                                        item.state ?
                                        <del htmlFor={`formsg${index}`} className="pr-2">{item.msg}</del>
                                        :
                                        <label htmlFor={`formsg${index}`} className="pr-2">{item.msg}</label>
                                    }
                                </div>
                                <input className='m-auto w-6 h-6 cursor-pointer text-orange-800' type="checkbox" name={`formsg${index}`} checked={item.state} onClick={
                                    () => changeState(index)
                                } readOnly/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
