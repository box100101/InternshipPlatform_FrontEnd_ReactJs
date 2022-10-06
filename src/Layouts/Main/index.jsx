import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderContainer from '../../components/HeaderContainer';
import { TabTitle } from "src/utils/GeneralFunctions";
import "./styles.scss";

const MainLayout = () => {
  TabTitle("Trang chủ | IT Internship Jobs");
  
  return (
    <div className="main__layout">
        <HeaderContainer />
      <div className="main__layout-body-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
