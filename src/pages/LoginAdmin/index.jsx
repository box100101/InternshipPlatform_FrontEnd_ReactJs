import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomInput from "../../components/CustomInput/index";
import Button from "../../components/Button/index";
import { loginAdmin } from "../../store/slices/main/login/loginSlice";
import { schema } from "./validate";
import { TabTitle } from "src/utils/GeneralFunctions";
import { authenticationSelector } from "src/store/selectors/main/loginSelectors";
import { toast } from "react-toastify";
import { stringify } from "query-string";

import { Link } from "react-router-dom";

import Logo from "../../components/Logo";

const LoginAdmin = () => {
  TabTitle("Login - Admin");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(
    localStorage.getItem("saveLogin") ? true : false
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isCheck) {
      setValue(
        "username",
        JSON.parse(localStorage.getItem("saveLogin")).username
      );
      setValue(
        "password",
        JSON.parse(localStorage.getItem("saveLogin")).password
      );
    }

  }, []);

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };
    console.log(data)
    try {
      const res = await dispatch(loginAdmin(userData));

      if (res.payload.token) {
        const role = res.payload.role;
        switch (role) {
          case "Role_Admin":
            navigate(`/admin`, { replace: true });
            break;
          default:
        }
      }
    } catch (error) {
      toast.error(error);
    }
    if (isCheck) {
      const loginInfor = {
        username: data.username,
        password: data.password,
      };
      localStorage.setItem("saveLogin", JSON.stringify(loginInfor));
    } else {
      localStorage.removeItem("saveLogin");
    }
  };
  const handleSaveLogin = (e) => {
    setIsCheck(!isCheck);
  };

  return (
    <>
      <div className="logo-login-container">
        <Logo />
      </div>
      <h1 className="login-container__title">????ng nh???p</h1>

      <div className="login-admin-form__container">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <CustomInput
            label="T??i kho???n"
            id="username"
            type="text"
            placeholder="T??i kho???n..."
            setValue={setValue}
            register={register}
            requirementField={false}
          >
            {errors.username?.message}
          </CustomInput>
          <CustomInput
            label="M???t kh???u"
            id="password"
            type="password"
            placeholder="M???t kh???u..."
            setValue={setValue}
            register={register}
            visibility={true}
            requirementField={false}
          >
            {errors.password?.message}
          </CustomInput>
          <div className="login-admin-form__action">
            <div
              className="login-admin-form__save-pass"
              onChange={handleSaveLogin}
            >
              <CustomCheckbox checked={isCheck} label="L??u ????ng nh???p" />
            </div>
            <div className="login-admin-form__footer">
              <Link to="/forgot-password">Qu??n m???t kh???u?</Link>
            </div>
          </div>
          <div className="login-admin-form__btn">
            <Button name="????NG NH???P" onClick={handleSubmit(onSubmit)}></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginAdmin;
