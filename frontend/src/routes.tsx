import { RouteObject } from "react-router-dom";
import {
  ArtistDetail,
  ArrangementDetail,
  ArrangementList,
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
  Training,
  GoalList,
  GoalDetail,
  SourceList,
  ArtistList,
} from "./pages";
import { Layout } from "./components/Layout";
import { RouteGuard } from "./components/RouteGuard";
import { AuthLayout } from "./components/AuthLayout";
import { Subresource } from "./components/detail";
import { Arrangement, Composition, Source } from "./resources/models";
import { ROUTE_SEGMENTS } from "./constants";

const {
  LOGIN,
  SIGNUP,
  ARTISTS,
  COMPOSITIONS,
  ARRANGEMENTS,
  SETTINGS,
  SOURCES,
  SUPPLEMENTARIES,
  ROUTINES,
  PROFILE,
  TRAINING,
  GOALS,
} = ROUTE_SEGMENTS;

export const getRoutes = (isAuthenticated: boolean): RouteObject[] => {
  const publicRoutes = {
    element: <RouteGuard redirectTo="/" reversed />,
    children: [
      { path: LOGIN, element: <Login /> },
      { path: SIGNUP, element: <Signup /> },
    ],
  };

  const protectedRoutes = {
    element: <RouteGuard redirectTo="/" />,
    children: [
      { path: ARTISTS, element: <ArtistList /> },
      {
        path: `${ARTISTS}/:id`,
        element: <ArtistDetail />,
        children: [
          {
            index: true,
            element: <Subresource<Composition> />,
          },
          { path: `${COMPOSITIONS}`, element: <Subresource<Composition> /> },
          {
            path: `${ARRANGEMENTS}`,
            element: <Subresource<Arrangement> />,
          },
          {
            path: `${SOURCES}`,
            element: <Subresource<Source> />,
          },
        ],
      },
      { path: COMPOSITIONS, element: <CompositionList /> },
      {
        path: `${COMPOSITIONS}/:id`,
        element: <CompositionDetail />,
        children: [
          {
            index: true,
            element: <Subresource<Arrangement> />,
          },
          {
            path: ARRANGEMENTS,
            element: <Subresource<Arrangement> />,
          },
          {
            path: COMPOSITIONS,
            element: <Subresource<Composition> />,
          },
        ],
      },
      { path: SOURCES, element: <SourceList /> },
      {
        path: `${SOURCES}/:id`,
        element: <SourceDetail />,
        children: [
          {
            index: true,
            element: <Subresource<Composition> />,
          },
          {
            path: COMPOSITIONS,
            element: <Subresource<Composition> />,
          },
          {
            path: SOURCES,
            element: <Subresource<Source> />,
          },
        ],
      },
      { path: ARRANGEMENTS, element: <ArrangementList /> },
      {
        path: `${ARRANGEMENTS}/:id`,
        element: <ArrangementDetail />,
      },
      { path: ROUTINES, element: <RoutineList /> },
      {
        path: `${ROUTINES}/:id`,
        element: <RoutineDetail />,
      },
      { path: SUPPLEMENTARIES, element: <SupplementaryList /> },
      {
        path: `${SUPPLEMENTARIES}/:id`,
        element: <SupplementaryDetail />,
      },
      { path: GOALS, element: <GoalList /> },
      {
        path: `${GOALS}/:id`,
        element: <GoalDetail />,
      },
      { path: TRAINING, element: <Training /> },
      { path: PROFILE, element: <Profile /> },
      { path: SETTINGS, element: <Settings /> },
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

// ARTISTS

export const getArtistListPath = () => {
  return `/${ARTISTS}`;
};
export const getArtistDetailPath = (
  id: number,
  subresourceRouteSegment?: string
) => {
  return (
    `${getArtistListPath()}/${id}` +
    (subresourceRouteSegment ? `/${subresourceRouteSegment}` : "")
  );
};

// COMPOSITIONS

export const getCompositionListPath = () => {
  return `/${COMPOSITIONS}`;
};
export const getCompositionDetailPath = (
  id: number,
  subresourceRouteSegment?: string
) => {
  return (
    `${getCompositionListPath()}/${id}` +
    (subresourceRouteSegment ? `/${subresourceRouteSegment}` : "")
  );
};

// SOURCES

export const getSourceListPath = () => {
  return `/${SOURCES}`;
};
export const getSourceDetailPath = (
  id: number,
  subresourceRouteSegment?: string
) => {
  return (
    `${getSourceListPath()}/${id}` +
    (subresourceRouteSegment ? `/${subresourceRouteSegment}` : "")
  );
};

// ARRANGEMENTS

export const getArrangementListPath = () => {
  return `/${ARRANGEMENTS}`;
};
export const getArrangementDetailPath = (
  id: number,
  subresourceRouteSegment?: string
) => {
  return (
    `${getArrangementListPath()}/${id}` +
    (subresourceRouteSegment ? `/${subresourceRouteSegment}` : "")
  );
};

// ROUTINES

export const getRoutineListPath = () => {
  return `/${ROUTINES}`;
};
export const getRoutineDetailPath = (
  id: number,
  subresourceRouteSegment?: string
) => {
  return (
    `${getRoutineListPath()}/${id}` +
    (subresourceRouteSegment ? `/${subresourceRouteSegment}` : "")
  );
};

// SUPPLEMENTARIES

export const getSupplementaryListPath = () => {
  return `/${SUPPLEMENTARIES}`;
};
export const getSupplementaryDetailPath = (
  id: number,
  subresourceRouteSegment?: string
) => {
  return (
    `${getSupplementaryListPath()}/${id}` +
    (subresourceRouteSegment ? `/${subresourceRouteSegment}` : "")
  );
};

// GOALS

export const getGoalListPath = () => {
  return `/${GOALS}`;
};
export const getGoalDetailPath = (
  id: number,
  subresourceRouteSegment?: string
) => {
  return (
    `${getGoalListPath()}/${id}` +
    (subresourceRouteSegment ? `/${subresourceRouteSegment}` : "")
  );
};

// TRAINING

export const getTrainingPath = () => {
  return `/${TRAINING}`;
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
