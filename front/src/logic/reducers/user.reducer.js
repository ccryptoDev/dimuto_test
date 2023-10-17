import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions";

const initialState = {
  walletConnected: false,
  userAddress: "",
  network: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        walletConnected: true,
        userAddress: action.address,
        network: action.network,
      };

    case LOGOUT_SUCCESS:
      return {
        walletConnected: false,
        userAddress: "",
        network: "",
      };

    default:
      return state;
  }
};

export default userReducer;
