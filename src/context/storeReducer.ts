export const types = {
  login: "login User",
  logout: "log out User",
};

export const initialValues = {
  auth: false,
};

interface Action{
  type: string;
}

export const storeReducer = (state:any, action:Action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        auth: true,
      };
    case types.logout:
      return {
        ...state,
        auth: false,
      };
    default:
      return state;
  }
};