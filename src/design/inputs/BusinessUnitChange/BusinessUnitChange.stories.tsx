import { Meta } from "@storybook/react";
import { businessUnitDataMock } from "@mocks/businessUnits/businessUnits.mock";
import { AppContext } from "@context/AppContext";
import { BusinessUnitChange } from ".";
import { Stack } from "@inubekit/inubekit";

const meta: Meta<typeof BusinessUnitChange> = {
  title: "inputs/BusinessUnitChange",
  component: BusinessUnitChange,
};

const defaultContextValue = {
  appData: {
    businessUnit: {
      publicCode: "defaultCode",
      abbreviatedName: "defaultName",
      languageId: "es",
      urlLogo: "defaultUrlLogo",
    },
    portal: {
      abbreviatedName: "",
      staffPortalCatalogId: "",
      businessManagerId: "",
      publicCode: "",
    },
    businessManager: {
      publicCode: "",
      abbreviatedName: "",
      urlBrand: "",
      urlLogo: "",
    },
    user: {
      userAccount: "Angie Pinilla",
      userName: "Angie Pinilla",
    },
  },
  setBusinessUnitSigla: () => {},
  businessUnitSigla: "",
  businessUnitsToTheStaff: [],
  setAppData: () => {},
  setBusinessUnitsToTheStaff: () => {},
};

const Default = () => {
  return (
    <AppContext.Provider value={defaultContextValue}>
      <Stack width="100px">
      <BusinessUnitChange
        businessUnits={businessUnitDataMock}
        selectedClient={"Cooservunal"}
        onLogoClick={() => {}}
      />
      </Stack>
    </AppContext.Provider>
  );
};

export { Default };
export default meta;
