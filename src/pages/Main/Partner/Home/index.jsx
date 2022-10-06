import React from "react";
import { TabTitle } from "src/utils/GeneralFunctions";
import Main from "../..";
import Home from "../../Home";
import "./styles.scss";

const PartnerHome = () => {
  TabTitle("IT Internship JOBS | Trang chủ Cộng tác viên");


  return (
      <Main partner={true} />
  );
};

export default PartnerHome;
