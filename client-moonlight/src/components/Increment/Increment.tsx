import Icon from 'components/Icon/Icon';
import { IIncrement } from 'components/Increment/IIncrement';
import { useEffect, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useDebounce } from 'utils/hooks';
import * as Styled from './Increment.styled';

const Increment = ({
  value = 0,
  onChange,
  step = 1,
  iconSize = 24,
}: IIncrement): JSX.Element => {
  const [inputValue, setInputValue] = useState<number>(value);
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue) {
      onChange(+debouncedInputValue);
    }
  }, [debouncedInputValue]);

  const decreaseValue = () => {
    setInputValue(+inputValue - step);
  };

  const increaseValue = () => {
    setInputValue(+inputValue + step);
  };

  return (
    <Styled.Increment>
      <Icon onClick={decreaseValue}><BiMinus size={iconSize} /></Icon>
      <Styled.Display>{inputValue}</Styled.Display>
      <Icon onClick={increaseValue}><BiPlus size={iconSize} /></Icon>
    </Styled.Increment>
  );
};

export default Increment;
