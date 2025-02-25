import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";

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
          inube.palette.neutral.N40
        );
      }

      if ($status === "invalid") {
        return (
          theme?.input?.border?.color?.invalid ||
          inube.palette.red.R400
        );
      }

      if ($focused) {
        return (
          theme?.input?.border?.color?.focus || inube.palette.blue.B300
        );
      }
      return (
        theme?.input?.border?.color?.regular || inube.palette.neutral.N40
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
    inube.palette.neutral.N0};
    color: ${({ $isDisabled, theme }) =>
      $isDisabled
        ? theme?.input?.content?.color?.isDisabled ||
        inube.palette.neutral.N70
        : theme?.input?.content?.color?.regular ||
          inube.palette.neutral.N900};

    width: ${({ $withFullwidth }) => $withFullwidth && "auto"};
    height: ${({ $size }) => ($size === "compact" ? "40px" : "48px")};

    border: none;
    ::placeholder {
      color: ${({ theme }) =>
        theme?.input?.content?.color?.regular ||
      inube.palette.neutral.N900};
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

    @media(${mediaQueryMobile}) {
      padding-left: ${tokens.spacing.s050};
      padding-right: ${tokens.spacing.s025};
  }
}
`;

const StyledMessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${tokens.spacing.s200};
  pointer-events: none;
  color: ${({ theme }) =>
    theme?.input?.message?.color?.regular || inube.palette.red.R400};

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
