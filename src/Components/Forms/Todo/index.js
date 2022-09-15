import { useEffect, useState } from "react";
import { FiTrash2, FiEdit, FiSave } from "react-icons/fi";
import "./Todo.css"

const todoInitialValue = { content: "", isCompleted: false, id: "", isEditible: false };

function Todo() {

    const [contents, setContents] = useState([]);
    const [todo, setTodo] = useState(todoInitialValue);
    const [changeTodo, setChangeTodo] = useState({});

    useEffect(() => {
        fetch("https://6319c72e6b4c78d91b4337fb.mockapi.io/todos")
            .then(res => res.json())
            .then(data => setContents(data));
    }, [])


    // ADD
    const addTodo = (e) => {
        e.preventDefault();

        fetch("https://6319c72e6b4c78d91b4337fb.mockapi.io/todos", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(res => res.json())
            .then(res => setContents([...contents, res]))
            .then(() => console.log("To Do Posted!"));

        setTodo(todoInitialValue);
    };


    // COMPLETED
    const isCompleted = async (clickedItem) => {
        setContents(prev => prev.map((item) => (item.id === clickedItem.id) ? { ...item, isCompleted: !item.isCompleted } : item));

        await fetch(`https://6319c72e6b4c78d91b4337fb.mockapi.io/todos/${clickedItem.id}`, {
            method: "PUT",
            body: JSON.stringify({ isCompleted: !clickedItem.isCompleted }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(res => res.json()).then(res => console.log(JSON.stringify(res)));
    };


    // DELETE
    const deleteTodo = async (id) => {
        setContents(prev => prev.filter((item) => (item.id !== id)));

        await fetch(`https://6319c72e6b4c78d91b4337fb.mockapi.io/todos/${id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(res => console.log(JSON.stringify(res)));
    };

    // EDIT
    const editTodo = async (id, content) => {
        setContents(prev => prev.map((item) => (item.id === id) ? { ...item, isEditible: !item.isEditible } : item));
        setChangeTodo(content);
        console.log(changeTodo)
    };

    const saveTodo = async (id) => {
        setContents(prev => prev.map((item) => (item.id === id) ? {
            ...item,
            content: changeTodo,
            isEditible: false,
            isCompleted: false
        } : item));

        await fetch(`https://6319c72e6b4c78d91b4337fb.mockapi.io/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({ content: changeTodo, isEditible: false, isCompleted: false }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(res => res.json()).then(res => console.log(JSON.stringify(res)));
    };

    return (
        <div className="TodoPage" >
            <div>
                <h1>To Do List</h1>

                <form>
                    <input onChange={(e) => setTodo({ ...todo, content: e.target.value })} value={todo.content} />
                    <button onClick={addTodo} >Add</button>
                </form>

                <div>
                    {
                        (contents).map((item, index) =>
                            <div className="content" key={index} >

                                {
                                    !item.isEditible
                                        ? <div className={`todo ${item.isCompleted}`} value={!item.isCompleted} onClick={() => isCompleted(item)}>
                                            {item.content}
                                        </div>
                                        : <form>
                                            <input onChange={(e) => setChangeTodo(e.target.value)} value={changeTodo} />
                                        </form>
                                }

                                <div className="buttons" >

                                    {
                                        !item.isEditible
                                            ? <FiEdit onClick={() => editTodo(item.id, item.content)} />
                                            : <FiSave onClick={() => saveTodo(item.id)} />
                                    }

                                    <FiTrash2 onClick={() => deleteTodo(item.id)} />
                                </div>

                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo