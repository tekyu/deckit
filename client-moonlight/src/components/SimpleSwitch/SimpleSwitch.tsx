import Label from 'components/Label/Label';
import ISimpleSwitch from 'components/SimpleSwitch/ISimpleSwitch';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSwitch from 'react-switch';
import { appSelectors } from 'store/app/appSlice';
import * as Styled from './SimpleSwitch.styled';

const SimpleSwitch = ({
  onChange = () => { },
  value,
}: ISimpleSwitch): JSX.Element => {
  const theme = useSelector(appSelectors.theme);
  const [innerValue, setInnerValue] = useState(value);
  const onChangeHandler = (checked: boolean) => {
    onChange(checked);
    setInnerValue(checked);
  };
  return (
    <Styled.SimpleSwitch>
      <ReactSwitch
        checked={innerValue}
        onChange={onChangeHandler}
        activeBoxShadow={`0 0 2px ${theme.palette.primary.main}`}
      />
    </Styled.SimpleSwitch>
  );
};

export default SimpleSwitch;
