import { ILanguageFlag } from 'components/LanguageFlag/ILanguageFlag';
import * as Styled from './LanguageFlag.styled';

const LanguageFlag = ({
  language,
}: ILanguageFlag): JSX.Element => (
  <Styled.LanguageFlag>
    <Styled.Icon className={`fi fi-${language === 'en' ? 'gb' : language}`} />
  </Styled.LanguageFlag>
);

export default LanguageFlag;
