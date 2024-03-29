import { useState } from 'react';

import { useDetectClickOutside } from 'react-detect-click-outside';
import sillyname from 'sillyname';
import { BiChevronDown } from 'react-icons/bi';
import Button from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from 'store/user/userSlice';
import { Formik } from 'formik';
import TextInput from 'components/TextInput/TextInput';
import { CSSTransition } from 'react-transition-group';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useTranslation } from 'react-i18next';
import * as Styled from './AccountBox.styled';

interface IChangeNameForm {
  name: string;
}

const AccountBox = (): JSX.Element => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showDifferentNameInput, setShowDifferentNameInput] = useState<boolean>(false);
  const name = useSelector(userSelectors.name);
  const dispatch = useDispatch();

  const outsideClickHandler = () => {
    setShowDropdown(false);
    setShowDifferentNameInput(false);
  };
  const ref = useDetectClickOutside({ onTriggered: outsideClickHandler });

  const generateNameHandler = () => {
    dispatch(userActions.setName(sillyname()));
  };

  const setCustomName = ({ name }: IChangeNameForm) => {
    dispatch(userActions.setName(name));
  };

  const validateCustomName = ({ name }: IChangeNameForm) => {
    const errors: Partial<IChangeNameForm> = {};

    if (!name) {
      errors.name = t('errors.user.name.empty');
    }

    if (name.length > 24) {
      errors.name = t('errors.user.name.long');
    }

    return errors;
  };

  return (
    <Styled.AccountBox
      ref={ref}
      onClick={() => setShowDropdown(true)}
      data-testid="accountbox"
    >
      <Styled.Display>
        <Styled.Info>
          <Styled.Label>{t('accountBox.nameHeader')}</Styled.Label>
          <Styled.Name data-testid="accountbox-name-display">{name}</Styled.Name>
        </Styled.Info>
        <BiChevronDown />
      </Styled.Display>
      <CSSTransition in={showDropdown} timeout={300} classNames="accountBoxDropdown">
        <Styled.Dropdown
          data-testid="accountbox-dropdown"
        >
          <Styled.Item>
            <Button
              onClick={generateNameHandler}
              data-testid="accountbox-random-button"
            >
              {t('accountBox.randomName')}
            </Button>
          </Styled.Item>
          <Styled.Item
            data-testid="accountbox-show-input-trigger"
            onClick={() => setShowDifferentNameInput(true)}
          >
            {showDifferentNameInput ? (
              <>
                <Formik
                  data-testid="accountbox-name-form2"
                  initialValues={{ name: '' }}
                  onSubmit={setCustomName}
                  validate={validateCustomName}
                >
                  {({
                    values: {
                      name,
                    },
                    handleSubmit,
                  }) => (
                    <>
                      <Styled.NameChangeContainer role="form" onSubmit={handleSubmit}>
                        <TextInput
                          value={name}
                          name="name"
                          id="name"
                          placeholder={t('accountBox.chooseNamePlaceholder')}
                          data-testid="accountbox-name-input"
                        />
                        <Button
                          type="submit"
                          version="text"
                          data-testid="accountbox-name-submit"
                        >
                          {t('accountBox.chooseNameButton')}
                        </Button>
                      </Styled.NameChangeContainer>
                      <ErrorMessage name="name" data-testid="accountbox-name-error" />
                    </>
                  )}
                </Formik>
              </>
            ) : t('accountBox.chooseName')}
          </Styled.Item>
        </Styled.Dropdown>
      </CSSTransition>
    </Styled.AccountBox>
  );
};

export default AccountBox;
