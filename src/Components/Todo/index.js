import { useEffect, useState } from "react";
import { FiTrash2, FiEdit, FiSave } from "react-icons/fi";
import "./Todo.css";
import Loading from "../Loading/index.js";

const url = `https://6319c72e6b4c78d91b4337fb.mockapi.io/todos`
const todoInitialValue = { content: "", isCompleted: false, id: "", isEditible: false };

function Todo() {

    const [contents, setContents] = useState([]);
    const [todo, setTodo] = useState(todoInitialValue);
    const [changeTodo, setChangeTodo] = useState({});
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setContents(data))
            .then(() => setIsLoading(false));
    }, [])


    // ADD
    const addTodo = (e) => {
        e.preventDefault();

        if (todo.content.trim() === "") {
            setTodo(todoInitialValue);
            return setError("Field cannot be left blank");
        } else if (todo.content.toString().length < 4) {
            setTodo(todoInitialValue);
            return setError("Username must have 4 or more characters");
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(todo),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(res => res.json())
            .then(res => setContents([...contents, res]))
            .then(() => console.log("To Do Posted!"));

        setError("");
        setTodo(todoInitialValue);
    };


    // COMPLETED
    const isCompleted = async (clickedItem) => {
        setContents(prev => prev.map((item) => (item.id === clickedItem.id) ? { ...item, isCompleted: !item.isCompleted } : item));

        await fetch(`${url}/${clickedItem.id}`, {
            method: "PUT",
            body: JSON.stringify({ isCompleted: !clickedItem.isCompleted }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(res => res.json()).then(res => console.log(JSON.stringify(res)));
    };


    // DELETE
    const deleteTodo = async (id) => {
        setContents(prev => prev.filter((item) => (item.id !== id)));

        await fetch(`${url}/${id}`, {
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

        await fetch(`${url}/${id}`, {
            method: "PUT",
            body: JSON.stringify({ content: changeTodo, isEditible: false, isCompleted: false }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(res => res.json()).then(res => console.log(JSON.stringify(res)));

    };

    // FILTER
    const filter = (e) => {
        setSelectedFilter(e.target.value);
    };

    return (
        <div className="TodoPage" >
            <div>
                <h1>To Do List</h1>

                {(error === "") ? <div><br /></div> : <div className="error" >{error}</div>}

                <form>
                    <input onChange={(e) => setTodo({ ...todo, content: e.target.value })} value={todo.content} />
                    <button onClick={addTodo} >Add</button>
                </form>

                <select onChange={filter}>
                    <option value="All">All</option>
                    <option value="true" >Completed</option>
                    <option value="false" >Incompleted</option>
                </select>

                <div>

                    {isLoading ? <Loading /> :
                        contents.filter(item => item.isCompleted.toString() === selectedFilter || "All" === selectedFilter).map((item) =>
                            <div className="content" key={item.id} >

                                {
                                    !item.isEditible
                                        ? <div className={`todo ${item.isCompleted}`}
                                            value={!item.isCompleted}
                                            onClick={() => isCompleted(item)}>
                                            {item.content}
                                        </div>

                                        : <form>
                                            <input onChange={(e) => setChangeTodo(e.target.value)}
                                                value={changeTodo} />
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