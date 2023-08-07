import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../stylesheets/main.css";
import { useDispatch, useSelector } from "react-redux";
import { editTask, updateTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";

const status = ["unstarted", "inprogress", "completed"];

function TaskEdit() {
  const task = useSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title } = useParams();
  const [old] = task.filter((task) => task.title == title);

  const [newtitle, setNewTitle] = useState(old.title);
  const [newdescription, setNewDescription] = useState(old.description);
  const [newstatus, setNewStatus] = useState(old.status);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      currenttitle: title,
      updateTask: {
        title: newtitle,
        description: newdescription,
        status: newstatus,
      },
    };
    console.log(data);

    await dispatch(editTask(data));

    navigate("/");
  };

  return (
    <div>
      <h1 className="page-header">Edit Task</h1>
      <p>{title}</p>
      <div
        className="form-row"
        style={{ flexDirection: "column", justifyContent: "space-around" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div className="form-item">
            <label for="title">
              Title
              <input
                type="text"
                id="title"
                value={newtitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </label>
          </div>
          <div
            className="form-item
          "
          >
            <label for="status">
              Status
              <select
                onChange={(e) => setNewStatus(e.target.value)}
                value={newstatus}
              >
                {status.map((stage) => (
                  <option value={stage}>{stage}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div>
          <div
            className="form-item"
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <label for="description">
              Description
              <textarea
                type="text"
                id="description"
                value={newdescription}
                onChange={(e) => setNewDescription(e.target.value)}
              ></textarea>
            </label>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <button className="btn btn-danger" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default TaskEdit;
