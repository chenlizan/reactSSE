/**
 * Created by chenlizan on 2017/7/22.
 */

import { handleActions } from "redux-actions";

const initState = {
    message: {},
};

const reducer = handleActions(
  {
    IM_RECEIVE_MESSAGE: (state, { payload }) => ({
      ...state,
      message: payload,
    }),
  },
  initState
);

export default { initState, reducer };
