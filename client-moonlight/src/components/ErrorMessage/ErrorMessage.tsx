import IErrorMessage from 'components/ErrorMessage/IErrorMessage';
import { ErrorMessage as FormikErrorMessage } from 'formik';
import * as Styled from './ErrorMessage.styled';

const ErrorMessage = ({
  name,
  ...rest
}: IErrorMessage): JSX.Element => (
  <FormikErrorMessage name={name}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {(msg) => <Styled.ErrorMessage {...rest}>{msg}</Styled.ErrorMessage>}
  </FormikErrorMessage>
);

export default ErrorMessage;
