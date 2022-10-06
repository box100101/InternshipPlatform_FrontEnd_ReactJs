import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import "./responsive.scss";
import Login from "../../pages/Login";

const LoginContainer = () => {
  return (
    <div className="login-container">
      <h1 className="login-container__title">Đăng nhập</h1>
      <Login />
      <div className="register-container__footer">
        <Link to="/forgot-password">Quên mật khẩu?</Link>
      </div>
    </div>
  );
};

export default LoginContainer;
