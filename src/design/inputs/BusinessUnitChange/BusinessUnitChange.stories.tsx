import { Meta } from "@storybook/react";
import { businessUnitDataMock } from "@mocks/businessUnits/businessUnits.mock";

import { BusinessUnitChange } from ".";

const meta: Meta<typeof BusinessUnitChange> =  {
    title: ' inputs/BusinessUnitChange',
    component: BusinessUnitChange,
  };
 
const Default = () => {
    return(
        <BusinessUnitChange businessUnits={businessUnitDataMock}/>
    )
    
}

export { Default }
export default meta;