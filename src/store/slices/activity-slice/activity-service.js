import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActivity, resetActivity } from "./activity-slice";

export const useActivityService = () => {
  const activity = useSelector((state) => state?.activitySlice?.activity);

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
  return {
    activity,
    raiseActivity,
    endActivity,
  };
};
