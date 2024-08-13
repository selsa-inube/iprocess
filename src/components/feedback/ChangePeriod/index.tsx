import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

interface ChangePeriodProps {
  description: string;
}

const ChangePeriod = (props: ChangePeriodProps) => {
  const { description} = props;

  const [showModal] = useState(false);

  return (
    <Stack gap="20px" alignItems="center">
      <Text type="label" size="medium" appearance="dark">
        {description}
      </Text>
      

      {showModal && (
        <></>
      )}
    </Stack>
  );
};

export { ChangePeriod };
