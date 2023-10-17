import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "./constant";

export const login = (user, network) => {
  return {
    type: LOGIN_SUCCESS,
    address: user.address,
    network,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};


