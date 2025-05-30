// import { Flex, Icon } from "@chakra-ui/react";
// import { LuHeart } from "react-icons/lu";
import { Resource } from "../../../resources/models";
import { Favorite } from "../../resources/shared";

export interface ColumnConfig<T> {
  header?: React.ReactNode;
  render: (resource: T) => React.ReactNode;
  textAlign?: "left" | "right" | "center";
  hideOnMobile?: boolean;
  visible?: boolean;
  width?: string;
}

export type ColumnMap<T> = Record<string, ColumnConfig<T>>;

export type ColumnOverrides<T> = Partial<{
  [K in keyof ColumnMap<T>]: Partial<ColumnConfig<T>>;
}>;

export const resolveColumns = <T,>(
  columns: ColumnMap<T>,
  overrides?: ColumnOverrides<T>
): ColumnConfig<T>[] => {
  return Object.entries(columns)
    .map(([key, base]) => {
      const override = overrides?.[key];
      const merged = { ...base, ...override };
      return merged.visible === false ? null : merged;
    })
    .filter((col): col is ColumnConfig<T> => col !== null);
};

export const favoriteColumnConfig: ColumnConfig<Resource> = {
  // header: (
  //   <Flex align={"center"}>
  //     <Icon color={"currentcolor"} size={"sm"}>
  //       <LuHeart fill="currentcolor" />
  //     </Icon>
  //   </Flex>
  // ),
  render: ({ id, isFavorite }) => <Favorite id={id} isFavorite={isFavorite} />,
  width: "1",
};
