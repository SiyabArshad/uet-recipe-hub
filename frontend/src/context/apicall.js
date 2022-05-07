import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./action";
export const Log = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/uet/login", user);
    dispatch(loginSuccess(res.data.user));
  } catch (err) {
    dispatch(loginFailure());
  }
};