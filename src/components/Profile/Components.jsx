import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Divider, Switch, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUserCandidate } from "src/store/slices/main/candidate/user/userCandidateSlice";
import Button from "../Button";
import InputFile from "../InputFile";
import Modal from "../Modal";
import UserInfo from "./UserInfo";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./data";
const BASEURL = process.env.REACT_APP_API;
const Components = ({ profile }) => {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [opens, setOpens] = useState(false);
  const handleChange = (e) => {
    console.log(e);
  };
  const [checkedFind, setCheckedFind] = React.useState(true);
  const [checkedEmail, setCheckedEmail] = React.useState(false);
  const [open, setOpen] = useState(false);

  const handleChangeFind = (event) => {
    setCheckedFind(event.target.checked);
  };
  const handleCheckEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };

  const handleClick = (number) => {
    switch (number) {
      case 1: {
        return setOpens(!opens);
      }
      case 2: {
        return setOpen(!open);
      }
      case 3: {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            id="downloadLink"
            href={`${BASEURL}${profile?.cv}`}
            target="_blank"
            type="application/octet-stream"
            download={`${BASEURL}${profile?.cv}`}
            rel="noreferrer"
          ></a>
        );
      }
      default:
        break;
    }
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    dispatch(getAllUserCandidate());
  }, [dispatch]);
  return (
    <div className="profiles">
      <div className="profile_header">
        <img
          style={{ width: 150, height: 150, borderRadius: "50%" }}
          src={
            `${profile.user?.avatar}` ||
            "https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-meo-con-than-chet.jpg"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.onerror = undefined;
            currentTarget.src =
              "https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-meo-con-than-chet.jpg";
          }}
          alt="avatar"
        ></img>
      </div>
      <div className="profile_footer">
        <div style={{ textAlign: "center" }}>
          <div className="profile_name">
            <Typography variant="h6">
              {profile?.user?.lastName} {profile.user?.firstName}
            </Typography>
          </div>
          <div className="profile_username">
            <h3>@{profile.user?.username}</h3>
          </div>
          <Divider style={{ padding: 8 }} />
          {profile.user?.role?.id === 3 ? (
            <div
              className="profile_handle"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "2rem",
                marginTop: 8,
              }}
            >
              <div className="profile_children_handle">
                <Tooltip title="Thay Đổi CV">
                  <CachedRoundedIcon onClick={() => handleClick(1)} />
                </Tooltip>
                <Modal
                  modalTitle={"Thay đổi CV"}
                  open={opens}
                  setOpen={setOpens}
                  children={
                    <form
                      onChange={handleChange}
                      style={{
                        width: 300,
                        height: 300,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <InputFile
                        label="CV"
                        requirementField={false}
                        id="avatar"
                        format="pdf"
                        setValue={setValue}
                        register={register}
                      />
                      {errors.message?.cv}
                      <Button onClick={handleSubmit(onSubmit)}>Thay Đổi</Button>
                    </form>
                  }
                  name="Thay Đổi CV"
                  iconClose={<SyncAltIcon />}
                />
              </div>
              <div
                className="profile_children_handle"
                style={{ padding: "0 2rem" }}
              >
                <Tooltip title="Xem CV">
                  <RemoveRedEyeIcon onClick={() => handleClick(2)} />
                </Tooltip>
                <Modal
                  modalTitle={"Xem CV"}
                  open={open}
                  setOpen={setOpen}
                  children={
                    <form
                      onChange={handleChange}
                      style={{
                        width: "1200px",
                        height: "1200px",
                      }}
                    >
                      <embed
                        src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${BASEURL}${profile.cv}`}
                        width="50%"
                        height="100%"
                      ></embed>
                    </form>
                  }
                  name="Xem CV"
                  iconClose={<SyncAltIcon />}
                />
              </div>
              <div className="profile_children_handle">
                <Tooltip title="Tải CV">
                  <CloudDownloadRoundedIcon onClick={() => handleClick(3)} />
                </Tooltip>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {profile.user?.role?.id === 3 ? (
            <div className="profile_click">
              <div className="profile_check">
                <Typography
                  sx={{ marginTop: 0.7 }}
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  Tìm kiếm việc làm:
                </Typography>
                <Switch
                  checked={checkedFind}
                  onChange={handleChangeFind}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="profile_click">
            <div className="profile_check">
              <Typography
                sx={{ marginTop: 0.7 }}
                variant="overline"
                display="block"
                gutterBottom
              >
                Nhận thông báo về email:
              </Typography>
              <Switch
                sx={{
                  marginBottom: 1,
                }}
                checked={checkedEmail}
                onChange={handleCheckEmail}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>

          <div className="profile_check"></div>
        </div>
        <div className="profile_check"></div>
        <div className="profile_info">
          <UserInfo name="Email" profile={profile.user?.email} />
          <UserInfo name="Số Điện Thoại" profile={profile.user?.phone} />
          <UserInfo
            name="Vai Trò "
            profile={
              profile.user?.role?.name === "Role_Candidate"
                ? "Ứng Viên"
                : profile.user?.role?.name === "Role_Hr"
                ? "Nhà Tuyển Dụng"
                : "Cộng Tác Viên"
            }
          />
          <UserInfo
            name="Giới Tính"
            profile={
              profile.user?.gender === 1
                ? "Nữ"
                : profile.user?.gender === 0
                ? "Nam"
                : "Khác"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Components;
