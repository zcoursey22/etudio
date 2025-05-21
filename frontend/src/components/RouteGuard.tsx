import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

interface RouteGuardProps extends PropsWithChildren {
  redirectTo: string;
  reversed?: boolean;
}

export const RouteGuard = ({
  children,
  redirectTo,
  reversed,
}: RouteGuardProps) => {
  const { isAuthenticated } = useAuth();

  if ((reversed && isAuthenticated) || (!reversed && !isAuthenticated)) {
    return <Navigate replace to={redirectTo} />;
  }
  return children || <Outlet />;
};
