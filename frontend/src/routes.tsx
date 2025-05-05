import { RouteObject } from "react-router-dom";
import {
  CompositionDetail,
  CompositionList,
  Home,
  NotFound,
  Profile,
  RoutineDetail,
  RoutineList,
  Settings,
  SupplementaryDetail,
  SupplementaryList,
} from "./pages";
import { Layout } from "./components";

const COMPOSITIONS = "compositions";
const ROUTINES = "routines";
const SUPPLEMENTARIES = "supplementaries";
const PROFILE = "profile";
const SETTINGS = "settings";
const LOGIN = "login";
const SIGNUP = "signup";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "*", element: <NotFound /> },
      { index: true, path: "/", element: <Home /> },
      { path: `${COMPOSITIONS}`, element: <CompositionList /> },
      { path: `${COMPOSITIONS}/:id`, element: <CompositionDetail /> },
      { path: `${ROUTINES}`, element: <RoutineList /> },
      { path: `${ROUTINES}/:id`, element: <RoutineDetail /> },
      { path: `${SUPPLEMENTARIES}`, element: <SupplementaryList /> },
      { path: `${SUPPLEMENTARIES}/:id`, element: <SupplementaryDetail /> },
      { path: `${PROFILE}`, element: <Profile /> },
      { path: `${SETTINGS}`, element: <Settings /> },
    ],
  },
  { path: "/login", element: <Home /> },
  { path: "/signup", element: <Home /> },
];

export const getCompositionListPath = () => {
  return `/${COMPOSITIONS}`;
};
export const getCompositionDetailPath = (id: string) => {
  return `${getCompositionListPath()}/${id}`;
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
