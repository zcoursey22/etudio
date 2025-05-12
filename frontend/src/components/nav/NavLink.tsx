import { Link, LinkProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps extends PropsWithChildren, LinkProps {
  to: string;
  replace?: boolean;
}

export const NavLink = (props: NavLinkProps) => {
  const { to, children, fontWeight, colorPalette, replace } = props;
  return (
    <Link
      {...props}
      fontWeight={fontWeight || "semibold"}
      colorPalette={colorPalette || "blue"}
      asChild
    >
      <RouterNavLink to={to} replace={replace}>
        {children}
      </RouterNavLink>
    </Link>
  );
};
