import AddCardIcon from "@mui/icons-material/AddCard";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./responsive.scss";
import "./styles.scss";

const HeaderWithHR = (props) => {
  const location = useLocation();
  const pathUrl = location.pathname;

  return (
    <div className="header__hr">
      <Link
        to="post"
        className={
          pathUrl === "/hr/post" ? "header__hr-post active" : "header__hr-post"
        }
      >
        <AddCardIcon sx={{ color: "#04bf8a" }}></AddCardIcon>
        <span className="header__hr-post-post">Đăng tuyển</span>
      </Link>
      <Link
        to="list"
        className={
          pathUrl === "/hr/list" ? "header__hr-post active" : "header__hr-post"
        }
      >
        <FormatAlignJustifyIcon
          sx={{ color: "#04bf8a" }}
        ></FormatAlignJustifyIcon>
        <span className="header__hr-post-post">Công việc đang tuyển</span>
      </Link>
      <Link
        to="candidatemanagement"
        className={
          pathUrl === "/hr/candidatemanagement"
            ? "header__hr-post active"
            : "header__hr-post"
        }
      >
        <BookmarksIcon sx={{ color: "#04bf8a" }} />
        <span className="header__hr-post-post">Ứng viên ưa thích</span>
      </Link>
    </div>
  );
};

HeaderWithHR.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithHR;
