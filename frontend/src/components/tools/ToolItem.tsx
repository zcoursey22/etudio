import { Accordion, Group, Icon, Span } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface ToolItemProps {
  value: string;
  label: string;
  icon?: IconType;
}

export const ToolItem = ({ value, label, icon }: ToolItemProps) => {
  const ToolItemIcon = icon;

  return (
    <Accordion.Item value={value}>
      <Accordion.ItemTrigger cursor={"pointer"}>
        <Group flex={"1"}>
          {ToolItemIcon && (
            <Icon>
              <ToolItemIcon />
            </Icon>
          )}
          <Span>{label}</Span>
        </Group>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody />
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};
