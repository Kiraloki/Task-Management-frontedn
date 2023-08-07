import "./stylesheets/main.css";
import { Routes, Route, Link } from "react-router-dom";
import Add_Task from "./component/Add_task";
import Tasks from "./pages/Tasks/tasks";
import Taskview from "./component/Taskview";
import TaskEdit from "./component/Taskedit";
import Taskstage from "./pages/Tasks/Taskstage";

function App() {
  return (
    <div className="App">
      <header>
        <nav className="header-nav">
          <Link className="header-title" to="/">
            Task Management
          </Link>
          <ul>
            <li>
              <Link className="navbs" to="/add_task">
                Add Task
              </Link>
            </li>
            <li>
              <Link className="navbs" to="/unstarted">
                Unstarted
              </Link>
            </li>
            <li>
              <Link className="navbs" to="/inprogress">
                InProgress
              </Link>
            </li>
            <li>
              <Link className="navbs" to="/completed">
                Completed
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/add_task" element={<Add_Task />} />
        <Route path="/task/view/:title" element={<Taskview />} />
        <Route path="/task/edit/:title" element={<TaskEdit />} />
        <Route path="/:stage" element={<Taskstage />} />
      </Routes>
    </div>
  );
}

export default App;
