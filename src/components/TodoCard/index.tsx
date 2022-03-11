import { Todo } from "../../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import './styles.css'
import { useEffect, useRef, useState } from "react";


interface Props {
  todo: Todo;
  todoList: Todo[]
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoCard: React.FC<Props> = ({ todo, todoList, setTodoList }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);



  const handleDone = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      ))
  }

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(
      todoList.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);

  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])



  return (
    <form className="todos__card" onSubmit={(e) => handleEdit(e, todo.id)}>
      {
        edit ? (
          <input
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todo__card--text"
          />
        ) : (
          todo.isDone ? (<s className="todos__card--text">{todo.todo}</s>) :
            (<span className="todos__card--text">{todo.todo}</span>)

        )
      }




      <div>
        <span className="icon"><AiFillEdit onClick={() => {
          if (!edit && !todo.isDone) {
            setEdit(!edit);
          }
        }} /></span>
        <span className="icon"><AiFillDelete onClick={() => handleDelete(todo.id)} /></span>
        <span className="icon"><MdDone onClick={() => handleDone(todo.id)} /></span>
      </div>


    </form>
  )
}

export default TodoCard;