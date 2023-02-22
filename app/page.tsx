"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Script from "next/script";
import { useState } from "react";
import TodoAddText from "./todo-add-textbox";
import Todolist from "./todo-list";
import { v4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });
type Tasks = {
  id: string;
  task: string;
  status: string;
};

export default function Home() {
  const [todoValue, setTodoValue] = useState("");

  const [taskData, setTaskData] = useState([
    { id: "1", task: "Buy groceries for next week", status: "pending" },
    { id: "2", task: "Renew car insurance", status: "pending" },
    { id: "3", task: "ReSign up for online coursee", status: "pending" },
  ]);

  const addTodoHandler = (e) => {
    setTodoValue(e.target.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();

    if (todoValue === "" || todoValue.length < 1) return;
    const todoVal = v4();
    const newTask: Tasks = { id: todoVal, task: todoValue, status: "pending" };
    // console.log(newTask);
    // setTodoValue(newTask, ...taskData);
    setTaskData([newTask, ...taskData]);
    // console.log(todoValue);
    setTodoValue("");
  };

  const deleteHandler = (e) => {
    const id = e;
    const todos = taskData.filter((obj) => {
      return obj.id !== id;
    });
    setTaskData(todos);
  };

  const statusChangeHandler = (e, val) => {
    console.log(val.target.innerHTML);
    const id = e;
    let newTodos = [];
    taskData.map((obj) => {
      let newTodo = { ...obj };
      if (obj.id === id) {
        newTodo = {
          id,
          task: obj.task,
          status: obj.status === "pending" ? "finished" : "pending",
        };
        val.target.innerHTML = obj.status === "pending" ? "PENDING" : "FINISHED";
        val.target.className =
          obj.status === "pending" ? "btn btn-warning ms-1" : "btn btn-success ms-1";
      }
      newTodos.push(newTodo);
    });
    setTaskData(newTodos);
  };

  return (
    <>
      <section className="vh-100 {styles.main_syle}">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>

                  <form
                    className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                    onSubmit={submitTodoHandler}>
                    <TodoAddText
                      addHandler={addTodoHandler}
                      submitHandler={submitTodoHandler}
                      value={todoValue}
                    />

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal">
                        Get tasks
                      </button>
                    </div>
                  </form>
                  <Todolist
                    tasks={taskData}
                    deleteTaskHandler={deleteHandler}
                    statusChangeHandler={statusChangeHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Coming Soon
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">The fetching from server will come later.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-mdb-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <Script type="text/javascript" src="/js/mdb.min.js" strategy="lazyOnload" />
    </>
  );
}
