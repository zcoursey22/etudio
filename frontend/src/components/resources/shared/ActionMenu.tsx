import {
  Button,
  Group,
  Icon,
  IconButton,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { Resource } from "../../../models";
import { ActionConfig } from "./actions";
import { LuEllipsisVertical } from "react-icons/lu";

export interface Props<T extends Resource> {
  resource: T;
  actions: ActionConfig<T>[];
  isCardView?: boolean;
  shouldRenderAsButtons?: boolean;
}

export const ActionMenu = <T extends Resource>({
  resource,
  actions,
  isCardView,
  shouldRenderAsButtons,
}: Props<T>) => {
  if (actions.length === 0) {
    return;
  }
  return shouldRenderAsButtons ? (
    <Group>
      {actions.map(({ label, onClick, icon, destructive, primary }) =>
        label ? (
          <Button
            key={label}
            value={label}
            cursor={"pointer"}
            onClick={() => onClick(resource)}
            variant={primary ? "solid" : "surface"}
            color={destructive ? "fg.error" : "auto"}
            size={"xs"}
          >
            {icon && <Icon size={"sm"} as={icon} />}
            {label}
          </Button>
        ) : (
          <IconButton
            key={label}
            value={label}
            cursor={"pointer"}
            onClick={() => onClick(resource)}
            variant={primary ? "solid" : "surface"}
            color={destructive ? "fg.error" : "auto"}
            size={"xs"}
          >
            {icon && <Icon size={"sm"} as={icon} />}
          </IconButton>
        )
      )}
    </Group>
  ) : (
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
            {actions.map(({ key, label, onClick, icon, destructive }) => (
              <Menu.Item
                key={key}
                value={key}
                cursor={"pointer"}
                onClick={() => onClick(resource)}
                color={destructive ? "fg.error" : "fg"}
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
