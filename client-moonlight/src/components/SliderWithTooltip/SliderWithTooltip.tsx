import ISliderWithTooltip from 'components/SliderWithTooltip/ISliderWithTooltip';
import SliderComponent from 'rc-slider';
import Label from 'components/Label/Label';
import { useField } from 'formik';
import 'rc-slider/assets/index.css';
import { useSelector } from 'react-redux';
import { appSelectors } from 'store/app/appSlice';
import * as Styled from './SliderWithTooltip.styled';

const { createSliderWithTooltip } = SliderComponent;
const Slider = createSliderWithTooltip(SliderComponent);

const SliderWithTooltip = ({
  name,
  palette = 'primary',
  onChange = () => { },
  label,
  height = 16,
  sliderProps = {
    min: 10,
    max: 120,
    defaultValue: 40,
    step: 5,
  },
}: ISliderWithTooltip): JSX.Element => {
  const theme = useSelector(appSelectors.theme);

  const [, , { setValue }] = useField(name);

  const onChangeHandler = (value: number) => {
    setValue(value);
    onChange(value);
  };

  return (
    <Styled.SliderWithTooltip palette={palette}>
      {label && <Label>{label}</Label>}
      <Slider
        onChange={onChangeHandler}
        {...sliderProps}
        trackStyle={{
          background: `${theme.palette[palette].main}`,
          height,
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
        }}
        railStyle={{ height }}
        handleStyle={{
          borderColor: `${theme.palette[palette].dark}`,
          height,
          width: height,
          marginTop: 0,
        }}
        tipProps={{
          visible: true,
        }}
      />
    </Styled.SliderWithTooltip>
  );
};

export default SliderWithTooltip;
