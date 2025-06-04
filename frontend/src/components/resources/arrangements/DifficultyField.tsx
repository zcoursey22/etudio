import { Controller, FieldValues, Path } from "react-hook-form";
import { CustomFieldProps } from "../shared/form";
import { Field } from "@chakra-ui/react";
import { Difficulty } from "../shared";

export const DifficultyField = <T extends FieldValues>({
  control,
}: CustomFieldProps<T>) => {
  return (
    <Field.Root alignSelf={"center"}>
      <Controller
        name={"difficulty" as Path<T>}
        control={control}
        render={({ field }) => (
          <Difficulty
            oneToFive={field.value}
            controlledOnClick={(value) => field.onChange(value)}
          />
        )}
      />
    </Field.Root>
  );
};
