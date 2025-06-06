import { LuBookOpenText, LuDiscAlbum, LuMusic, LuRadio } from "react-icons/lu";
import { ColumnMap, ColumnOverrides } from "../components/list/table/columns";
import {
  CompositionListGridItemContents,
  getCompositionColumns,
  useCompositionActions,
} from "../components/resources/compositions";
import {
  getGoalColumns,
  GoalListGridItemContents,
  useGoalActions,
} from "../components/resources/goals";
import { ActionConfig, ActionOverrides } from "../components/resources/shared";
import {
  useArrangement,
  useArrangements,
  useArtist,
  useArtists,
  useComposition,
  useCompositions,
  useCreateArrangement,
  useCreateArtist,
  useCreateComposition,
  useCreateGoal,
  useCreateRoutine,
  useCreateSource,
  useCreateSupplementary,
  useDeleteArrangement,
  useDeleteArtist,
  useDeleteGoal,
  useDeleteRoutine,
  useDeleteSource,
  useDeleteSupplementary,
  useGoal,
  useGoals,
  useRoutine,
  useRoutines,
  useSource,
  useSources,
  useSupplementaries,
  useSupplementary,
  useUpdateArrangement,
  useUpdateArtist,
  useUpdateComposition,
  useUpdateGoal,
  useUpdateRoutine,
  useUpdateSource,
  useUpdateSupplementary,
} from "../hooks";
import {
  ResourceCreateState,
  ResourceDeleteState,
  ResourceDetailState,
  ResourceListState,
  ResourceUpdateState,
} from "../hooks/types";
import {
  Arrangement,
  Artist,
  Composition,
  Goal,
  Resource,
  ResourcePayload,
  Routine,
  Source,
  Supplementary,
} from "./models";
import { ReactElement } from "react";
import { ResourceType, ROUTE_SEGMENTS } from "../constants";
import {
  ArrangementListGridItemContents,
  getArrangementColumns,
  useArrangementActions,
} from "../components/resources/arrangements";
import {
  getSourceColumns,
  SourceListGridItemContents,
  useSourceActions,
} from "../components/resources/sources";
import {
  getRoutineColumns,
  RoutineListGridItemContents,
  useRoutineActions,
} from "../components/resources/routines";
import {
  getSupplementaryColumns,
  SupplementaryListGridItemContents,
  useSupplementaryActions,
} from "../components/resources/supplementaries";
import {
  useArtistActions,
  getArtistColumns,
  ArtistListGridItemContents,
} from "../components/resources/artists";

export interface ResourceRegistryEntry<
  T extends Resource,
  TPayload extends ResourcePayload<T>
> {
  useList: (queryParams?: Record<string, unknown>) => ResourceListState<T>;
  useDetail: (id: string | number) => ResourceDetailState<T>;
  useCreate: () => ResourceCreateState<TPayload>;
  useUpdate: () => ResourceUpdateState<TPayload>;
  useDelete: () => ResourceDeleteState;
  getColumns: (actions: ActionConfig<T>[]) => ColumnMap<T>;
  useActions: (overrides?: ActionOverrides<T>) => {
    actions: ActionConfig<T>[];
    modal: React.ReactNode;
  };
  renderGridItemContents: (
    resource: T,
    actions: ActionConfig<T>[]
  ) => ReactElement;
  detailPageActionOverrides?: ActionOverrides<T>;
  subresources?: Array<{
    type: keyof ResourceRegistry;
    route: string;
    title: string;
    icon?: React.ReactNode;
    getQueryParams: (parent: T) => Record<string, unknown>;
    columnOverrides?: ColumnOverrides<unknown>;
    actionOverrides?: ActionOverrides<unknown>;
  }>;
  resourceType: ResourceType;
}

export type ResourceRegistry = {
  [ResourceType.GOAL]: ResourceRegistryEntry<Goal, ResourcePayload<Goal>>;
  [ResourceType.COMPOSITION]: ResourceRegistryEntry<
    Composition,
    ResourcePayload<Composition>
  >;
  [ResourceType.ARRANGEMENT]: ResourceRegistryEntry<
    Arrangement,
    ResourcePayload<Arrangement>
  >;
  [ResourceType.SOURCE]: ResourceRegistryEntry<Source, ResourcePayload<Source>>;
  [ResourceType.ARTIST]: ResourceRegistryEntry<Artist, ResourcePayload<Artist>>;
  [ResourceType.ROUTINE]: ResourceRegistryEntry<
    Routine,
    ResourcePayload<Routine>
  >;
  [ResourceType.SUPPLEMENTARY]: ResourceRegistryEntry<
    Supplementary,
    ResourcePayload<Supplementary>
  >;
};

