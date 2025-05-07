import { RouteObject } from "react-router-dom";
import {
  ComposerDetail,
  CompositionDetail,
  CompositionList,
  Home,
  Landing,
  Login,
  NotFound,
  Profile,
  RoutineDetail,
  RoutineList,
  Settings,
  Signup,
  SupplementaryDetail,
  SupplementaryList,
} from "./pages";
import { Layout } from "./components/Layout";
import { RouteGuard } from "./components/RouteGuard";
import { AuthLayout } from "./components/AuthLayout";

const COMPOSITIONS = "compositions";
const ROUTINES = "routines";
const SUPPLEMENTARIES = "supplementaries";
const PROFILE = "profile";
const SETTINGS = "settings";
const LOGIN = "login";
const SIGNUP = "signup";
const COMPOSERS = "composers";

export const getRoutes = (isAuthenticated: boolean): RouteObject[] => {
  const publicRoutes = {
    element: <RouteGuard redirectTo="/" reversed />,
    children: [
      { path: `${LOGIN}`, element: <Login /> },
      { path: `${SIGNUP}`, element: <Signup /> },
    ],
  };

  const protectedRoutes = {
    element: <RouteGuard redirectTo="/" />,
    children: [
      { path: `${COMPOSITIONS}`, element: <CompositionList /> },
      { path: `${COMPOSITIONS}/:id`, element: <CompositionDetail /> },
      { path: `${COMPOSERS}/:id`, element: <ComposerDetail /> },
      { path: `${ROUTINES}`, element: <RoutineList /> },
      { path: `${ROUTINES}/:id`, element: <RoutineDetail /> },
      { path: `${SUPPLEMENTARIES}`, element: <SupplementaryList /> },
      { path: `${SUPPLEMENTARIES}/:id`, element: <SupplementaryDetail /> },
      { path: `${PROFILE}`, element: <Profile /> },
      { path: `${SETTINGS}`, element: <Settings /> },
    ],
  };

  return [
    {
      path: "/",
      element: isAuthenticated ? <Layout /> : <AuthLayout />,
      children: [
        { path: "/", element: isAuthenticated ? <Home /> : <Landing /> },
        ...(isAuthenticated ? [protectedRoutes] : []),
        ...[publicRoutes],
        {
          path: "*",
          element: isAuthenticated ? (
            <NotFound />
          ) : (
            <RouteGuard redirectTo="/">
              <NotFound />
            </RouteGuard>
          ),
        },
      ],
    },
  ];
};

export const getCompositionListPath = () => {
  return `/${COMPOSITIONS}`;
};
export const getCompositionDetailPath = (id: string) => {
  return `${getCompositionListPath()}/${id}`;
};

export const getComposerDetailPath = (id: string) => {
  return `/${COMPOSERS}/${id}`;
};

export const getRoutineListPath = () => {
  return `/${ROUTINES}`;
};
export const getRoutineDetailPath = (id: string) => {
  return `${getRoutineListPath()}/${id}`;
};

export const getSupplementaryListPath = () => {
  return `/${SUPPLEMENTARIES}`;
};
export const getSupplementaryDetailPath = (id: string) => {
  return `${getSupplementaryListPath()}/${id}`;
};

export const getProfilePath = () => {
  return `/${PROFILE}`;
};

export const getSettingPath = () => {
  return `/${SETTINGS}`;
};

export const getLoginPath = () => {
  return `/${LOGIN}`;
};
export const getSignupPath = () => {
  return `/${SIGNUP}`;
};
