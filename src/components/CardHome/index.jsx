import * as React from "react";
import TagName from "../TagName";
import "./styles.scss";
import Rating from "@mui/material/Rating";
import ButtonMark from "../ButtonMark";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIdJobActive,
  updateIndexCardActive,
} from "../../store/slices/main/home/job/jobSlice";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";
import { updateIndexPartnerCardActive } from "src/store/slices/main/home/demand/demandSlice";
import PeopleIcon from "@mui/icons-material/People";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  idFilterChange,
  indexFilterChange,
} from "src/store/slices/main/home/filter/filterSlices";

const no = process.env.NO_OF_PAGE;
const limit = process.env.LIMIT_OF_PAGE || 5;
const CardHome = (props) => {
  const dispatch = useDispatch();

  const { careListOfPrivate } = useSelector((state) => state.mark);

  const { profile } = useSelector((state) => state.user);

  const user = JSON.parse(sessionStorage.getItem("userPresent"));

  let isMark =
    careListOfPrivate &&
    careListOfPrivate.filter((job) => job?.jobCare?.id === props?.id);

  const isMarkLength = isMark && isMark.length > 0 ? true : false;

  React.useEffect(() => {
    const dataGetMarkByUser = {
      userName: profile?.user?.username,
      page: {
        no: 0,
        limit: limit,
      },
    };
    if (profile?.user?.role?.name === "Role_Candidate") {
      dispatch(getMarkByUser(dataGetMarkByUser));
    }
  }, [
    dispatch,
    profile.role,
    profile?.user?.role?.name,
    profile?.user?.username,
  ]);

  React.useEffect(() => {
    const dataGetMarkByUser = {
      userName: profile?.user?.username,
      page: {
        no: props.page - 1,
        limit: limit,
      },
    };
    if (profile?.user?.role?.name === "Role_Candidate") {
      dispatch(getMarkByUser(dataGetMarkByUser));
    }
  }, [dispatch, profile.role, profile?.user?.role?.name, profile?.user?.username, props.page]);

  React.useEffect(() => {
    if (props.index === 0) {
      dispatch(updateIdJobActive(props.id));
    }
  }, [dispatch, props.id, props.index]);
  const navigate = useNavigate();
  const handleClick = () => {
    if (window.innerWidth < 1199) {
      navigate(`/candidate/detail_job/${props.id}`);
    }
    dispatch(indexFilterChange(props.index));
    dispatch(idFilterChange(props.id));
    dispatch(updateIndexCardActive(props.index));
    dispatch(updateIndexPartnerCardActive(props.index));
    dispatch(updateIdJobActive(props.id));
  };
  return (
    <div
      onClick={handleClick}
      className={clsx(
        "cardHome__container",
        props.active === props.index ? "active" : ""
      )}
      style={{
        paddingLeft: props.pdLeft ? props.pdLeft : "",
        paddingRight: props.pdRight ? props.pdRight : "",
      }}
    >
      <div className="cardHome__col1" dataset={props.id}>
        <div className="cardHome__aboutCompany">
          <img
            className="cardHome__img"
            src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
            alt=""
          />
          <div style={{ textAlign: "left" }}>
            <Tooltip title={props.title} placement="top">
              <h4 className="cardHome__title">{props.title}</h4>
            </Tooltip>
            <p className="cardHome__nameCompany">{props.nameCompany}</p>
          </div>
        </div>
        <div className="cardHome__tagName">
          {props.tagName.map((tag) => (
            <TagName key={tag} title={tag} />
          ))}
        </div>
        {props.demandPartner ? (
          <div className="cardHome__amount-hr-apply">
            <PeopleIcon sx={{ color: "#04bf8a !important" }} />
            <span className="amount">Số lượng ứng viên: {props.amount}</span>
          </div>
        ) : (
          <Rating
            name="read-only"
            precision={0.5}
            readOnly
            value={props.star ?? " "}
          />
        )}
      </div>

      <div className="cardHome__col2">
        {props.hiddent ? (
          <div style={{ visibility: "hidden" }}>
            <ButtonMark
              height="32px"
              width="32px"
              fontSize="18px"
              jobId={props.id}
              isMark={isMarkLength}
            />
          </div>
        ) : (
          <>
            {user?.role?.includes("Role_Candidate") ? (
              <ButtonMark
                height="32px"
                width="32px"
                fontSize="18px"
                jobId={props.id}
                isMark={isMarkLength}
              />
            ) : (
              <div style={{ visibility: "hidden" }}>
                <ButtonMark
                  height="32px"
                  width="32px"
                  fontSize="18px"
                  jobId={props.id}
                  isMark={isMarkLength}
                />
              </div>
            )}
          </>
        )}
        {props.none__time ? (
          <div className="cardHome__col2-End-1">
            <AddLocationAltRoundedIcon
              style={{ fontSize: `${props.fontSize + 2}px` }}
              sx={{ color: "#04bf8a" }}
            />

            <p
              style={{
                fontSize: `${props.fontSize}px`,
                width: "max-content",
                color: "#000",
              }}
            >
              {props.location}
            </p>
          </div>
        ) : (
          <div className="cardHome__col2-End">
            <div className="cardHome__col2-End-1">
              <AddLocationAltRoundedIcon
                style={{ fontSize: `${props.fontSize + 2}px` }}
              />
              <p style={{ fontSize: `${props.fontSize}px`, color: "#000" }}>
                {props.location}
              </p>
            </div>
            <div className="cardHome__col2-End-2">
              <WatchLaterOutlinedIcon
                style={{ fontSize: `${props.fontSize + 2}px` }}
              />
              <p
                style={{ fontSize: `${props.fontSize}px` }}
              >{`${props.time[0]} - ${props.time[1]}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHome;
