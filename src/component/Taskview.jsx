import React from "react";
import { Link, useParams } from "react-router-dom";
import "../stylesheets/main.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, removeTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";

function Taskview() {
  const task = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title } = useParams();
  const [current] = task.filter((task) => task.title == title);
  console.log("yo");
  console.log(title);

  const handleDelete = async () => {
    console.log(title);
    await dispatch(deleteTask(title));
    dispatch(removeTask);
    navigate("/");
  };

  return (
    <div>
      <h1 className="page-header"> {current.title}</h1>
      <p> {current.description}</p>
      <p> {current.status}</p>

      <div className="btn-row">
        <Link className="btn btn-primary" to={"/task/edit/" + current.title}>
          Edit
        </Link>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Taskview;
