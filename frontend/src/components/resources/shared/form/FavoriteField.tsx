import { Field } from "@chakra-ui/react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { Favorite } from "../Favorite";
import { CustomFieldProps } from "./types";

export const FavoriteField = <T extends FieldValues>({
  control,
}: CustomFieldProps<T>) => {
  return (
    <Field.Root alignSelf={"center"}>
      <Controller
        name={"isFavorite" as Path<T>}
        control={control}
        defaultValue={false as T[keyof T]}
        render={({ field }) => (
          <Favorite
            isFavorite={field.value}
            controlledOnClick={() => field.onChange(!field.value)}
            color="fg"
          />
        )}
      />
    </Field.Root>
  );
};
