import { Accordion, Icon, Span } from "@chakra-ui/react";
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
      <Accordion.ItemTrigger>
        {ToolItemIcon && (
          <Icon>
            <ToolItemIcon />
          </Icon>
        )}
        <Span flex={"1"}>{label}</Span>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody />
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};
