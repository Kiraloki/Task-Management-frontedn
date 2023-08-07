import React, { useEffect } from "react";
import { useState } from "react";
import "../../stylesheets/main.css";
import Taskone from "../../component/Task";
import { useSelector, useDispatch } from "react-redux";
import { fetchInitialTasks } from "../../redux/taskSlice";

export default function Tasks() {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.tasks);
  const [query, setQuery] = useState("");

  const filterdgenres = task.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchInitialTasks());
  }, [dispatch]);

  // console.log(task);

  return (
    <div className="newone">
      <h1 className="page-header">Search Tasks</h1>
      <div className="form-row">
        <div className="form-item">
          <label>
            Tasks
            <input
              type="text"
              id="task"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </label>
        </div>
      </div>

      {filterdgenres.map((item) => (
        <div className="author-row">
          <Taskone title={item.title} />
        </div>
      ))}
    </div>
  );
}
