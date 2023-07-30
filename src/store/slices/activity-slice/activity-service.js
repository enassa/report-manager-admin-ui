import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActivity, resetActivity } from "./activity-slice";
import { END_POINTS } from "../../../constants/urls";
import { API } from "../../../App";
import { useNavigate } from "react-router-dom";

export const useActivityService = () => {
  const activity = useSelector((state) => state?.activitySlice?.activity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const raiseActivity = (title) => {
    dispatch(
      setActivity({
        title: title ?? "Loaing...",
        loading: true,
      })
    );
  };

  const endActivity = () => {
    dispatch(resetActivity());
  };
  const recordInActiveClick = (data, serviceUrl) => {
    navigate(serviceUrl);
    // raiseActivity("Launching application");
    return API.POST(END_POINTS.inactiveService, data)
      .then(async (response) => {})
      .catch((error) => {})
      .finally(() => {
        // endActivity();
      });
  };
  return {
    activity,
    raiseActivity,
    endActivity,
    recordInActiveClick,
  };
};
