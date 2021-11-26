import { useEffect, useState } from 'react';

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
import * as Styled from './AccountBox.styled';

interface IChangeNameForm {
  name: string;
}

const AccountBox = (): JSX.Element => {
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
      errors.name = 'Name cannot be empty';
    }

    if (name.length > 24) {
      errors.name = 'Name cannot be longer than 25 characters';
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
          <Styled.Label>Your name is</Styled.Label>
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
              Give me random name

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
                          placeholder="Type new name here"
                          data-testid="accountbox-name-input"
                        />
                        <Button
                          type="submit"
                          version="text"
                          data-testid="accountbox-name-submit"
                        >
                          Change

                        </Button>
                      </Styled.NameChangeContainer>
                      <ErrorMessage name="name" data-testid="accountbox-name-error" />
                    </>
                  )}
                </Formik>
              </>
            ) : 'Choose your own name'}
          </Styled.Item>
        </Styled.Dropdown>
      </CSSTransition>
    </Styled.AccountBox>
  );
};

export default AccountBox;
