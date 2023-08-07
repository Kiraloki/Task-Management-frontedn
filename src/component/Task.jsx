import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/main.css";
import { deleteTask, removeTask } from "./../redux/taskSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Taskone({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    console.log(title);
    await dispatch(deleteTask(title));
    dispatch(removeTask);
    navigate("/");
  };

  return (
    <div className="author-row">
      <div className="author-name">{title}</div>

      <div className="btn-row">
        <Link className="btn btn-primary " to={"/task/view/" + title}>
          View
        </Link>

        <Link className="btn btn-primary" to={"/task/edit/" + title}>
          Edit
        </Link>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Taskone;
