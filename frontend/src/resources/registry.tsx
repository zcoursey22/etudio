import { LuBookOpenText, LuMusic } from "react-icons/lu";
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
  useComposition,
  useCompositions,
  useCreateArrangement,
  useCreateComposition,
  useCreateGoal,
  useDeleteArrangement,
  useDeleteGoal,
  useGoal,
  useGoals,
  useUpdateArrangement,
  useUpdateComposition,
  useUpdateGoal,
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
  Composition,
  Goal,
  Resource,
  ResourcePayload,
} from "./models";
import { ReactElement } from "react";
import { ROUTE_SEGMENTS } from "../constants";
import {
  ArrangementListGridItemContents,
  getArrangementColumns,
  useArrangementActions,
} from "../components/resources/arrangements";

export interface ResourceRegistryEntry<
  T extends Resource,
  TPayload extends ResourcePayload<T>
> {
  useList: () => ResourceListState<T>;
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
    queryParams: (parent: T) => Record<string, unknown>;
    columnOverrides?: ColumnOverrides<unknown>;
    actionOverrides?: ActionOverrides<unknown>;
  }>;
}

export type ResourceRegistry = {
  goal: ResourceRegistryEntry<Goal, ResourcePayload<Goal>>;
  composition: ResourceRegistryEntry<Composition, ResourcePayload<Composition>>;
  arrangement: ResourceRegistryEntry<Arrangement, ResourcePayload<Arrangement>>;
};

export const registry: ResourceRegistry = {
  goal: {
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
  },
  composition: {
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
    subresources: [
      {
        type: "arrangement",
        route: ROUTE_SEGMENTS.ARRANGEMENTS,
        title: "Scores",
        icon: <LuBookOpenText />,
        queryParams: (composition) => ({ compositionId: composition.id }),
        columnOverrides: { composition: { visible: false } },
        actionOverrides: {
          create: { visible: false },
        },
      },
      {
        type: "composition",
        route: ROUTE_SEGMENTS.COMPOSITIONS,
        title: "Compositions",
        icon: <LuMusic />,
        queryParams: (composition) => ({ partOfCompositionId: composition.id }),
        columnOverrides: {
          from: { visible: false },
          composer: { visible: false },
        },
        actionOverrides: { create: { visible: false } },
      },
    ],
  },
  arrangement: {
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
  },
};
