/**
 * Created by chenlizan on 2018/5/4.
 */

import Login from "./Login";
import IM from "./IM";

export const initState = {
  Login: Login.initState,
  IM: IM.initState,
};

export const reducers = {
  Login: Login.reducer,
  IM: IM.reducer,
};
