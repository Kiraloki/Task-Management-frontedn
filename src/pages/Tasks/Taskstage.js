import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../stylesheets/main.css";
import Taskone from "../../component/Task";
import { useSelector } from "react-redux";

export default function Taskstage() {
  const { stage } = useParams();
  const [query, setQuery] = useState("");
  const task = useSelector((state) => state.tasks.tasks);

  const stagefilter = task.filter((task) => {
    return task.status == stage;
  });

  const filterdgenres = stagefilter.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

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
