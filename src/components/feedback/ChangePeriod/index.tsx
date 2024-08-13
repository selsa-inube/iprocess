import { useEffect, useRef, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";

import { tokens } from "@src/design/tokens";
import  {currentMonthLetters,
currentYear,
} from "@utils/dates";
import { getDomainById } from "@src/mocks/domains/domainService.mocks";
import { PeriodsOptionsList } from "@src/design/feedback/PeriodsOptionsList";
import { IOption } from "@src/design/feedback/PeriodsOptionsList/types";

import { StyledOptionlist } from "./styles";
import { IChangePeriodEntry } from "@src/pages/startProcess/types";

interface ChangePeriodProps {
  description: string;
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
}

const ChangePeriod = (props: ChangePeriodProps) => {
  const { description, setSelectedPeriod } = props;

  const [showListPeriods, setShowListPeriods] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const optionsListRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsListRef.current &&
      !optionsListRef.current.contains(event.target as Node) &&
      event.target !== optionsListRef.current
    ) {
      setShowListPeriods(false);
    }
  };

  const handleOptionClick = (option: IOption) => {
    const changePeriod = option?.label.split(" ");
    setSelectedOption(option.id);
    setShowListPeriods(false);
    setSelectedPeriod({
      month: changePeriod[0],
      year: changePeriod[1],
      change: true,
    });
  };

  const periodCurrent = currentMonthLetters + " " + currentYear;
  const period = getDomainById("periods").find( (period) => period.label === periodCurrent)?.id;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Stack gap={tokens.spacing.s150} alignItems="center">
      <Text type="title" size="medium" appearance="dark" weight="bold">
        {description}
      </Text>

      <Icon
        appearance="dark"
        icon={<MdExpandMore />}
        cursorHover
        spacing="narrow"
        variant="empty"
        size="24px"
        onClick={() => setShowListPeriods(true)}
      />

      {showListPeriods && (
        <StyledOptionlist
          $numberOptions={getDomainById("periods").length}
          $ref={optionsListRef}
        >
          <PeriodsOptionsList
            options={getDomainById("periods")}
            selectedOption={selectedOption || period!}
            onClick={(e: PointerEvent) => e.stopPropagation()}
            handleOptionClick={handleOptionClick}
          />
        </StyledOptionlist>
      )}
    </Stack>
  );
};

export { ChangePeriod };
