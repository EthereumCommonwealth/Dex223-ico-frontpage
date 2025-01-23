import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";
import { NumericFormat } from "react-number-format";

import Input, { InputSize } from "@/components/atoms/Input";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: ReactNode;
  variant?: "default" | "search";
  internalText?: string | ReactNode;
  internalTextClassName?: string;
  isError?: boolean;
  isWarning?: boolean;
  inputSize?: InputSize;
} & (
    | {
        error?: boolean | string;
        warning?: never;
      }
    | { warning?: string | boolean; error?: never }
  ) &
  (
    | {
        isNumeric?: never;
      }
    | {
        isNumeric?: true;
        defaultValue?: string | number | null | undefined;
        value?: string | number | null | undefined;
        type?: "tel" | "text" | "password";
        decimalScale?: number;
      }
  );

const inputLabelSizeMap: Record<InputSize, string> = {
  [InputSize.DEFAULT]: "text-14",
  [InputSize.LARGE]: "text-16",
};
export function InputLabel({
  label,
  inputSize = InputSize.DEFAULT,
  ...props
}: Omit<Props & { inputSize?: InputSize }, "helperText">) {
  return (
    <p
      className={clsx(
        "font-bold mb-1 flex items-center gap-1 text-secondary-text",
        props.disabled && "opacity-50",
        inputLabelSizeMap[inputSize],
      )}
    >
      {label}
    </p>
  );
}

export function HelperText({
  helperText,
  error,
  warning,
  disabled,
}: Pick<Props, "helperText" | "error" | "warning" | "disabled">) {
  return (
    <div className="text-12 mt-1 min-h-4">
      {typeof helperText !== "undefined" && !error && (
        <div className={clsx("text-12 text-tertiary-text h-4", disabled && "opacity-50")}>
          {helperText}
        </div>
      )}
      {typeof error !== "undefined" && <p className="text-12 text-red-light h-4">{error}</p>}
      {warning && <p className="text-12 text-orange mt-1 h-4">{warning}</p>}
    </div>
  );
}
//TODO: add custom copmonent to pass instead of Input, for example Search Input
export default function TextField({
  label,
  helperText,
  error,
  warning,
  tooltipText,
  variant = "default",
  internalText,
  isError = false,
  isWarning = false,
  inputSize = InputSize.LARGE,
  ...props
}: Props) {
  return (
    <div>
      <InputLabel inputSize={inputSize} label={label} tooltipText={tooltipText} />
        <div className="relative">
          {props.isNumeric ? (
            (() => {
              const { isNumeric, ...rest } = props;
              return (
                <NumericFormat
                  inputMode="decimal"
                  allowedDecimalSeparators={[","]}
                  isError={Boolean(error) || isError}
                  isWarning={Boolean(warning) || isWarning}
                  customInput={Input}
                  inputSize={inputSize}
                  {...rest}
                />
              );
            })()
          ) : (
            <Input
              isError={Boolean(error) || isError}
              isWarning={Boolean(warning) || isWarning}
              {...props }
            />
          )}
          {internalText && (
            <span className="absolute right-5 text-tertiary-text top-1/2 -translate-y-1/2">
              {internalText}
            </span>
          )}
        </div>
      <HelperText
        helperText={helperText}
        error={error}
        warning={warning}
        disabled={props.disabled}
      />
    </div>
  );
}
