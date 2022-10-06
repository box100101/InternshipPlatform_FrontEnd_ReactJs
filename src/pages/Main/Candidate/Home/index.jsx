import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileByIdUser } from "src/store/slices/Admin/user/userSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import Main from "../..";
import Home from "../../Home";

const CandidateHome = () => {
  TabTitle("Trang chủ");
  
  const dispatch = useDispatch()
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("userPresent"))
     user &&  dispatch(getProfileByIdUser([user.idUser, user.token]))
  }, [dispatch])

  return (
    <div>
      <Main />
    </div>
  );
};

export default CandidateHome;
