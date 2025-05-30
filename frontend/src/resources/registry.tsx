import { ColumnMap } from "../components/list/table/columns";
import {
  getGoalColumns,
  GoalListGridItemContents,
  useGoalActions,
} from "../components/resources/goals";
import { ActionConfig } from "../components/resources/shared";
import {
  useCreateGoal,
  useDeleteGoal,
  useGoal,
  useGoals,
  useUpdateGoal,
} from "../hooks";
import {
  ResourceCreateState,
  ResourceDeleteState,
  ResourceDetailState,
  ResourceListState,
  ResourceUpdateState,
} from "../hooks/types";
import { Goal, Resource, ResourcePayload } from "./models";
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
  renderGridItemContents: (resource: T) => ReactElement;
}

type ResourceRegistry = {
  goal: ResourceRegistryEntry<Goal, ResourcePayload<Goal>>;
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
    renderGridItemContents: (goal) => <GoalListGridItemContents goal={goal} />,
  },
};
