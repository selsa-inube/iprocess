import { useEffect, useState } from "react";
import { Text } from "@inubekit/text";

import { StyledContainer } from "./styles";

interface OptionItemProps {
  id: string;
  label: string;
  selectedId: string;
  onClick: () => void;
}

const OptionItem = (props: OptionItemProps) => {
  const { id, label, selectedId, onClick } = props;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (id === selectedId) {
      setIsSelected(true);
    }
  }, [id, selectedId]);

  return (
    <StyledContainer id={id} onClick={onClick} $isSelected={isSelected}>
      <Text textAlign="start" size="medium">
        {label}
      </Text>
    </StyledContainer>
  );
};

export { OptionItem };
export type { OptionItemProps };
