import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailCard from "src/components/DetailCard";
import ListCardJobHome from "src/components/ListCardJobHome";
import { getJobApplyListByCandidate } from "src/store/slices/main/home/job/jobCandidateSlice";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";
import { TabTitle } from "src/utils/GeneralFunctions";

const ListApply = () => {
    TabTitle("Công việc ứng tuyển");

    const { jobApplyList, jobApplyListHavePage } = useSelector((state) => state.jobCandidateSlice);
    const { index , id} = useSelector((state) => state.filter);
    const { jobListCompany } = useSelector((state) => state.job);

    const [jobs,setJobs] = useState([])
    const [jobDetail,setJobDetail] = useState([])

    const dispatch = useDispatch()
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("userPresent"))
        dispatch(getJobApplyListByCandidate(user))
    },[dispatch, id])
    useEffect(()=>{
        dispatch(getJobByCompany(id))
    },[dispatch, id])
    useEffect(()=>{
        setJobs(jobApplyList)
        setJobDetail(jobApplyList[index]?.jobApp)
    },[index, jobApplyList])
    return (
        <>
            <div className="apply__list--container">
                <div className="header__apply">
                    <h2 className="header__apply-title">Công việc đã ứng tuyển</h2>
                    <p className="header__apply--des">Xem lại danh sách những việc làm mà bạn đã ứng tuyển trước đó.</p>
                </div>
                <div className="section__apply">
                    <span>Bạn đã ứng tuyển <span>{jobApplyList?.length}</span> việc làm</span>
                </div>
                <Grid
                    className="wrapper"
                    spacing={{ xs: 2 }}
                    container
                >
                    <Grid item xs={4}>
                        <Grid container spacing={{ xs: 1 }}>
                            <Grid item xs={12}>
                                <ListCardJobHome
                                    hiddent={true}
                                    jobList={jobs}
                                    indexCardActive={index}
                                    jobListHavePages={jobApplyListHavePage}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <div style={{ height: "90%" }}>
                            <DetailCard
                                logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                                jobDetail={jobDetail}
                                jobList={jobs}
                                jobListCompany={jobListCompany}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ListApply;