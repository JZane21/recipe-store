import { Navigate } from "react-router-dom";

interface Props{
  auth:{auth:boolean},
  children:JSX.Element
}

export const GuardedRoute = ({auth,children}:Props) => {
  if(auth.auth){
    return children;
  }
  return <Navigate to="/auth/login"/>;
};
