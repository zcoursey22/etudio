import {
  Box,
  Button,
  Field,
  Flex,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useResourceContext } from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Goal, GoalStatus, ResourcePayload } from "../../../resources/models";
import { getStatusLabel } from "./goalUtils";
import { FieldRow, FieldType, OptionalFieldBadge } from "../shared/form";
import { FavoriteField } from "../shared/form/FavoriteField";

interface Props {
  handleClose: () => void;
  goal?: Goal;
}

type Payload = ResourcePayload<Goal>;

export const CreateGoalForm = ({ handleClose, goal }: Props) => {
  const { useCreate, useUpdate } = useResourceContext();
  const { createResource } = useCreate();
  const { updateResource } = useUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<Payload>({ defaultValues: goal });

  const submit: SubmitHandler<Payload> = (payload) => {
    payload = {
      ...payload,
      name: payload.name.trim(),
      description: payload.description?.trim(),
    };
    console.log(payload);
    const apiCall = goal
      ? updateResource({ id: goal.id, payload, method: "PUT" })
      : createResource(payload);
    apiCall
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        handleClose();
      });
  };

  const fieldRows: FieldRow<Payload>[] = [
    [
      {
        render: ({ control }) => (
          <FavoriteField
            control={control}
            register={register}
            errors={errors}
          />
        ),
        key: "favorite",
      },
      {
        name: "name",
        label: "Name",
        type: FieldType.INPUT,
        required: true,
        showRequiredIndicator: true,
        maxLength: 50,
        autoFocus: true,
      },
    ],
    [
      {
        name: "description",
        label: "Description",
        type: FieldType.TEXTAREA,
        showRequiredIndicator: true,
        maxLength: 250,
      },
    ],
    [
      {
        name: "status",
        label: "Status",
        type: FieldType.SELECT,
        required: true,
        defaultValue: GoalStatus.NOT_STARTED,
        values: [
          GoalStatus.NOT_STARTED,
          GoalStatus.IN_PROGRESS,
          GoalStatus.PAUSED,
          GoalStatus.DONE,
        ].map((status) => ({
          value: status,
          label: getStatusLabel(status),
        })),
      },
    ],
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Stack gap={"1em"}>
          {fieldRows.map((row, i) => (
            <Flex key={i} gap="1em" align="center">
              {row.map((field) => {
                if ("render" in field) {
                  return (
                    <Box flex={"1"} key={field.key}>
                      {field.render({ control, register, errors })}
                    </Box>
                  );
                }

                const {
                  name,
                  label,
                  type,
                  required,
                  showRequiredIndicator,
                  defaultValue,
                  values,
                  maxLength,
                  autoFocus,
                } = field;
                const value = watch(name as keyof Payload) || "";
                const charCount =
                  typeof value === "string" ? value.trim().length : 0;
                const isOverCharacterLimit =
                  maxLength !== undefined && charCount > maxLength;

                return (
                  <Field.Root
                    key={name}
                    invalid={!!errors[name] || isOverCharacterLimit}
                    required={required}
                  >
                    <Field.Label>
                      {label}
                      {showRequiredIndicator && (
                        <Field.RequiredIndicator
                          fallback={!required && <OptionalFieldBadge />}
                        />
                      )}
                      <Field.ErrorText>
                        {isOverCharacterLimit
                          ? `${charCount}/${maxLength} characters`
                          : errors[name]?.message}
                      </Field.ErrorText>
                    </Field.Label>
                    {type === FieldType.INPUT ? (
                      <Input
                        {...register(name, {
                          required: required ? "" : false,
                          validate: (v) =>
                            required
                              ? (v?.toString()?.trim().length ?? 0) > 0 || ""
                              : true,
                          maxLength: {
                            value: maxLength || Infinity,
                            message: "",
                          },
                        })}
                        defaultValue={defaultValue as string}
                        autoFocus={autoFocus}
                      />
                    ) : type === FieldType.TEXTAREA ? (
                      <Textarea
                        {...register(name, {
                          required: required ? "" : false,
                          validate: (v) =>
                            required
                              ? (v?.toString()?.trim().length ?? 0) > 0 || ""
                              : true,
                          maxLength: {
                            value: maxLength || Infinity,
                            message: "",
                          },
                        })}
                        defaultValue={defaultValue as string}
                        autoFocus={autoFocus}
                      />
                    ) : (
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          {...register(name, {
                            required: required ? "" : false,
                          })}
                          defaultValue={defaultValue as string}
                          autoFocus={autoFocus}
                        >
                          {values?.map(({ value, label }) => (
                            <option
                              key={value as string}
                              value={value as string}
                            >
                              {label}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  </Field.Root>
                );
              })}
            </Flex>
          ))}

          <Flex mt={"1em"} gap={"0.5em"} justifyContent={"flex-end"}>
            <Button variant={"surface"} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={"submit"}>{goal ? "Update" : "Create"}</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
