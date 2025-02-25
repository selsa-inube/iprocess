import { useRef, useEffect } from "react";
import { MdClear } from "react-icons/md";

import { Stack, Text, Grid, Icon } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@ptypes/aparences.types";
import { StyledModal } from "./styles";
import { IInfoModal } from "./types";

interface InfoModalProps {
  infoData: IInfoModal[];
  onCloseModal: () => void;
}

function InfoModal(props: InfoModalProps) {
  const { infoData, onCloseModal } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledModal ref={modalRef}>
      <Grid
        templateColumns="auto 0.5fr"
        justifyItems="end"
        justifyContent="space-between"
      >
        <Stack direction="column">
          {infoData.map((field, index) => (
            <Stack key={index} alignItems="center" gap={tokens.spacing.s100}>
              <Icon
                appearance={field.appearanceIcon}
                icon={field.infoIcon}
                size="20px"
              />
              <Text type="body" appearance={ComponentAppearance.DARK} size="small">
                {field.infoName}
              </Text>
            </Stack>
          ))}
        </Stack>
        <MdClear cursor="pointer" onClick={onCloseModal} />
      </Grid>
    </StyledModal>
  );
}

export type { InfoModalProps };
export { InfoModal };