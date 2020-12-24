import React, { FC } from 'react';
import {
  AddSVGIcon,
  Button,
  ListboxOption,
  Select,
  TextIconSpacing,
} from 'react-md';

import classes from './SelectRepeater.module.scss';

interface Props {
  placeholder: ListboxOption;
  options: { [key: string]: ListboxOption };
  selections: string[];
  onChange: (selections: string[]) => void;
}

const SelectRepeater: FC<Props> = ({
  placeholder,
  options,
  selections,
  onChange,
}) => {
  const getOptions = (selection: string) => {
    const unselectedOptionKeys = Object.keys(options).filter(
      (optionKey) => !selections.includes(optionKey),
    );

    const optionsStart =
      selection === 'placeholder'
        ? [placeholder]
        : [placeholder, options[selection]];

    return [
      ...optionsStart,
      ...unselectedOptionKeys.map((optionKey) => options[optionKey]),
    ];
  };

  const handleSelection = (newSelection: string, index: number) => {
    let temp = selections;
    temp[index] = newSelection;

    onChange(temp);
  };

  const handleAdd = () => {
    onChange([...selections, 'placeholder']);
  };

  return (
    <div>
      <div className={classes.selectGroupContainer}>
        {selections.map((selection, index) => (
          <Select
            id={`stat-select-${selection}-${index}`}
            className={classes.select}
            key={`${selection}-${index}`}
            value={selection}
            options={getOptions(selection)}
            labelKey='name'
            onChange={(value) => handleSelection(value, index)}
          />
        ))}
      </div>
      <div>
        <Button
          onClick={handleAdd}
          id='add-stat'
          theme='primary'
          themeType='contained'
          disabled={selections.some((selection) => selection === 'placeholder')}
        >
          <TextIconSpacing icon={<AddSVGIcon />}>Add Stat</TextIconSpacing>
        </Button>
      </div>
    </div>
  );
};

export default SelectRepeater;
