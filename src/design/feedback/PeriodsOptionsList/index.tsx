import { OptionItem } from "./OptionItem";
import { StyledContainer } from "./styles";
import { IOption } from "./types";

interface PeriodsOptionsListProps {
  options: IOption[];
  selectedOption: string;
  onClick: (e: PointerEvent) => void;
  handleOptionClick: (option: IOption) => void;
}

const PeriodsOptionsList = (props: PeriodsOptionsListProps) => {
  const { options, selectedOption, handleOptionClick, onClick } = props;

  const interceptOnClick = (e: PointerEvent) => {
    e.stopPropagation();
    onClick(e);
  };
  return (
    <StyledContainer $onClick={interceptOnClick}>
      {options.map((optionItem: IOption) => (
        <OptionItem
          key={optionItem.id}
          id={optionItem.id}
          label={optionItem.label}
          selectedId={selectedOption}
          onClick={() => handleOptionClick(optionItem)}
        />
      ))}
    </StyledContainer>
  );
};

export { PeriodsOptionsList };
export type { PeriodsOptionsListProps };
