import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { BaseField } from "./BaseField";
import { FieldRowConfig } from "./types";
import { Box, Flex } from "@chakra-ui/react";

type Props<T extends FieldValues> = {
  row: FieldRowConfig<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export const FieldRow = <T extends FieldValues>({
  row,
  control,
  register,
  errors,
}: Props<T>) => {
  return (
    <Flex gap="1em" align="flex-end" justify={"stretch"}>
      {row.map((field) =>
        "render" in field ? (
          <Box flex={"1"} alignSelf={"center"} key={field.key}>
            {field.render({ control, register, errors })}
          </Box>
        ) : (
          <BaseField
            key={field.name as string}
            field={field}
            register={register}
            errors={errors}
          />
        )
      )}
    </Flex>
  );
};
