import {
  Field,
  Input,
  NativeSelect,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { BaseFieldConfig, FieldType } from "./types";
import { OptionalFieldBadge } from "./OptionalFieldBadge";

type Props<T extends FieldValues> = {
  field: BaseFieldConfig<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export const BaseField = <T extends FieldValues>({
  field,
  register,
  errors,
}: Props<T>) => {
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
    placeholder,
    hidden,
    disabled,
  } = field;

  if (hidden) return null;

  const error = errors[name];
  const invalid = !!error;

  return (
    <Field.Root
      key={name as string}
      invalid={invalid}
      required={required}
      disabled={disabled}
    >
      <Field.Label>
        {label}
        {showRequiredIndicator && (
          <Field.RequiredIndicator
            fallback={!required && <OptionalFieldBadge />}
          />
        )}
        <Field.ErrorText>{error?.message as string}</Field.ErrorText>
      </Field.Label>

      {type === FieldType.INPUT && (
        <Input
          {...register(name as Path<T>, {
            required: required ? "" : false,
            validate: (v) =>
              required ? (v?.toString()?.trim().length ?? 0) > 0 || "" : true,
            maxLength: {
              value: maxLength ?? Infinity,
              message: "",
            },
          })}
          defaultValue={defaultValue as string}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
      )}

      {type === FieldType.TEXTAREA && (
        <Textarea
          {...register(name as Path<T>, {
            required: required ? "" : false,
            validate: (v) =>
              required ? (v?.toString()?.trim().length ?? 0) > 0 || "" : true,
            maxLength: {
              value: maxLength ?? Infinity,
              message: "",
            },
          })}
          defaultValue={defaultValue as string}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
      )}

      {type === FieldType.SELECT && (
        <NativeSelect.Root>
          <NativeSelect.Field
            {...register(name as Path<T>, {
              required: required ? "" : false,
              validate: (v) =>
                required ? (v?.toString().length ?? 0) > 0 || "" : true,
            })}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            placeholder={placeholder}
          >
            {values?.map(({ value, label }) => (
              <option key={value as string} value={value}>
                {label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      )}

      {type === FieldType.RADIO && (
        <RadioGroup.Root
          colorPalette={"blue"}
          {...register(name as Path<T>, {
            required: required ? "" : false,
          })}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
        >
          <Stack gap={"1em"}>
            {values?.map(({ value, label }) => (
              <RadioGroup.Item
                key={value as string}
                value={value}
                disabled={disabled}
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </Stack>
        </RadioGroup.Root>
      )}
    </Field.Root>
  );
};
