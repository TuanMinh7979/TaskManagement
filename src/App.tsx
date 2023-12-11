import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./pages/ListPage";

import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { taskType } from "./Types";

function App() {
  // const taskList = useSelector(
  //   (state: RootState) => state.taskList.currentTaskGroups
  // );

  // useEffect(() => {
  //   let rs = taskList.find((el: any) => el.editMode);
  //   const onClick = (event: any) => {
  //     if (
  //       rs?.id != event.target.parentNode.id &&
  //       rs?.id != event.target.id &&
  //       event.target.tagName != "INPUT"
  //     ) {
  //       event.stopImmediatePropagation();
  //       event.preventDefault();
  //       event.stopPropagation();
  //       alert("please complete task group title before");
  //       return false;
  //     }
  //   };
  //   if (rs?.editMode) {
  //     window.addEventListener("mousedown", onClick);
  //   }
  //   return () => {
  //     window.removeEventListener("mousedown", onClick);
  //   };
  // }, [taskList.length, taskList]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<ListPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
