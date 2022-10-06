import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { Link, useLocation } from "react-router-dom";
import './styles.scss';
export default function HeaderWithCandidate() {
  const location = useLocation()
  const path = location.pathname.slice(11,100)
  
  return (
    <div className="header__hr">
      <Link to="/candidate/view-list-apply" className={`${path === "view-list-apply" ? "active" : ""} header__hr-post`}>
        <PlaylistAddCheckOutlinedIcon fontSize="large" style={{color: "#00B074"}}/>
        <span className="header__hr-post-post">Công việc đã ứng tuyển</span>
      </Link>
      <Link to="/candidate/view-list-care" className={`${path === "view-list-care" ? "active" : ""} header__hr-post`}>
        <FormatAlignJustifyIcon style={{color: "#00B074"}} />
        <span className="header__hr-post-post">Công việc đã quan tâm</span>
      </Link>
    </div>
  )
}
