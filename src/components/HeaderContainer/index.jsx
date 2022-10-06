import React, { Fragment } from 'react'
import './styles.scss'
import HeaderWithHR from "src/components/HeaderWithHR";
import HeaderWithCandidate from "src/components/HeaderWithCandidate";
import HeaderWithPartner from "src/components/HeaderWithPartner";
import Logo from '../Logo';
import Login from '../Login';

export default function index() {
  const role = sessionStorage.getItem("userPresent")
    ? JSON.parse(sessionStorage.getItem("userPresent")).role
    : "";
  const renderLayout = () => {
    switch (role) {
      case "Role_HR": {
        return <HeaderWithHR />
      }
      case "Role_Partner": {
        return <HeaderWithPartner />
      }
      case "Role_Candidate": {
        return <HeaderWithCandidate />
      }
      default : return <Fragment />
    }
  }
  return (
    <div className="container-header__hr header__hr config">
      <Logo />
      {renderLayout()}
      <div className="header__hr-icon">
        <Login />
      </div>
    </div>
  )
}
