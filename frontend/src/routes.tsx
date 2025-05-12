import { RouteObject } from "react-router-dom";
import {
  ArtistDetail,
  ArrangementDetail,
  ArrangementList,
  CollectionDetail,
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
  SourceDetail,
  SupplementaryDetail,
  SupplementaryList,
} from "./pages";
import { Layout } from "./components/Layout";
import { RouteGuard } from "./components/RouteGuard";
import { AuthLayout } from "./components/AuthLayout";
import { Subresource } from "./components/detail";
import { Arrangement, Composition } from "./models";

const ARTISTS = "artists";
const COMPOSITIONS = "compositions";
const SOURCES = "sources";
const COLLECTIONS = "collections";
const ARRANGEMENTS = "arrangements";
const ROUTINES = "routines";
const SUPPLEMENTARIES = "supplementaries";

const PROFILE = "profile";
const SETTINGS = "settings";
const LOGIN = "login";
const SIGNUP = "signup";

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
      { path: `${ARTISTS}/:id`, element: <ArtistDetail /> },
      { path: `${COMPOSITIONS}`, element: <CompositionList /> },
      {
        path: `${COMPOSITIONS}/:id`,
        element: <CompositionDetail />,
        children: [
          {
            index: true,
            path: "",
            element: <Subresource<Arrangement> />,
          },
          {
            path: `${ARRANGEMENTS}`,
            element: <Subresource<Arrangement> />,
          },
          { path: `${COMPOSITIONS}`, element: <Subresource<Composition> /> },
        ],
      },
      { path: `${SOURCES}/:id`, element: <SourceDetail /> },
      { path: `${COLLECTIONS}/:id`, element: <CollectionDetail /> },
      { path: `${ARRANGEMENTS}`, element: <ArrangementList /> },
      { path: `${ARRANGEMENTS}/:id`, element: <ArrangementDetail /> },
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

export const getArtistDetailPath = (id: number) => {
  return `/${ARTISTS}/${id}`;
};

// COMPOSITIONS

export const getCompositionListPath = () => {
  return `/${COMPOSITIONS}`;
};
export const getCompositionDetailPath = (id: number) => {
  return `${getCompositionListPath()}/${id}`;
};

export const getSourceDetailPath = (id: number) => {
  return `/${SOURCES}/${id}`;
};

export const getCollectionDetailPath = (id: number) => {
  return `/${COLLECTIONS}/${id}`;
};

// ARRANGEMENTS

export const getArrangementListPath = () => {
  return `/${ARRANGEMENTS}`;
};
export const getArrangementDetailPath = (id: number) => {
  return `${getArrangementListPath()}/${id}`;
};

// ROUTINES

export const getRoutineListPath = () => {
  return `/${ROUTINES}`;
};
export const getRoutineDetailPath = (id: number) => {
  return `${getRoutineListPath()}/${id}`;
};

// SUPPLEMENTARIES

export const getSupplementaryListPath = () => {
  return `/${SUPPLEMENTARIES}`;
};
export const getSupplementaryDetailPath = (id: number) => {
  return `${getSupplementaryListPath()}/${id}`;
};

// ADMIN

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
