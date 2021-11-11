import IErrorMessage from 'components/ErrorMessage/IErrorMessage';
import { ErrorMessage as FormikErrorMessage } from 'formik';
import * as Styled from './ErrorMessage.styled';

const ErrorMessage = ({
  name,
}: IErrorMessage): JSX.Element => (
  <FormikErrorMessage name={name}>
    {(msg) => <Styled.ErrorMessage>{msg}</Styled.ErrorMessage>}
  </FormikErrorMessage>
);

export default ErrorMessage;
