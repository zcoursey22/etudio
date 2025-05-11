import { Group, Icon, Link, Span } from "@chakra-ui/react";
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
    <Link asChild _currentPage={{ fontWeight: "bold" }}>
      <NavLink to={to}>
        <Group>
          {NavItemIcon && (
            <Icon size={"sm"}>
              <NavItemIcon />
            </Icon>
          )}
          <Span>{label}</Span>
        </Group>
      </NavLink>
    </Link>
  );
};
