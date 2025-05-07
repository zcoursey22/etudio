import { Link, LinkProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps extends PropsWithChildren, LinkProps {
  to: string;
}

export const NavLink = (props: NavLinkProps) => {
  const { to, children, fontWeight, colorPalette } = props;
  return (
    <Link
      {...props}
      fontWeight={fontWeight || "semibold"}
      colorPalette={colorPalette || "blue"}
      asChild
    >
      <RouterNavLink to={to}>{children}</RouterNavLink>
    </Link>
  );
};
