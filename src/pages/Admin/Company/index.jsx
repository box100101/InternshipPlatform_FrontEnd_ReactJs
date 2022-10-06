import React, { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { useDispatch, useSelector } from "react-redux";

import HeaderContainer from '../../../containers/Admin/HeaderContainer/HeaderContainer'
import Modal from '../../../components/Modal'
import CompanyForm from '../../../containers/Admin/CompanyForm'
import CompanyTable from './CompanyTable'
import { getCompanyList, searchCompany } from 'src/store/slices/Admin/company/companySlice';

const selectOptions = [
  {
    value: 'All',
    name: 'All'
  },
  {
    value: 'HR',
    name: 'HR'
  },
  {
    value: 'Candidate',
    name: 'Candidate'
  },
  {
    value: 'Partner',
    name: 'Partner'
  }
]

export default function Company() {
  const userSessionStorage = JSON.parse(sessionStorage.getItem("userPresent"));

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue === "") {
      dispatch(getCompanyList([1, 10, userSessionStorage?.token]));
    } else {
      dispatch(searchCompany([searchValue, 1, 10, userSessionStorage?.token]));
    }
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      <HeaderContainer
        headerName="Quản lý công ty"
        placeholder="Tìm kiếm công ty..."
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName=""
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
        onSearch={handleSearch}
      />
      <CompanyTable />
      <Modal modalTitle="Thêm Công Ty" open={open} setOpen={setOpen}>
        <CompanyForm isAdd={true} />
      </Modal>
    </>
  )
}
