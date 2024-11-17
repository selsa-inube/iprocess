import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";

import { ComponentAppearance } from "@ptypes/aparences.types";
import { StyledContainer, StyledHead } from "./styles";

export interface IAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children?: JSX.Element | JSX.Element[];
  divider?: boolean;
}
export const Accordion = (props: IAccordionProps) => {
  const { title, defaultOpen = true, children, divider= true } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggleOpen = () => setIsOpen(!isOpen);

  return (
    <StyledContainer>
      <StyledHead onClick={handleToggleOpen}>
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
          appearance="dark"
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
