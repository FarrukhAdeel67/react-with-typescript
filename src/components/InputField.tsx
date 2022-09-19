import React from 'react'

import "./style.css";
interface Props {
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>
}
const InputField:React.FC <Props> = ({todo, setTodo}) => {
  return (
    <form className='input'>
        <input type="input"
        value={todo}
        onChange= {(e)=>{
            setTodo(e.target.value)
        }}
        placeholder='Enter a tast'
         className='input__box' />
        <button className='input_submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField