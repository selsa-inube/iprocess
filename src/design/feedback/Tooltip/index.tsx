import { MdInfoOutline } from "react-icons/md";
import { useState } from "react";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { StyledContainer, StyledIcon, StyledText } from "./styles";


interface TooltipProps {
  description: string;
}

const Tooltip = (props: TooltipProps) => {
  const { description } = props;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <StyledContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <StyledIcon>
        <Icon cursorHover={true} appearance={"dark"} icon={<MdInfoOutline />} />

        {isVisible && (
          <StyledText>
            <Text type="body" size="small" appearance="light">
              {description}
            </Text>
          </StyledText>
        )}

      </StyledIcon>
    </StyledContainer>
  );
};

export { Tooltip };
export type { TooltipProps };
