import { useEffect, useState } from "react";
import Category from "./Category.jsx";

function Planner() {

    const [category, setCategory] = useState('');

    const [tasks, setTasks] = useState(()=>{
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [newTask, setNewTask] = useState({
        title: '',
        status: false
    });

    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));   
    },[tasks]);


    function handleNewTask(e) {
        setNewTask(newTask => ({
            ...newTask,
            title: e.target.value
        }))
    }

    function handleTaskList() {

        const trimmedTitle = newTask.title.trim();

        if (!category) {
            alert("Please select a category first");
            return;
        }

        if (!trimmedTitle) {
            alert("Please enter a task");
            return;
        }

        const task = {
            id: Date.now(),
            title: newTask.title,
            status: false,
            category: category
        }

        setTasks(prevTasks => [...prevTasks, task]);
        setNewTask({
            title: '',
            status: false
        })

        setCategory('');
    }


    function handleDelete(id) {
        setTasks(prevTasks =>
            prevTasks.filter((task) => task.id !== id));
    }

    function handleStatus(id) {
        setTasks(prevTasks =>
            prevTasks.map((task) =>
                task.id === id ?
                    { ...task, status: !task.status } :
                    task
            )
        );
    }


    return (
        <div className="planner-container">
            <h2 className="heading">Productivity Planner</h2>
            <div className="category">
                <p>Choose one Category:</p>
                <div className="category-buttons">
                    <button className="work-btn" onClick={() => setCategory("work")}>
                        Work</button>
                    <button className="life-btn" onClick={() => setCategory("life")}>
                        Life</button>
                    <button className="other-btn" onClick={() => setCategory("other")}>
                        Other</button>
                </div>
            </div>
            <div className="input-area">
                <input type="text" placeholder="What needs my focus today?" value={newTask.title}
                    onChange={handleNewTask} />
                <button onClick={handleTaskList}>Add</button>
            </div>

            <div className="task-list">
                <Category
                    title="Work Space"
                    classname="work"
                    category="work"
                    tasks={tasks}
                    onDelete={handleDelete}
                    onToggle={handleStatus} />
                <Category
                    title="Life Space"
                    classname="life"
                    category="life"
                    tasks={tasks}
                    onDelete={handleDelete}
                    onToggle={handleStatus} />
                <Category
                    title="Other Space"
                    classname="other"
                    category="other"
                    tasks={tasks}
                    onDelete={handleDelete}
                    onToggle={handleStatus} />
            </div>

        </div>
    );
}

export default Planner;