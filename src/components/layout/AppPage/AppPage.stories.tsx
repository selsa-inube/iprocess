import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { AppContext } from "@context/AppContext";
import linparLogo from "@assets/images/linpar.png";

import { AppPage } from ".";

const usersMock = {
  firstName: "David",
  firstLastName: "Garzon",
  };

const { firstName, firstLastName } = usersMock;

const useContext = {
  appData: {

    portal: {
      abbreviatedName: "",
      staffPortalCatalogId: "",
      businessManagerId: "",
    },
    businessManager: {
      publicCode: "",
      abbreviatedName: "",
      urlBrand: "",
      urlLogo: "",
    },
      user: {
      userAccount: `${firstName + " " + firstLastName}`,
      userName: "abc123",
    },
    businessUnit:{
      publicCode: "LINPAR",
      abbreviatedName: "LINPAR",
      businessUnit: "LINPAR",
      urlLogo: linparLogo,
    },} ,
  businessUnitSigla: "LINPAR", 
  setAppData: () => {}, 
  setBusinessUnitSigla: () => {}, 
};

const meta: Meta<typeof AppPage> = {
  title: "layout/appPage",
  component: AppPage,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <AppContext.Provider value={useContext}>
          <Story />
        </AppContext.Provider>
      </BrowserRouter>
    ),
  ],
};

export const Default = () => <AppPage />;

export default meta;
