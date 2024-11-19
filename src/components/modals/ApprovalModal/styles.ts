import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { tokens } from "@design/tokens";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledContainer = styled.div`
  position: relative;
`;

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};

  width: ${(props) => (props.$smallScreen ? "280px" : "402px")};
  min-height: auto;
  border-radius: ${(props) =>
    props.$smallScreen ? `${tokens.spacing.s200}` : `${tokens.spacing.s100}`};
  gap: ${tokens.spacing.s250};
  & > div {
    padding: ${(props) =>
      props.$smallScreen ? `${tokens.spacing.s200}` : `${tokens.spacing.s300}`};
  }
`;

const StyledTextarea = styled.div<IStyledModal>`
  @media (max-width: 490px) {
    div {
      display: inline;
    }

    div:nth-child(2) p {
      text-align: right;
    }

    p {
      white-space: normal;
      margin: ${tokens.spacing.s0};
    }
  }
`;

const StyledToggle = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${tokens.spacing.s100};
`;

export { StyledContainer, StyledModal, StyledTextarea, StyledToggle };
