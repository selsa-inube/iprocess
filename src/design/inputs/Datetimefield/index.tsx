import { useState } from "react";
import { MdOutlineWarning } from "react-icons/md";

import { Text } from "@inubekit/text";
import { Label } from "@inubekit/label";
import { Icon } from "@inubekit/icon";
import { tokens } from "@design/tokens";

import { IDatetimefieldSize, IDatetimefieldStatus } from "./types";
import {
  StyledContainer,
  StyledContainerLabel,
  StyledInputContainer,
  StyledMessageContainer,
} from "./styles";


interface DatetimefieldProps {
  id: string;
  label?: string;
  name?: string;
  isDisabled?: boolean;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  status?: IDatetimefieldStatus;
  message?: string;
  size?: IDatetimefieldSize;
  withFullwidth?: boolean;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  focused?: boolean;
}

const Datetimefield = (props: DatetimefieldProps) => {
  const {
    label,
    name,
    id,
    isDisabled = false,
    value,
    onChange,
    isRequired = false,
    status = "pending",
    message,
    size = "wide",
    withFullwidth = false,
    onFocus,
    onBlur,
  } = props;

  const [focused, setFocused] = useState(false);

  const interceptFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(true);
    try {
      onFocus && onFocus(e);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  const interceptBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(false);
    try {
      onBlur && onBlur(e);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  const interceptOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onChange && onChange(e);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <StyledContainer $withFullwidth={withFullwidth} $isDisabled={isDisabled} $size={size}>
      <StyledContainerLabel
        $alignItems="center"
        $wrap="wrap"
        $size={size}
        $isDisabled={isDisabled}
      >
        {label && (
          <Label
            htmlFor={id}
            disabled={isDisabled}
            focused={focused}
            invalid={status === "invalid" ? true : false}
            size={size === "compact" ? "medium" : "large"}
            margin= {`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
          >
            {label}
          </Label>
        )}

        {isRequired && !isDisabled && (
          <Text
            type="body"
            size="small"
            appearance="danger"
            margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
            textAlign={"center"}
          >
            (Requerido)
          </Text>
        )}
      </StyledContainerLabel>

      <StyledInputContainer
        $isDisabled={isDisabled}
        $focused={focused}
        $status={status}
        $size={size}
        $withFullwidth={withFullwidth}
      >
        <input
          name={name}
          id={id}
          disabled={isDisabled}
          type="datetime-local"
          value={value}
          required={isRequired}
          onChange={interceptOnChange}
          onFocus={interceptFocus}
          onBlur={interceptBlur}
        />
      </StyledInputContainer>

      {status === "invalid" && !isDisabled && message && (
        <StyledMessageContainer>
          <Icon appearance="danger" icon={<MdOutlineWarning />} />
          <Text
            type="body"
            size="small"
            textAlign="start"
            margin={`${tokens.spacing.s100} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s050}`}
            appearance="danger"
          >
            {message}
          </Text>
        </StyledMessageContainer>
      )}
    </StyledContainer>
  );
};

export { Datetimefield };
export type { DatetimefieldProps };