export const registry: ResourceRegistry = {
  [ResourceType.GOAL]: {
    useList: useGoals,
    useDetail: useGoal,
    useCreate: useCreateGoal,
    useUpdate: useUpdateGoal,
    useDelete: useDeleteGoal,
    getColumns: getGoalColumns,
    useActions: useGoalActions,
    renderGridItemContents: (goal, actions) => (
      <GoalListGridItemContents goal={goal} actions={actions} />
    ),
    detailPageActionOverrides: { create: { visible: false } },
    resourceType: ResourceType.GOAL,
  },
  [ResourceType.COMPOSITION]: {
    useList: useCompositions,
    useDetail: useComposition,
    useCreate: useCreateComposition,
    useUpdate: useUpdateComposition,
    useDelete: useDeleteGoal,
    getColumns: getCompositionColumns,
    useActions: useCompositionActions,
    renderGridItemContents: (composition, actions) => (
      <CompositionListGridItemContents
        composition={composition}
        actions={actions}
      />
    ),
    detailPageActionOverrides: { create: { visible: false } },
    resourceType: ResourceType.COMPOSITION,
    subresources: [
      {
        type: ResourceType.ARRANGEMENT,
        route: ROUTE_SEGMENTS.ARRANGEMENTS,
        title: "Scores",
        icon: <LuBookOpenText />,
        getQueryParams: (composition) => ({ compositionId: composition.id }),
        columnOverrides: { composition: { visible: false } },
        actionOverrides: {
          create: { visible: false },
        },
      },
      {
        type: ResourceType.COMPOSITION,
        route: ROUTE_SEGMENTS.COMPOSITIONS,
        title: "Compositions",
        icon: <LuMusic />,
        getQueryParams: (composition) => ({
          partOfCompositionId: composition.id,
        }),
        columnOverrides: {
          from: { visible: false },
          composer: { visible: false },
        },
        actionOverrides: { create: { visible: false } },
      },
    ],
  },
  [ResourceType.ARRANGEMENT]: {
    useList: useArrangements,
    useDetail: useArrangement,
    useCreate: useCreateArrangement,
    useUpdate: useUpdateArrangement,
    useDelete: useDeleteArrangement,
    getColumns: getArrangementColumns,
    useActions: useArrangementActions,
    renderGridItemContents: (arrangement, actions) => (
      <ArrangementListGridItemContents
        arrangement={arrangement}
        actions={actions}
      />
    ),
    detailPageActionOverrides: { create: { visible: false } },
    resourceType: ResourceType.ARRANGEMENT,
  },
  [ResourceType.SOURCE]: {
    useList: useSources,
    useDetail: useSource,
    useCreate: useCreateSource,
    useUpdate: useUpdateSource,
    useDelete: useDeleteSource,
    getColumns: getSourceColumns,
    useActions: useSourceActions,
    renderGridItemContents: (source, actions) => (
      <SourceListGridItemContents source={source} actions={actions} />
    ),
    detailPageActionOverrides: { create: { visible: false } },
    resourceType: ResourceType.SOURCE,
    subresources: [
      {
        type: ResourceType.COMPOSITION,
        route: ROUTE_SEGMENTS.COMPOSITIONS,
        title: "Compositions",
        icon: <LuMusic />,
        getQueryParams: (source) => ({
          sourceId: source.id,
        }),
        columnOverrides: {
          from: { visible: false },
        },
        actionOverrides: { create: { visible: false } },
      },
      {
        type: ResourceType.SOURCE,
        route: ROUTE_SEGMENTS.SOURCES,
        title: "Sources",
        icon: <LuRadio />,
        getQueryParams: (source) => ({
          sourceId: source.id,
        }),
        columnOverrides: {
          from: { visible: false },
        },
        actionOverrides: { create: { visible: false } },
      },
    ],
  },
  [ResourceType.ARTIST]: {
    useList: useArtists,
    useDetail: useArtist,
    useCreate: useCreateArtist,
    useUpdate: useUpdateArtist,
    useDelete: useDeleteArtist,
    getColumns: getArtistColumns,
    useActions: useArtistActions,
    renderGridItemContents: (artist, actions) => (
      <ArtistListGridItemContents artist={artist} actions={actions} />
    ),
    detailPageActionOverrides: { create: { visible: false } },
    resourceType: ResourceType.ARTIST,
    subresources: [
      {
        type: ResourceType.COMPOSITION,
        route: ROUTE_SEGMENTS.COMPOSITIONS,
        title: "Compositions",
        icon: <LuMusic />,
        getQueryParams: (artist) => ({
          artistId: artist.id,
        }),
        columnOverrides: {
          from: { visible: false },
          composer: { visible: false },
        },
        actionOverrides: { create: { visible: false } },
      },
      {
        type: ResourceType.ARRANGEMENT,
        route: ROUTE_SEGMENTS.ARRANGEMENTS,
        title: "Scores",
        icon: <LuBookOpenText />,
        getQueryParams: (artist) => ({
          artistId: artist.id,
        }),
        columnOverrides: {
          from: { visible: false },
          composer: { visible: false },
        },
        actionOverrides: { create: { visible: false } },
      },
      {
        type: ResourceType.SOURCE,
        route: ROUTE_SEGMENTS.SOURCES,
        title: "Albums",
        icon: <LuDiscAlbum />,
        getQueryParams: (artist) => ({
          artistId: artist.id,
        }),
        columnOverrides: {},
        actionOverrides: { create: { visible: false } },
      },
    ],
  },
  [ResourceType.ROUTINE]: {
    useList: useRoutines,
    useDetail: useRoutine,
    useCreate: useCreateRoutine,
    useUpdate: useUpdateRoutine,
    useDelete: useDeleteRoutine,
    getColumns: getRoutineColumns,
    useActions: useRoutineActions,
    renderGridItemContents: (routine, actions) => (
      <RoutineListGridItemContents routine={routine} actions={actions} />
    ),
    detailPageActionOverrides: { create: { visible: false } },
    resourceType: ResourceType.ROUTINE,
  },
  [ResourceType.SUPPLEMENTARY]: {
    useList: useSupplementaries,
    useDetail: useSupplementary,
    useCreate: useCreateSupplementary,
    useUpdate: useUpdateSupplementary,
    useDelete: useDeleteSupplementary,
    getColumns: getSupplementaryColumns,
    useActions: useSupplementaryActions,
    renderGridItemContents: (supplementary, actions) => (
      <SupplementaryListGridItemContents
        supplementary={supplementary}
        actions={actions}
      />
    ),
    detailPageActionOverrides: { create: { visible: false } },
    resourceType: ResourceType.SUPPLEMENTARY,
  },
};
