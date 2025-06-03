import {
  ArrayPath,
  FieldValues,
  Path,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { CustomFieldProps, OptionalFieldBadge } from "../shared/form";
import { CatalogType } from "../../../resources/models";
import {
  Button,
  Field,
  Fieldset,
  Flex,
  Group,
  IconButton,
  Input,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getCatalogTypeLabel } from "./compositionUtils";
import { LuPlus, LuX } from "react-icons/lu";

export const CatalogEntriesFieldset = <T extends FieldValues>({
  control,
  register,
  errors,
}: CustomFieldProps<T>) => {
  const catalogTypes = Object.keys(CatalogType) as Array<
    keyof typeof CatalogType
  >;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "catalogEntries" as ArrayPath<T>,
  });

  const catalogEntries = useWatch({ control, name: "catalogEntries" });

  return (
    <Fieldset.Root>
      <Fieldset.Legend>
        Catalog entries <OptionalFieldBadge />
      </Fieldset.Legend>
      <Fieldset.Content mt={"0.5em"}>
        <Stack>
          {fields.map((_row, i) => (
            <Flex key={i} w={"100%"} gap={"1em"} align={"center"}>
              <Field.Root invalid={!!(errors.catalogEntries as any)?.[i]?.type}>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    {...register(`catalogEntries.${i}.type` as Path<T>, {
                      required: true,
                    })}
                    placeholder="Select catalog"
                  >
                    {catalogTypes.map((t) => (
                      <option
                        key={t}
                        value={CatalogType[t]}
                        disabled={
                          !!catalogEntries?.find(
                            (f: T, fi: number) =>
                              f.type === CatalogType[t] && i !== fi
                          )
                        }
                      >
                        {getCatalogTypeLabel(CatalogType[t])}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root
                invalid={!!(errors.catalogEntries as any)?.[i]?.number}
              >
                <Input
                  {...register(`catalogEntries.${i}.number` as Path<T>, {
                    required: true,
                    maxLength: 10,
                    validate: (v) => (v.trim().length ?? 0) > 0,
                  })}
                />
              </Field.Root>

              {catalogEntries?.[i]?.type === CatalogType.OP && (
                <Group>
                  <Text>No.</Text>
                  <Field.Root
                    invalid={!!(errors.catalogEntries as any)?.[i]?.subNumber}
                  >
                    <Input
                      {...register(`catalogEntries.${i}.subNumber` as Path<T>, {
                        maxLength: 10,
                      })}
                    />
                  </Field.Root>
                </Group>
              )}

              <IconButton
                size={"xs"}
                variant={"ghost"}
                onClick={() => remove(i)}
              >
                <LuX />
              </IconButton>
            </Flex>
          ))}
          <Button
            size={"xs"}
            variant={"ghost"}
            disabled={fields.length >= catalogTypes.length}
            onClick={() => {
              if (fields.length < catalogTypes.length) {
                append({
                  type: "" as CatalogType,
                  number: "",
                });
              }
            }}
          >
            <LuPlus /> Add
          </Button>
        </Stack>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};
