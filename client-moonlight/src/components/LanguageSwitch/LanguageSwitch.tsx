import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { appActions, appSelectors } from 'store/app/appSlice';
import LanguageSwitchItem from 'components/LanguageSwitchItem/LanguageSwitchItem';
import i18n from 'i18n';
import LanguageFlag from 'components/LanguageFlag/LanguageFlag';
import * as Styled from './LanguageSwitch.styled';
import 'flag-icons/css/flag-icons.min.css';

const LanguageSwitch = (): JSX.Element => {
  const dispatch = useDispatch();
  const [showDropdowm, setShowDropdown] = useState<boolean>(false);
  const language = useSelector(appSelectors.language);
  const outsideClickHandler = () => {
    setShowDropdown(false);
  };

  const languageList = ['en', 'pl', 'de'].filter((lang) => lang !== language);

  const ref = useDetectClickOutside({ onTriggered: outsideClickHandler });

  const changeLanguage = (lang: string) => {
    setShowDropdown(false);
    i18n.changeLanguage(lang);
    dispatch(appActions.setLanguage(lang));
  };

  return (
    <Styled.LanguageSwitch
      ref={ref}
      onClick={() => setShowDropdown(true)}
    >
      <Styled.Display>
        <LanguageFlag language={language} />
      </Styled.Display>
      <CSSTransition in={showDropdowm} timeout={300} classNames="languageSwitch">
        <Styled.Dropdown>
          {languageList.map((lang) => (
            <LanguageSwitchItem
              changeLanguageHandler={changeLanguage}
              language={lang}
            />
          ))}

        </Styled.Dropdown>
      </CSSTransition>
    </Styled.LanguageSwitch>
  );
};

export default LanguageSwitch;
