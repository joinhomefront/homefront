// This project uses code from shadcn/ui.
// The code is licensed under the MIT License.
// https://github.com/shadcn-ui/ui
"use client";

import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  Noop,
} from "react-hook-form";
import * as React from "react";
import { Platform, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@homefront/ui";

import type { Option } from "./select";
import colors from "../colors";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { RadioGroup } from "./radio-group";
import { Select } from "./select";
import { Switch } from "./switch";
import { Text } from "./text";
import { Textarea } from "./textarea";

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState, handleSubmit } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!Object.prototype.hasOwnProperty.call(fieldContext, "name")) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { nativeID } = itemContext;

  return {
    nativeID,
    name: fieldContext.name,
    formItemNativeID: `${nativeID}-form-item`,
    formDescriptionNativeID: `${nativeID}-form-item-description`,
    formMessageNativeID: `${nativeID}-form-item-message`,
    handleSubmit,
    ...fieldState,
  };
};

interface FormItemContextValue {
  nativeID: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const nativeID = React.useId();

  return (
    <FormItemContext.Provider value={{ nativeID }}>
      <View ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  Omit<React.ComponentPropsWithoutRef<typeof Label>, "children"> & {
    children: string;
  }
>(({ className, nativeID: _nativeID, ...props }, ref) => {
  const { error, formItemNativeID } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(
        "native:pb-2 px-px pb-1",
        error && "text-destructive",
        className,
      )}
      nativeID={formItemNativeID}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { formDescriptionNativeID } = useFormField();

  return (
    <Text
      ref={ref}
      nativeID={formDescriptionNativeID}
      className={cn("pt-1 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageNativeID } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Text
      ref={ref}
      nativeID={formMessageNativeID}
      className={cn(
        "font-sans text-sm font-medium text-destructive animate-in animate-out",
        className,
      )}
      {...props}
    >
      {body}
    </Text>
  );
});
FormMessage.displayName = "FormMessage";

type Override<T, U> = Omit<T, keyof U> & U;

interface FormFieldFieldProps<T> {
  name: string;
  onBlur: Noop;
  onChange: (val: T) => void;
  value: T;
  disabled?: boolean;
}

type FormItemProps<T extends React.ElementType, U> = Override<
  React.ComponentPropsWithoutRef<T>,
  FormFieldFieldProps<U>
> & {
  label?: string;
  description?: string;
};

interface FormInputProps {
  inputClassName?: string;
  inputIcon?: React.ReactNode;
  inputIconClassName?: string;
}

const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  FormItemProps<typeof Input, string> & FormInputProps
>(
  (
    {
      label,
      description,
      onChange,
      inputClassName,
      inputIcon,
      inputIconClassName,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<React.ComponentRef<typeof Input>>(null);
    const {
      error,
      formItemNativeID,
      formDescriptionNativeID,
      formMessageNativeID,
    } = useFormField();

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useImperativeHandle(ref, () => {
      if (!inputRef.current) {
        return {} as React.ComponentRef<typeof Input>;
      }
      return inputRef.current;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef.current]);

    function handleOnLabelPress() {
      if (!inputRef.current) {
        return;
      }
      if (inputRef.current.isFocused()) {
        inputRef.current.blur();
      } else {
        inputRef.current.focus();
      }
    }

    return (
      <FormItem>
        {!!label && (
          <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}

        <View className="relative">
          <Input
            ref={inputRef}
            aria-labelledby={formItemNativeID}
            aria-describedby={
              !error
                ? `${formDescriptionNativeID}`
                : `${formDescriptionNativeID} ${formMessageNativeID}`
            }
            aria-invalid={!!error}
            onChangeText={onChange}
            {...props}
            className={cn(
              error && "web:focus-visible:ring-destructive border-destructive",
              !!inputIcon && "pr-10",
              inputClassName,
            )}
          />
          {!!inputIcon && (
            <View
              className={cn(
                "absolute bottom-0 right-0 top-0 items-center justify-center p-2",
                inputIconClassName,
              )}
            >
              {inputIcon}
            </View>
          )}
        </View>
        <FormMessage />
        {!!description && <FormDescription>{description}</FormDescription>}
      </FormItem>
    );
  },
);

FormInput.displayName = "FormInput";

const FormTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  FormItemProps<typeof Textarea, string>
>(({ label, description, onChange, ...props }, ref) => {
  const textareaRef = React.useRef<React.ComponentRef<typeof Textarea>>(null);
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useImperativeHandle(ref, () => {
    if (!textareaRef.current) {
      return {} as React.ComponentRef<typeof Textarea>;
    }
    return textareaRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaRef.current]);

  function handleOnLabelPress() {
    if (!textareaRef.current) {
      return;
    }
    if (textareaRef.current.isFocused()) {
      textareaRef.current.blur();
    } else {
      textareaRef.current.focus();
    }
  }

  return (
    <FormItem>
      {!!label && (
        <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
          {label}
        </FormLabel>
      )}

      <Textarea
        ref={textareaRef}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onChangeText={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormTextarea.displayName = "FormTextarea";

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  Omit<FormItemProps<typeof Checkbox, boolean>, "checked" | "onCheckedChange">
>(({ label, description, value, onChange, ...props }, ref) => {
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  function handleOnLabelPress() {
    onChange(!value);
  }

  return (
    <FormItem className="px-1">
      <View className="flex-row items-center gap-3">
        <Checkbox
          ref={ref}
          aria-labelledby={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          onCheckedChange={onChange}
          checked={value}
          {...props}
        />
        {!!label && (
          <FormLabel
            className="pb-0"
            nativeID={formItemNativeID}
            onPress={handleOnLabelPress}
          >
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormCheckbox.displayName = "FormCheckbox";

const FormRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  Omit<FormItemProps<typeof RadioGroup, string>, "onValueChange">
>(({ label, description, value, onChange, ...props }, ref) => {
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  return (
    <FormItem className="gap-3">
      <View>
        {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
        {!!description && (
          <FormDescription className="pt-0">{description}</FormDescription>
        )}
      </View>
      <RadioGroup
        ref={ref}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onValueChange={onChange}
        value={value}
        {...props}
      />

      <FormMessage />
    </FormItem>
  );
});

FormRadioGroup.displayName = "FormRadioGroup";

/**
 * @prop {children} 
 * @example
 *  <SelectTrigger className='w-[250px]'>
      <SelectValue
        className='text-foreground text-sm native:text-lg'
        placeholder='Select a fruit'
      />
    </SelectTrigger>
    <SelectContent insets={contentInsets} className='w-[250px]'>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem label='Apple' value='apple'>
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
 */
const FormSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  Omit<
    FormItemProps<typeof Select, Partial<Option>>,
    "open" | "onOpenChange" | "onValueChange"
  >
>(({ label, description, onChange, value, ...props }, ref) => {
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <Select
        ref={ref}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        value={
          value
            ? { label: value.label ?? "", value: value.label ?? "" }
            : undefined
        }
        onValueChange={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormSelect.displayName = "FormSelect";

const FormSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  Omit<FormItemProps<typeof Switch, boolean>, "checked" | "onCheckedChange">
>(({ label, description, value, onChange, ...props }, ref) => {
  const switchRef = React.useRef<React.ComponentRef<typeof Switch>>(null);
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useImperativeHandle(ref, () => {
    if (!switchRef.current) {
      return {} as React.ComponentRef<typeof Switch>;
    }
    return switchRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchRef.current]);

  function handleOnLabelPress() {
    onChange(!value);
  }

  return (
    <FormItem className="px-1">
      <View className="flex-row items-center gap-3">
        <Switch
          ref={switchRef}
          aria-labelledby={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          onCheckedChange={onChange}
          checked={value}
          {...props}
        />
        {!!label && (
          <FormLabel
            className="pb-0"
            nativeID={formItemNativeID}
            onPress={handleOnLabelPress}
          >
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormSwitch.displayName = "FormSwitch";

interface FormOtpInputProps {
  label?: string;
  description?: string;
}

const FormOtpInput = React.forwardRef<
  React.ComponentRef<typeof OtpInput>,
  FormItemProps<typeof OtpInput, string> & FormOtpInputProps
>(({ label, description, onChange, ...props }, ref) => {
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <View>
        <OtpInput
          ref={ref}
          autoFocus
          textInputProps={{
            caretHidden: true,
            editable: true,
            style: {
              zIndex: 6,
              color: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.02,
              textAlign: "center",
              fontSize: 16,
              ...Platform.select({
                web: {
                  background: "0 0",
                  border: "none",
                  outline: "none",
                },
              }),
            },
          }}
          onTextChange={onChange}
          aria-labelledby={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          theme={{
            pinCodeContainerStyle: {
              borderColor: error ? colors.destructive[500] : colors.gray[300],
              borderWidth: 1,
            },
            focusedPinCodeContainerStyle: {
              borderColor: colors.primary[500],
              borderWidth: 1,
              boxShadow: `0 0 0 3px ${colors.primary[200]}`,
            },
            focusStickStyle: {
              backgroundColor: colors.gray[800],
              width: 1,
            },
          }}
          {...props}
        />
      </View>
      <FormMessage />
      {!!description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
});

FormOtpInput.displayName = "FormOtpInput";

export {
  Form,
  FormCheckbox,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormOtpInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
  useFormField,
};

export type { FormItemProps, FormInputProps, FormFieldFieldProps };
