import { MdClear } from 'react-icons/md';
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Label } from "@inubekit/label";
import { Fieldset } from "@inubekit/fieldset";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { tokens } from "@design/tokens";
import { StartProcesses } from "@pages/startProcess/types";
import { StyledFields } from "../styles";
import { ILabel } from '../types';

interface GeneralDataMobileProps {
    dataInformationProcess: StartProcesses;
    labels: ILabel[];
    onCloseModal: () => void;
}

const GeneralDataMobile =(props: GeneralDataMobileProps) =>{

    const { dataInformationProcess, labels, onCloseModal } = props;

    return (
        <>
        <Stack direction="column">
        <Stack alignItems="center" justifyContent="space-between">
          <Text
            type="title"
            size="medium"
            appearance="dark"
            weight="bold"
          >
            Estado de la ejecución
          </Text>
          <MdClear size="24px" cursor="pointer" onClick={onCloseModal} />
        </Stack>
      </Stack>
      <Grid
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 1fr"
        gap={tokens.spacing.s100}
      >
        {labels.map((field, id) => {
          const value =
            dataInformationProcess[field.id as keyof StartProcesses];
          return value !== null &&
            value !== undefined &&
            (typeof value === "string" || typeof value === "number") ? (
            <StyledFields key={id} $smallScreen={false}>
              <Label
                htmlFor={field.id}
                size="large"
                margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
              >
                {field.titleName}
              </Label>
              <Fieldset
                legend=""
                spacing="compact"
                type="title"
                size="medium"
              >
                <Text type="body" size="medium">
                  {value}
                </Text>
              </Fieldset>
            </StyledFields>
          ) : null;
        })}
      </Grid>
      <Divider dashed />
      </>
    )
}

export {GeneralDataMobile}