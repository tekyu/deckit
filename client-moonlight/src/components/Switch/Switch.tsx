import Label from 'components/Label/Label';
import ISwitch from 'components/Switch/ISwitch';
import { useField } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSwitch from 'react-switch';
import { appSelectors } from 'store/app/appSlice';
import * as Styled from './Switch.styled';

const Switch = ({
  name,
  onChange = () => { },
  value,
  label,
}: ISwitch): JSX.Element => {
  const theme = useSelector(appSelectors.theme);
  const [, , { setValue }] = useField(name);
  const [innerValue, setInnerValue] = useState(value);
  const onChangeHandler = (checked: boolean) => {
    setValue(checked);
    onChange(checked);
    setInnerValue(checked);
  };
  return (
    <Styled.Switch>
      {label && <Label>{label}</Label>}
      <ReactSwitch
        checked={innerValue}
        onChange={onChangeHandler}
        activeBoxShadow={`0 0 2px ${theme.palette.primary.main}`}
      />
    </Styled.Switch>
  );
};

export default Switch;
