import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import Button from "../../../components/Button";
import { genderList, schema } from "./data";
import InputFile from "src/components/InputFile";
import CustomSelect from "src/components/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateUser, createUser, getUserById, updateUser } from "src/store/slices/Admin/user/userSlice";
import { toast } from "react-toastify";

const UserForm = (props) => {
  console.log(props)
  const userSessionStorage = JSON.parse(sessionStorage.getItem("userPresent"));
  const { isUpdate, idRow } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("errors", errors);
  useEffect(() => {
    dispatch(getUserById([idRow, userSessionStorage?.token]));
  }, [dispatch, idRow, userSessionStorage?.token]);
  
  useEffect(()=>{
    setValue("isUpdate", isUpdate)
  },[isUpdate, setValue])

  useEffect(() => {
    setValue("isUpdate", isUpdate)
  })
  useEffect(() => {
    if (isUpdate) {
      setValue("username", user?.username);
      setValue("email", user?.email);
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("phone", user?.phone);
      setValue("gender", user?.gender);
      setValue("role", user?.role?.id);
    }
  }, [isUpdate, setValue, user]);

  const onSubmit = async (data) => {
    console.log("create");
    const userData = {
      fileAvatar: data.avatar[0] || null,
      candidate: JSON.stringify({
        createUser: {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: parseInt(data.gender),
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.role),
        },
      }),
    };
    console.log("userData",userData)
    try {
      const res = await dispatch(
        createUser([userData, userSessionStorage?.token])
      );

      if (res.payload.status === 200 || res.payload.status === 201) {
        toast.success("T???o t??i kho???n th??nh c??ng");
      }
      else {
        toast.error("T???o t??i kho???n th???t b???i");
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  const onUpdate = async (data) => {
    console.log("update");
    const userData = {
      fileAvatar: data.avatar[0] || null,
      candidate: JSON.stringify({
        createUser: {
          id: idRow,
          username: data.username,
          gender: parseInt(data.gender),
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.role),
        },
      }),
    };
    console.log("userData", data);
    try {
      const res = await dispatch(
        adminUpdateUser([userData, userSessionStorage?.token])
      );
      if (res.payload.status === 200 || res.payload.status === 201) {
        toast.success("Ch???nh s???a t??i kho???n th??nh c??ng");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const roleList = [
    { name: "Nh?? tuy???n d???ng", id: 1 },
    { name: "Admin", id: 2 },
    { name: "???ng vi??n", id: 3 },
    { name: "C???ng t??c vi??n", id: 4 },
  ];
  
  return (
    <>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="user-form"
      >
        <div className="user-form__wrapper">
          <div className="user-form__avatar">
            <InputFile
              label="???nh ?????i di???n"
              requirementField={false}
              id="avatar"
              format="image"
              className="avatar-input"
              setValue={setValue}
              register={register}
            >
              {errors.avatar?.message}
            </InputFile>
          </div>
          <div className="user-form__input-infor">
            <div className="row">
              <CustomInput
                id="username"
                label="T??n t??i kho???n"
                className="user-form__input-item"
                type="text"
                placeholder="vd. abcdef..."
                register={register}
              >
                {errors.username?.message}
              </CustomInput>
              <CustomInput
                id="email"
                className="user-form__input-item"
                label="Email"
                type="email"
                placeholder="vd. abc@gmail.com..."
                register={register}
              >
                {errors.email?.message}
              </CustomInput>
            </div>
            {!isUpdate ? (
              <div className="row">
                <CustomInput
                  id="password"
                  className="user-form__input-item"
                  label="M???t kh???u"
                  type="password"
                  visibility={true}
                  placeholder="vd. Abc123..."
                  register={register}
                >
                  {errors.password?.message}
                </CustomInput>
                <CustomInput
                  id="confirmPassword"
                  className="user-form__input-item"
                  label="X??c nh???n m???t kh???u"
                  type="password"
                  visibility={true}
                  placeholder="vd. Abc123..."
                  register={register}
                >
                  {errors.confirmPassword?.message}
                </CustomInput>
              </div>
            ) : (
              <>
                <input
                  id="password"
                  type="hidden"
                  {...register("password")}
                  disabled
                />
                <input
                  id="confirmPassword"
                  type="hidden"
                  {...register("confirmPassword")}
                  disabled
                />
              </>
            )}
            <div className="row">
              <CustomInput
                id="firstName"
                className="user-form__input-item"
                label="H???"
                type="text"
                placeholder="vd. Nguy???n V??n..."
                register={register}
              >
                {errors.firstName?.message}
              </CustomInput>
              <CustomInput
                id="lastName"
                className="user-form__input-item"
                label="T??n"
                type="text"
                placeholder="vd. An..."
                register={register}
              >
                {errors.lastName?.message}
              </CustomInput>
            </div>
            <div className="row">
              <CustomInput
                id="phone"
                className="user-form__input-item"
                label="S??? ??i???n tho???i"
                type="tel"
                placeholder="vd. 0964xxx473..."
                register={register}
              >
                {errors.phone?.message}
              </CustomInput>
              <CustomSelect
                id="gender"
                className="user-form__input-item"
                label="Gi???i t??nh"
                placeholder="Ch???n gi???i t??nh..."
                register={register}
                options={genderList}
              >
                {errors.gender?.message}
              </CustomSelect>
            </div>
            <div className="row">
              <CustomSelect
                id="role"
                className="user-form__input-item"
                label="Vai tr??"
                placeholder="Ch???n vai tr??..."
                register={register}
                options={roleList}
              >
                {errors.role?.message}
              </CustomSelect>
            </div>
          </div>
        </div>
        <div className="user-form__submit">
          {!isUpdate ? (
            <Button name="Th??m ng?????i d??ng" onClick={handleSubmit(onSubmit)} />
          ) : (
            <Button name="L??u" onClick={handleSubmit(onUpdate)} />
          )}
        </div>
      </form>
    </>
  );
};

export default UserForm;
