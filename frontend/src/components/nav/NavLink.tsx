import { Link } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps extends PropsWithChildren {
  to: string;
}

export const NavLink = ({ children, to }: NavLinkProps) => {
  return (
    <Link variant={"underline"} asChild>
      <RouterNavLink to={to}>{children}</RouterNavLink>
    </Link>
  );
};
