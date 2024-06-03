import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Toast.module.scss";

export const Toast: React.FC = () => {
  return (
    <ToastContainer
      className={styles["toastify-container"]}
      autoClose={4000}
      position="top-center"
      hideProgressBar={true}
      theme="light"
      newestOnTop={false}
    />
  );
};
