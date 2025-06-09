import {
  Field,
  Input,
  NativeSelect,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { BaseFieldConfig, FieldType } from "./types";
import { OptionalFieldBadge } from "./OptionalFieldBadge";

type Props<T extends FieldValues> = {
  field: BaseFieldConfig<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export const BaseField = <T extends FieldValues>({
  field,
  control,
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

  const value = useWatch<T>({ control, name: name as Path<T> });

  if (hidden) return null;

  const error = errors[name];
  const invalid = !!error;

  const charCount = value?.length ?? 0;
  const overCharLimit = maxLength !== undefined && charCount > maxLength;

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
        <Field.ErrorText>
          {overCharLimit
            ? `${charCount}/${maxLength}`
            : error?.message?.toString()}
        </Field.ErrorText>
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
          autoresize
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
        <Controller
          name={name as Path<T>}
          control={control}
          rules={{
            required: required ? "" : false,
            validate: (v) =>
              required ? (v?.toString().length ?? 0) > 0 || "" : true,
          }}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <RadioGroup.Root
              colorPalette="blue"
              value={value}
              onValueChange={({ value }) => onChange(value)}
            >
              <Stack gap="1em">
                {values?.map(({ value, label }) => (
                  <RadioGroup.Item
                    key={value as string}
                    value={value}
                    disabled={disabled}
                  >
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator
                      borderColor={invalid ? "fg.error" : "auto"}
                    />
                    <RadioGroup.ItemText fontWeight={"normal"}>
                      {label}
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </Stack>
            </RadioGroup.Root>
          )}
        />
      )}
    </Field.Root>
  );
};
