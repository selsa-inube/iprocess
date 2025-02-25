import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: ${(props) => (props.$smallScreen ? "300px" : "360px")};
  height: auto;
  border-radius: ${tokens.spacing.s100};
  padding: ${tokens.spacing.s300};
  gap: ${tokens.spacing.s300};
  box-sizing: border-box;
`;

const StyledTextarea = styled.div<IStyledModal>`
  textarea {
    font-size: 14px;
  }

  @media (max-width: 490px) {
    div {
      display: inline;
    }

    div:nth-child(2) p {
      text-align: right;
    }

    & p {
      white-space: normal;
      margin: 0px;
    }
  }
`;

export { StyledModal, StyledTextarea };
