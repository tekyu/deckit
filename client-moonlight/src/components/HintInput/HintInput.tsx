import Button from 'components/Button/Button';
import { IHintInput } from 'components/HintInput/IHintInput';
import Label from 'components/Label/Label';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { gameActions } from 'store/game/gameSlice';
import * as Styled from './HintInput.styled';

const HintInput = ({
  children = 'Default',
}: IHintInput): JSX.Element => {
  const dispatch = useDispatch();
  const validateHandler = ({ hint }: { hint: string }) => {
    const errors: { hint?: string } = {};
    if (!hint) {
      errors.hint = 'Hint cannot be empty';
    }
    return errors;
  };

  const submitHandler = ({ hint }: { hint: string }) => {
    dispatch(gameActions.setHintPickedByMe({ hint }));
  };

  return (
    <Styled.HintInput>

      <Formik
        validate={validateHandler}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          hint: '',
        }}
        onSubmit={submitHandler}
      >
        {({
          values: {
            hint,
          },
          handleSubmit,
        }) => (
          <Styled.HintForm onSubmit={handleSubmit}>
            <Styled.Label>Enter your hint here</Styled.Label>
            <TextInput name="hint" id="hint" value={hint} alignCenter showBorder />
            <Button type="submit">Submit hint</Button>
          </Styled.HintForm>
        )}
      </Formik>
    </Styled.HintInput>
  );
};

export default HintInput;
