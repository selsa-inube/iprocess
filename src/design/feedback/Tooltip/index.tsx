import { useState } from "react";
import { Text, Icon } from "@inubekit/inubekit";
import { StyledContainer, StyledIcon, StyledText } from "./styles";
import { ITooltipAppearances } from "./types";

interface TooltipProps {
  appearanceIcon: ITooltipAppearances;
  description: string;
  icon: React.ReactNode;
  sizeIcon: string;
}

const Tooltip = (props: TooltipProps) => {
  const { description, icon, sizeIcon, appearanceIcon } = props;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <StyledContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <StyledIcon>
        <Icon
          cursorHover={true}
          appearance={appearanceIcon}
          icon={icon}
          size={sizeIcon}
        />

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
