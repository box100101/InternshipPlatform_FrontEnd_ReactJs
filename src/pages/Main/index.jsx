import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import Home from "./Home";

const Main = () => {
    
  const { id, jobFilter, jobPage } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getMajorList([1, 20]));
  }, [dispatch]);

  return (
    <Home
      jobFilter={jobFilter}
      jobPage={jobPage}
      demandPartner={false}
      linkFilter="/api/r2s/job/filter"
      nameSearch="công việc"
    ></Home>
  );
};

export default Main;
