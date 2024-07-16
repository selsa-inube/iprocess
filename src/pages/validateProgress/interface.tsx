import { Stack } from "@inubekit/stack";
//import { Tabs } from "@inubekit/tabs";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";

//import { validateProgressTabsConfig } from "./config/tabs.config";
import { MainTab } from "./tabs/main";

function ValidateProgressUI() {
  //const { isSelected, handleTabChange } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={smallScreen ? "24px" : "32px 64px"}
    >
      <Stack gap="48px" direction="column">
        <Stack gap="24px" direction="column">
          <Text type="title" size={smallScreen ? "medium" : "large"}>
            Validar el Progreso
          </Text>
        </Stack>
            <MainTab />
        </Stack>
      </Stack>
  );
}
export { ValidateProgressUI };
