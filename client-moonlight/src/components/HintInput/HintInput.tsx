import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { gameActions } from 'store/game/gameSlice';
import * as Styled from './HintInput.styled';

const HintInput = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const validateHandler = ({ hint }: { hint: string }) => {
    const errors: { hint?: string } = {};
    if (!hint) {
      errors.hint = t('game.choosingHint.notEmpty');
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
            <Styled.Label>{t('game.choosingHint.header')}</Styled.Label>
            <TextInput name="hint" id="hint" value={hint} alignCenter showBorder />
            <Button type="submit">{t('game.choosingHint.button')}</Button>
          </Styled.HintForm>
        )}
      </Formik>
    </Styled.HintInput>
  );
};

export default HintInput;
