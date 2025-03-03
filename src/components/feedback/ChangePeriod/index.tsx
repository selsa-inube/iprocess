import { useEffect, useRef, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { useMediaQuery, Stack, Text, Icon } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { currentMonthLetters, currentYear } from "@utils/dates";
import { PeriodsOptionsList } from "@design/feedback/PeriodsOptionsList";
import { IOption } from "@design/feedback/PeriodsOptionsList/types";
import { IChangePeriodEntry } from "@pages/startProcess/types";
import { StyledOptionlist } from "./styles";

interface ChangePeriodProps {
  description: string;
  listOfPeriods?: IOption[];
  setSelectedPeriod: (show: IChangePeriodEntry) => void;
}

const ChangePeriod = (props: ChangePeriodProps) => {
  const { description, listOfPeriods, setSelectedPeriod } = props;

  const [showListPeriods, setShowListPeriods] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const optionsListRef = useRef<HTMLDivElement>(null);
  const smallScreen = useMediaQuery("(max-width: 690px)");

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsListRef.current &&
      !optionsListRef.current.contains(event.target as Node)
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
  const period = listOfPeriods?.find(
    (period) => period.label === periodCurrent
  )?.id;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Stack gap={tokens.spacing.s150} alignItems="center">
      <Text
        type="title"
        size={smallScreen ? "small" : "medium"}
        appearance="dark"
        weight="bold"
      >
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

      {showListPeriods && listOfPeriods && (
        <StyledOptionlist
          $numberOptions={listOfPeriods.length}
          ref={optionsListRef}
        >
          <PeriodsOptionsList
            options={listOfPeriods}
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
