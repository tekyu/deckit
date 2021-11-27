import { DarkModeToggle } from 'react-dark-mode-toggle-2';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, appSelectors } from 'store/app/appSlice';
import * as Styled from './ThemeChanger.styled';

const ThemeChanger = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(appSelectors.theme);
  const activeTheme = useSelector(appSelectors.activeTheme);
  const changeThemeHandler = () => {
    dispatch(appActions.setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Styled.ThemeChanger size={50}>
      <DarkModeToggle
        onChange={changeThemeHandler}
        isDarkMode={isDarkMode}
        size={50}
      />
    </Styled.ThemeChanger>
  );
};

export default ThemeChanger;
