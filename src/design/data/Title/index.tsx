import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { mediaQueryMobile } from "@src/config/environment";
import { tokens } from "@src/design/tokens";
import { StyledContainerText } from "./styles";

interface TitleProps {
  title: string;
  icon?: JSX.Element;
  navigatePage?: string;
}

function Title(props: TitleProps) {
  const { title, icon, navigatePage } = props;

  const smallScreen = useMediaQuery(mediaQueryMobile);

  const navigate = useNavigate();

  return (
    <>
      <Stack gap={tokens.spacing.s100} direction="column">
        <Stack gap={tokens.spacing.s100} alignItems="center">
          {icon ? (
            <Icon
              appearance="dark"
              cursorHover={true}
              icon={icon}
              spacing="narrow"
              size="20px"
            />
          ) : (
            <Icon
              appearance="dark"
              cursorHover={true}
              icon={<MdArrowBack />}
              spacing="narrow"
              size="20px"
              onClick={() =>
                navigatePage ? navigate(navigatePage) : navigate(-1)
              }
            />
          )}
          <StyledContainerText>
            <Text
              type="title"
              size={smallScreen ? "small" : "medium"}
              weight="bold"
            >
              {title}
            </Text>
          </StyledContainerText>
        </Stack>
      </Stack>
    </>
  );
}

export { Title };
export type { TitleProps };
