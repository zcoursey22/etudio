import { ColumnMap } from "../components/list/table/columns";
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
import { ActionConfig } from "../components/resources/shared";
import {
  useComposition,
  useCompositions,
  useCreateComposition,
  useCreateGoal,
  useDeleteGoal,
  useGoal,
  useGoals,
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
import { Composition, Goal, Resource, ResourcePayload } from "./models";
import { ReactElement } from "react";

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
  useActions: () => { actions: ActionConfig<T>[]; modal: React.ReactNode };
  renderGridItemContents: (
    resource: T,
    actions: ActionConfig<T>[]
  ) => ReactElement;
}

type ResourceRegistry = {
  goal: ResourceRegistryEntry<Goal, ResourcePayload<Goal>>;
  composition: ResourceRegistryEntry<Composition, ResourcePayload<Composition>>;
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
  },
};
