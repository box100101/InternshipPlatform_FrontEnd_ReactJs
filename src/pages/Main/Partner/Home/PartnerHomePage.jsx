import { Grid } from "@mui/material";
import SearchResultHome from "src/components/SearchResultHome";
import DetailCard from "src/components/DetailCard";
import SideBarHomeList from "src/components/SideBarHomeList";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDemandByName,
  getDemandList,
} from "src/store/slices/main/home/demand/demandSlice";
import PaginationCustom from "src/components/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRating } from "src/store/slices/main/home/rating/rating";
import ListCardJobHome from "src/components/ListCardJobHome";
import { getAllUserCandidate, majorFilterChange, nameFilterChange } from "src/store/slices/main/candidate/user/userCandidateSlice";




const limit = 5;

const PartnerHomePage = (props) => {



  const dispatch = useDispatch();
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  // get global state from redux store


  const { allRating } = useSelector((state) => state.rating);
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [jobs, setJobs] = useState(demandList);
  const [major, setMajor] = useState([]);
  const [type, setType] = useState([]);
  const [position, setPosition] = useState([]);
  const listPositionWorkingFormat = [
    "Backend Developer",
    "Business Analyst",
    "Data Engineer",
    "Data Scientist",
    "DevOps",
    "Frontend Developer",
    "Tester",
  ];

  const handlePaginate = (page) => {
    keyword
      ? setCurrentSearchPage(parseInt(page))
      : setCurrentPage(parseInt(page));
    window.scroll(0, 0);
  };

  useEffect(() => {
    dispatch(getDemandList({ currentPage, limit }));
  }, [currentPage]);

  const handleSearch = (value) => {
    value = value.replace("%20", "+");
    const dataSearch = {
      name: value || "",
      no: currentSearchPage - 1,
      limit: 5,
    };
    if (value) {
      navigate(`/partner/search/${value}`);
    } else {
      navigate(`/partner`);
    }
    dispatch(getDemandByName(dataSearch));
  };
  
  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };



  const handleCheck = (value) => {
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];

    if (value.length > 0) {
      tempType = value.filter(
        (el) => el === "Fulltime" || el === "Parttime" || el === "Remote"
      );
    }
    setType(tempType);

    if (value.length > 0) {
      tempPosition = value.filter(
        (el) =>
          el === listPositionWorkingFormat[0] ||
          el === listPositionWorkingFormat[1] ||
          el === listPositionWorkingFormat[2] ||
          el === listPositionWorkingFormat[3] ||
          el === listPositionWorkingFormat[4] ||
          el === listPositionWorkingFormat[5] ||
          el === listPositionWorkingFormat[6]
      );
    }
    setPosition(tempPosition);

    if (value.length > 0) {
      tempMajor = value.filter(
        (el) =>
          el !== "Fulltime" &&
          el !== "Parttime" &&
          el !== "Remote" &&
          el !== listPositionWorkingFormat[0] &&
          el !== listPositionWorkingFormat[1] &&
          el !== listPositionWorkingFormat[2] &&
          el !== listPositionWorkingFormat[3] &&
          el !== listPositionWorkingFormat[4] &&
          el !== listPositionWorkingFormat[5] &&
          el !== listPositionWorkingFormat[6]
      );
    }
    setMajor(tempMajor);
  };

  useEffect(() => {
    dispatch(getAllRating([0, 5]));
  }, []);
  useEffect(() => {
    const updateJob = () => {
      let temp = demandList;

      if (type.length > 0) {
        temp = temp.filter((e) => type.includes(e?.jobType?.name));
      }

      if (position.length > 0) {
        temp = temp.filter((e) => position.includes(e?.position?.name));
      }
      if (major.length > 0) {
        temp = temp.filter((e) => major?.includes(e?.major?.name));
      }
      setJobs(temp);
    };
    updateJob();
  }, [type, position, major, demandList]);
  useEffect(()=>{
    dispatch(getAllUserCandidate())
  },[dispatch])
  return (
    <>
      {demandDetail && (
        <Grid
          className="wrapper"
          spacing={{ xs: 1 }}
          sx={{ padding: "8px" }}
          container
        >
          <Grid item xs={2}>
            <SideBarHomeList
              onChange={handleCheck}
              slideBarHome__wrapper={true}
            />
          </Grid>
          <Grid xs={4} item spacing={{ xs: 1 }}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid item xs={12}>
                <div className="onDesktop">
                  <SearchResultHome
                    onClick={handleSearch}
                    onChange={getValueLocationAndHandle}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <ListCardJobHome
                  jobList={jobs}
                  partnerRole={true}
                  indexCardActive={indexPartnerCardActive}
                  allRating={allRating}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={6} item>
            <div className="containerDetailCard containerDetailCard-none">
              {demandList ? (
                <DetailCard
                  logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                  jobList={jobs}
                  jobDetail={demandDetail}
                  demandPartner={true}
                />
              ) : (
                <div>Nothing here</div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
      {currentPage > 1 ? (
        <div className="partner-postList__pagination">
          <PaginationCustom
            page={keyword ? currentSearchPage : currentPage}
            totalPages={totalPagesofDemandList}
            hanldeOnChange={(e) => handlePaginate(e.target.textContent)}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PartnerHomePage;
