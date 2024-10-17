import React from "react";
import { MdSearch } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { tokens } from "@design/tokens";
import { Button } from "@inubekit/button";
import { Textfield } from "@inubekit/textfield";

import { RadioBusinessUnit } from "@components/feedback/RadioBusinessUnit";
import {
  StyledBusinessUnits,
  StyledBusinessUnitsList,
  StyledNoResults,
  StyledBusinessUnitsItem,
} from "./styles";
import { IBusinessUnit, IBusinessUnitstate } from "./types";

interface BusinessUnitsUIProps {
  businessUnits: IBusinessUnit[];
  search: string;
  businessUnit: IBusinessUnitstate;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBussinessUnitChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  filterBusinessUnits: (
    businessUnits: IBusinessUnit[],
    search: string
  ) => IBusinessUnit[];
  handleSubmit: () => void;
}

function NoResultsMessage({ search }: { search: string }) {
  return (
    <StyledNoResults>
      <Text size="medium">No se encontraron resultados para "{search}".</Text>
      <Text size="medium">
        Por favor, intenta modificando los parámetros de búsqueda.
      </Text>
    </StyledNoResults>
  );
}

function BusinessUnitsUI({
  businessUnits,
  search,
  businessUnit,
  handleSearchChange,
  filterBusinessUnits,
  handleBussinessUnitChange,
  handleSubmit,
}: BusinessUnitsUIProps) {
  const filteredBusinessUnits = filterBusinessUnits(businessUnits, search);

  return (
    <StyledBusinessUnits>
      <Text type="title" as="h2" textAlign="center">
        Unidades de Negocios
      </Text>
      <Text size="medium" textAlign="center">
        Seleccione la Unidad de Negocio
      </Text>
      <form>
        <Stack direction="column" alignItems="center">
          {businessUnits.length > 10 && (
            <Textfield
              placeholder="Buscar..."
              type="search"
              name="searchBusinessUnits"
              id="searchBusinessUnits"
              value={search}
              fullwidth={true}
              onChange={handleSearchChange}
              iconBefore={<MdSearch size={22} />}
            />
          )}
          {filteredBusinessUnits.length === 0 && (
            <NoResultsMessage search={search} />
          )}
          <StyledBusinessUnitsList $scroll={businessUnits.length > 5}>
            <Stack
              direction="column"
              padding={`${tokens.spacing.s0} ${tokens.spacing.s100}`}
              alignItems="center"
              gap={tokens.spacing.s100}
            >
              {filteredBusinessUnits.map((businessUnit) => (
                <StyledBusinessUnitsItem key={businessUnit.id}>
                  <RadioBusinessUnit
                    name="businessUnit"
                    label={businessUnit.name}
                    id={businessUnit.id}
                    value={businessUnit.name}
                    logo={businessUnit.logo}
                    handleChange={handleBussinessUnitChange}
                  />
                </StyledBusinessUnitsItem>
              ))}
            </Stack>
          </StyledBusinessUnitsList>
          <Button
            type="button"
            disabled={businessUnit.value}
            onClick={handleSubmit}
          >
            Continuar
          </Button>
        </Stack>
      </form>
    </StyledBusinessUnits>
  );
}

export { BusinessUnitsUI };
