import { Flex, Group, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

export interface NavItemProps {
  to: string;
  label: string;
  icon?: IconType;
}

export const NavItem = ({ to, label, icon }: NavItemProps) => {
  const NavItemIcon = icon;

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Link as="div" fontWeight={isActive ? "bold" : "normal"}>
          <Group>
            {NavItemIcon && (
              <Flex bg={isActive ? "fg" : "none"} p="0.1em" borderRadius="sm">
                <Icon color={isActive ? "bg" : "fg"} boxSize="1.25em">
                  <NavItemIcon />
                </Icon>
              </Flex>
            )}
            <Text>{label}</Text>
          </Group>
        </Link>
      )}
    </NavLink>
  );
};
