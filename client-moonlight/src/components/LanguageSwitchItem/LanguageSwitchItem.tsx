import LanguageFlag from 'components/LanguageFlag/LanguageFlag';
import { ILanguageSwitchItem } from 'components/LanguageSwitchItem/ILanguageSwitchItem';
import { useTranslation } from 'react-i18next';
import * as Styled from './LanguageSwitchItem.styled';

const LanguageSwitchItem = ({
  language = 'en',
  changeLanguageHandler = () => { },
}: ILanguageSwitchItem): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Styled.LanguageSwitchItem
      onClick={() => changeLanguageHandler(language)}
    >
      <LanguageFlag language={language} />
      <Styled.Name>{t(`languages.${language}`)}</Styled.Name>

    </Styled.LanguageSwitchItem>
  );
};

export default LanguageSwitchItem;
