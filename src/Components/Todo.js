import { useEffect, useState, useContext } from "react";
import { FiTrash2, FiEdit, FiSave } from "react-icons/fi";
import "./Todo.css";
import Loading from "./Loading.js";
import ThemeContext from "./Context/ThemeContext";

const url = `https://6319c72e6b4c78d91b4337fb.mockapi.io/todos`;

const todoInitialValue = {
    content: "",
    isCompleted: false, id: "",
    isEditible: false
};

function Todo() {

    const [contents, setContents] = useState([]);
    const [todo, setTodo] = useState(todoInitialValue);
    const [changeTodo, setChangeTodo] = useState({});
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setContents(data))
            .then(() => setIsLoading(false));
    }, [])

    // ADD
    const addTodo = (e) => {
        e.preventDefault();

        // ERROR
        if (todo.content.trim() === "") {
            setTodo(todoInitialValue);
            return setError("Field cannot be left blank");
        } else if (todo.content.toString().length < 4) {
            setTodo(todoInitialValue);
            return setError("Username must have 4 or more characters");
        }

        // POST
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
        console.log(changeTodo);
    };

    const saveTodo = async (id) => {
        setContents(prev => prev.map((item) => (item.id === id) ? {
            ...item,
            content: changeTodo,
            isEditible: false,
            isCompleted: false
        } : item));


        // PUT
        await fetch(`${url}/${id}`, {
            method: "PUT",
            body: JSON.stringify({ content: changeTodo, isEditible: false, isCompleted: false }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(res => res.json()).then(res => console.log(JSON.stringify(res)));

    };

    // FILTER
    const selection = (e) => {
        setSelectedFilter(e.target.value);
    };

    return (
        <>
            <div className="background">
                <div className={`shape ${theme === "light" ? "" : "dark"}`}></div>
                <div className={`shape ${theme === "light" ? "" : "dark"}`}></div>
            </div>

            <div className="todo-list-page">

                <h1>To Do List</h1>

                <div className="error" >
                    {(error === "") ? <div ><br /></div> : <div>{error}</div>}
                </div>

                <form className="todo-form">

                    <input
                        className={`todo-input ${theme === "light" ? "" : "dark"}`}
                        onChange={(e) => setTodo({ ...todo, content: e.target.value })}
                        value={todo.content}
                        placeholder="A New To Do" />

                    <button className={`todo-button ${theme === "light" ? "" : "dark"}`} onClick={addTodo} >Add</button>

                    <select className={`${theme === "light" ? "" : "dark"}`} onChange={selection}>
                        <option className={`${theme === "light" ? "" : "dark"}`} value="All">All</option>
                        <option className={`${theme === "light" ? "" : "dark"}`} value="true" >Completed</option>
                        <option className={`${theme === "light" ? "" : "dark"}`} value="false" >Incompleted</option>
                    </select>

                </form>
                {isLoading ? <Loading /> :
                    contents.filter(item =>
                        item.isCompleted.toString() === selectedFilter || "All" === selectedFilter).map((item) =>

                            <div className="todo-list" key={item.id} >

                                {
                                    !item.isEditible
                                        ? <div className={`todo ${item.isCompleted} ${theme === "light" ? "" : "dark"}`}
                                            value={!item.isCompleted}
                                            onClick={() => isCompleted(item)}>
                                            {item.content}
                                        </div>

                                        : <form>
                                            <input className={`edit-input ${item.isCompleted} ${theme === "light" ? "" : "dark"}`} onChange={(e) => setChangeTodo(e.target.value)}
                                                value={changeTodo} />
                                        </form>
                                }

                                <div className="ESDbuttons" >

                                    {
                                        !item.isEditible
                                            ? <FiEdit
                                                className={`ESDbutton ${theme === "light" ? "" : "dark"}`}
                                                onClick={() => editTodo(item.id, item.content)} />
                                            : <FiSave
                                                className={`ESDbutton ${theme === "light" ? "" : "dark"}`}
                                                onClick={() => saveTodo(item.id)} />
                                    }
                                    <FiTrash2
                                        className={`ESDbutton ${theme === "light" ? "" : "dark"}`}
                                        onClick={() => deleteTodo(item.id)} />
                                </div>
                            </div>)
                }

            </div>
        </>
    )
}

export default Todo