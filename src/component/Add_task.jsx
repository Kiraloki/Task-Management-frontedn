import React from "react";
import { useState, useRef } from "react";
import "../stylesheets/main.css";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";

function Add_Task() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title: title, description: description };
    await dispatch(createTask(newTask));
    navigate("/");
  };

  return (
    <div className="newone">
      <h1 className="page-header">New Task</h1>
      <div className="form-row">
        <div className="form-item">
          <label for="title">
            Title
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label for="description">
            Description
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <button className="btn btn-primary" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Add_Task;
