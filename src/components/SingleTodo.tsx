import React, { useEffect, useRef, useState } from 'react';
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete, } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./style.css";
type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }: Props) => {
  //Edit function
  //we will use the states here for edit function
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  //handle done function
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
    )
  };
  //handle delete function
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  //handle edit function
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (
      todo.id === id ? { ...todo, todo: editTodo } : todo
    )));
    setEdit(false);
  }
  //use ref hook
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])
  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
      {
        edit ? (
          <input ref={inputRef} type="text" className='todos__single--text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
        ) : (
          todo.isDone ? (
            <s className="todos__single--text">
              {todo.todo}
            </s>
          ) : (
            <span className="todos__single--text">
              {todo.todo}
            </span>
          )
        )
      }




      <div>
        <span className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }

          }>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo