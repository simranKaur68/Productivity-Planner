function Category({ title, classname, category, tasks, onDelete, onToggle, getCount }) {

    const categoryTasks = tasks.filter((task) =>
        task.category === category
    )

    const total = categoryTasks.length;

    const completed = categoryTasks.filter((task) =>
        task.status
    ).length;

    const pending = total - completed;


    return (
        <div className={classname}>
            <p className="title-head">{title}</p>
            <ul>
                {tasks.filter((task) => task.category === category)
                    .map((task) => (
                        <li key={task.id}>
                            <p className="text-title">{task.title}</p>
                            <button className={`done ${task.status ? "yes" : ""}`}
                                onClick={() => onToggle(task.id)}>
                                {task.status ? "Yes" : "Done?"}
                            </button>
                            <span onClick={() => onDelete(task.id)} className="cross-btn">✖</span>
                        </li>
                    ))}
            </ul>
            <div className="extra-info">
                <span>Total: {total}</span><br />
                <span>Completed: {completed}</span><br />
                <span>Pending: {pending}</span><br />
            </div>
        </div>
    );
}

export default Category;


