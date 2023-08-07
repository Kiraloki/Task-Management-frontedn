import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInitialTasks = createAsyncThunk(
  "tasks/fetchInitialTasks",
  async () => {
    const response = await axios.get(
      "https://task-management-r5gv.onrender.com/api/v1/tasks"
    );
    return response.data.allTasks;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    const response = await axios.post(
      "https://task-management-r5gv.onrender.com/api/v1/tasks",
      taskData
    );

    // dispatch(addTask(taskData));

    return response.data;
  }
);

export const editTask = createAsyncThunk("tasks/updateTask", async (data) => {
  const { currenttitle, updateTask } = data;
  console.log(currenttitle, updateTask);
  const response = await axios.patch(
    `https://task-management-r5gv.onrender.com/api/v1/tasks/${currenttitle}`,
    updateTask
  );

  //   dispatch(updateTask(currenttitle, updateTask));
  console.log(response.data);
  return response.data;
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (tasktitle, { dispatch }) => {
    await axios.delete(
      `https://task-management-r5gv.onrender.com/api/v1/tasks/${tasktitle}`
    );

    dispatch(removeTask(tasktitle));
    return tasktitle;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { taskTitle, updateTask } = action.payload;
      const taskToUpdate = state.find((task) => task.title === taskTitle);

      if (taskToUpdate) {
        taskToUpdate = updateTask;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.title !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialTasks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchInitialTasks.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.tasks = action.payload;
      })
      .addCase(fetchInitialTasks.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addTask, updateTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
