import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Text, Icon } from "@inubekit/inubekit";
import { Divider } from "@inubekit/divider";

import { ComponentAppearance } from "@ptypes/aparences.types";
import { StyledContainer, StyledHead } from "./styles";

export interface IAccordionProps {
  title: string;
  isOpen: boolean;
  onToggleOpen: () => void;
  children?: JSX.Element | JSX.Element[];
  divider?: boolean;
}
export const Accordion = (props: IAccordionProps) => {
  const { title, isOpen, children, divider= true, onToggleOpen } = props;

  return (
    <StyledContainer>
      <StyledHead onClick={onToggleOpen}>
        <Text
          type="label"
          size={"large"}
          appearance={ComponentAppearance.GRAY}
          weight="bold"
          ellipsis
        >
          {title}
        </Text>

        <Icon
          icon={isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          appearance={ComponentAppearance.DARK}
          spacing="compact"
          cursorHover={true}
          size="24px"
        />
      </StyledHead>

      {isOpen && (
        <>
         { divider && <Divider dashed={true} /> } 
          {children}
        </>
      )}
    </StyledContainer>
  );
};
