import { getmycircle } from "../components/home/homeService";

export const findAllCircleMemberActions = (userId) => async (dispatch) => {
  try {
    const res = await getmycircle(userId);
    if (res.status === 200) {
      dispatch({
        type: "SetCircleUsers",
        payload: res.data.data.mycircle,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const setCircleAction = (friends) => (dispatch) => {
  dispatch({
    type: "SetCircleUsers",
    payload: friends,
  });
};

// PushCircleUsers
