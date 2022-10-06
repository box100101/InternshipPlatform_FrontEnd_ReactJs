import Grid from "@mui/material/Grid";
import { TabTitle } from "src/utils/GeneralFunctions";
import DetailCard from "src/components/DetailCard";
import ListCardJobHome from "src/components/ListCardJobHome";
import "./styles.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobCareByCandidate } from "src/store/slices/main/home/job/jobCandidateSlice";
import { useState } from "react";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";

const CandidateViewList = () => {
  TabTitle("Công việc quan tâm");
  const { jobCare, jobCareHavePage } = useSelector(
    (state) => state.jobCandidateSlice
  );
  const { index, id } = useSelector((state) => state.filter);
  const { jobListCompany } = useSelector((state) => state.job);

  const [jobs, setJobs] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userPresent"));
    dispatch(getJobCareByCandidate(user));
  }, [dispatch]);
  useEffect(() => {
    setJobs(jobCare);
    setJobDetail(jobCare && jobCare[index]?.jobCare);
  }, [index, jobCare]);
  useEffect(() => {
    dispatch(getJobByCompany(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="apply__list--container">
        <div className="header__apply">
          <h2 className="header__apply-title">Công việc đã quan tâm</h2>
          <p className="header__apply--des">
            Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
            ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
          </p>
        </div>
        <div className="section__apply">
          <span>
            Bạn đã quan tâm <span>{jobCare?.length}</span> việc làm
          </span>
        </div>
        <Grid className="wrapper" spacing={{ xs: 2 }} container>
          <Grid item xs={4}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid item xs={12}>
                <ListCardJobHome
                  jobList={jobs?.map((item) => {return item.jobCare})}
                  indexCardActive={index}
                  jobListHavePages={jobCareHavePage}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <div style={{ height: "90%" }}>
              <DetailCard
                logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                jobDetail={jobDetail}
                jobList={jobs?.map((item) => {return item.jobCare})}
                jobListCompany={jobListCompany}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CandidateViewList;
