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
  } = useForm<CreateGoalPayload>();

  const submit: SubmitHandler<CreateGoalPayload> = (payload) => {
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
    },
    {
      name: "description",
      label: "Description",
      type: FieldType.TEXTAREA,
      showRequiredIndicator: true,
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
            }) => (
              <Field.Root
                key={name}
                invalid={!!errors[name]}
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
                </Field.Label>
                {type === FieldType.INPUT ? (
                  <Input
                    {...register(
                      name,
                      required ? { required: "This field is required" } : {}
                    )}
                    defaultValue={defaultValue}
                  />
                ) : type === FieldType.TEXTAREA ? (
                  <Textarea
                    {...register(
                      name,
                      required ? { required: "This field is required" } : {}
                    )}
                    defaultValue={defaultValue}
                  />
                ) : (
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...register(
                        name,
                        required ? { required: "This field is required" } : {}
                      )}
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
            )
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
