import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { tokens } from "@design/tokens";

interface IStyledContainer {
  $withFullwidth?: boolean;
  $isDisabled?: boolean;
  $size?: string;
  $alignItems?: string;
}

interface StyledContainerLabel {
  $isDisabled?: boolean;
  $alignItems?: string;
  $wrap?: string;
  $size?: string;
}

interface IStyledInputContainer {
  $isDisabled?: boolean;
  $status?: string;
  $focused?: boolean;
  $withFullwidth?: boolean;
  $size?: string;
}

const StyledContainer = styled.div<IStyledContainer>`
  cursor: ${({ $isDisabled }) => $isDisabled && "not-allowed"};
  width: ${({ $withFullwidth }) => ($withFullwidth ? "100%" : "280px")};
`;

const StyledContainerLabel = styled.div<StyledContainerLabel>`
  display: flex;
  align-items: center;
  margin-bottom: ${tokens.spacing.s050};
  pointer-events: ${({ $isDisabled }) => $isDisabled && "none"};
`;

const StyledInputContainer = styled.div<IStyledInputContainer>`
  display: grid;
  align-items: center;
  box-sizing: border-box;
  border-radius: ${tokens.spacing.s100};
  user-select: none;
  padding: ${tokens.spacing.s0};;
  pointer-events: ${({ $isDisabled }) => $isDisabled && "none"};
  opacity: ${({ $isDisabled }) => $isDisabled && "0.5"};
  grid-template-columns: 1fr;
  border: 1px solid
    ${({ $isDisabled, $status, $focused, theme }) => {
      if ($isDisabled) {
        return (
          theme?.input?.border?.color?.disabled ||
          inube.input.border.color.disabled
        );
      }

      if ($status === "invalid") {
        return (
          theme?.input?.border?.color?.invalid ||
          inube.input.border.color.invalid
        );
      }

      if ($focused) {
        return (
          theme?.input?.border?.color?.focus || inube.input.border.color.focus
        );
      }
      return (
        theme?.input?.border?.color?.regular || inube.input.border.color.regular
      );
    }};

  input {
    outline: none;
    border-radius: ${tokens.spacing.s100};
    font-family: ${({ theme }) =>
      theme?.typography?.body?.large?.font || inube.typography.body.large.font};
    font-size: ${inube.typography.body.large.size};
    line-height: ${inube.typography.body.large.lineHeight};
    letter-spacing: ${inube.typography.body.large.tracking};
    padding-left: ${tokens.spacing.s200};
    padding-right: ${tokens.spacing.s200};
    background-color: ${({ theme }) =>
      theme?.input?.background?.color?.regular ||
      inube.input.background.color.regular};
    color: ${({ $isDisabled, theme }) =>
      $isDisabled
        ? theme?.input?.content?.color?.isDisabled ||
          inube.input.content.color.disabled
        : theme?.input?.content?.color?.regular ||
          inube.input.content.color.regular};

    width: ${({ $withFullwidth }) => $withFullwidth && "auto"};
    height: ${({ $size }) => ($size === "compact" ? "40px" : "48px")};

    border: none;
    ::placeholder {
      color: ${({ theme }) =>
        theme?.input?.content?.color?.regular ||
        inube.input.content.color.regular};
    }

    &:focus {
      outline: none;
      border-width: ${tokens.spacing.s025};
    }

    &::-webkit-calendar-picker-indicator {
      cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
    }

    &::-moz-calendar-picker-indicator {
      display: none;
    }

    &:-webkit-autofill {
      -webkit-background-clip: text;
    }

    &::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const StyledMessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${tokens.spacing.s200};
  pointer-events: none;
  color: ${({ theme }) =>
    theme?.input?.message?.color?.regular || inube.input.message.color.regular};

  & svg {
    width: 14px;
    height: 14px;
    margin-top: ${tokens.spacing.s100};;
  }
`;

export {
  StyledContainer,
  StyledContainerLabel,
  StyledInputContainer,
  StyledMessageContainer,
};
