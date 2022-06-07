// import React from "react";

// function Rank(props) {
//   return <div>Rank</div>;
// }

// export default React.memo(Rank);
import AddTask from "./components/AddTask.js";
import TaskList from "./components/TaskList.js";
import { TasksProvider } from "./components/TasksContext.js";

export default function TaskApp() {
  console.log(222);
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
