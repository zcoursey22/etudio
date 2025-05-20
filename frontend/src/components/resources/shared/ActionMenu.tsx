import { Icon, Menu, Portal } from "@chakra-ui/react";
import { Resource } from "../../../models";
import { ActionMap, ActionOverrides, resolveActions } from "./actions";
import { LuEllipsisVertical } from "react-icons/lu";

export interface Props<T extends Resource> {
  resource: T;
  actionMap: ActionMap<T>;
  actionOverrides?: ActionOverrides<T>;
  isCardView?: boolean;
}

export const ActionMenu = <T extends Resource>({
  resource,
  actionMap,
  actionOverrides,
  isCardView,
}: Props<T>) => {
  const actions = resolveActions(actionMap, actionOverrides);

  return (
    <Menu.Root
      positioning={{ placement: isCardView ? "top-end" : "left-start" }}
    >
      <Menu.Trigger asChild>
        <Icon size={"sm"} color={"fg"} cursor={"pointer"} zIndex={"1"}>
          <LuEllipsisVertical />
        </Icon>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content fontWeight={"semibold"}>
            {actions.map(({ label, onClick, icon, color }) => (
              <Menu.Item
                key={label}
                value={label}
                cursor={"pointer"}
                onClick={() => onClick(resource)}
                color={color || "fg"}
              >
                {icon && <Icon size={"sm"} as={icon} />}
                {label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
