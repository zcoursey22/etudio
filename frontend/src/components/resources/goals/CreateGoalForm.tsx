import {
  Badge,
  Box,
  Button,
  Field,
  Flex,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { CreateGoalPayload, useCreateGoal } from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoalStatus } from "../../../models";
import { getStatusLabel } from "./goalUtils";

enum FieldType {
  INPUT,
  TEXTAREA,
  SELECT,
}

type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type: FieldType;
  required?: boolean;
  showRequiredIndicator?: boolean;
  maxLength?: number;
  defaultValue?: T[keyof T];
  values?: readonly { value: T[keyof T]; label: string }[];
};

interface Props {
  handleClose: () => void;
}

export const CreateGoalForm = ({ handleClose }: Props) => {
  const { createResource } = useCreateGoal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateGoalPayload>();

  const submit: SubmitHandler<CreateGoalPayload> = (payload) => {
    payload = {
      ...payload,
      name: payload.name.trim(),
      description: payload.description?.trim(),
    };
    console.log(payload);
    createResource(payload)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        handleClose();
      });
  };

  const fields: FieldConfig<CreateGoalPayload>[] = [
    {
      name: "name",
      label: "Name",
      type: FieldType.INPUT,
      required: true,
      showRequiredIndicator: true,
      maxLength: 50,
    },
    {
      name: "description",
      label: "Description",
      type: FieldType.TEXTAREA,
      showRequiredIndicator: true,
      maxLength: 250,
    },
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
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Stack gap={"1em"}>
          {fields.map(
            ({
              name,
              label,
              type,
              required,
              showRequiredIndicator,
              defaultValue,
              values,
              maxLength,
            }) => {
              const value = watch(name as keyof CreateGoalPayload) || ""; // fallback to empty string
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
                        fallback={
                          !required && (
                            <Badge
                              size={"xs"}
                              fontStyle={"italic"}
                              variant={"plain"}
                              color={"fg.subtle"}
                            >
                              optional
                            </Badge>
                          )
                        }
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
                          required ? (v?.trim().length ?? 0) > 0 || "" : true,
                        maxLength: {
                          value: maxLength || Infinity,
                          message: "",
                        },
                      })}
                      defaultValue={defaultValue}
                    />
                  ) : type === FieldType.TEXTAREA ? (
                    <Textarea
                      {...register(name, {
                        required: required ? "" : false,
                        validate: (v) =>
                          required ? (v?.trim().length ?? 0) > 0 || "" : true,
                        maxLength: {
                          value: maxLength || Infinity,
                          message: "",
                        },
                      })}
                      defaultValue={defaultValue}
                    />
                  ) : (
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        {...register(name, { required: required ? "" : false })}
                        defaultValue={defaultValue}
                      >
                        {values?.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  )}
                </Field.Root>
              );
            }
          )}

          <Flex mt={"1em"} gap={"0.5em"} justifyContent={"flex-end"}>
            <Button variant={"surface"} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={"submit"}>Create</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
