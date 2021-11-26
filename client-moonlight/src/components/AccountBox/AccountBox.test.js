import {
  fireEvent, queryByRole, screen, wait, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountBox from 'components/AccountBox/AccountBox';
import { renderWithStore } from 'tests/utils';
import { makeStore } from 'store/store';
import { userActions } from 'store/user/userSlice';

describe('AccountBox', () => {
  test('component renders correctly', async () => {
    const store = await makeStore();
    renderWithStore(
      <AccountBox />,
      store,
    );
    const defaultChildren = screen.getByText('Your name is');

    expect(defaultChildren).toBeInTheDocument();
  });

  test('name is set to initial name from store', async () => {
    const store = await makeStore();

    const initialName = store.getState().user.username;
    renderWithStore(
      <AccountBox />,
      store,
    );

    const nameContainer = screen.getByTestId('accountbox-name-display');
    expect(nameContainer.textContent).toBe(initialName);
  });

  test('name is changed after dispatch', async () => {
    const store = await makeStore();

    const initialName = store.getState().user.username;
    store.dispatch(userActions.setName('test'));

    renderWithStore(
      <AccountBox />,
      store,
    );

    const nameContainer = screen.getByTestId('accountbox-name-display');
    expect(nameContainer.textContent).not.toBe(initialName);
  });

  // test('dropdown should be visible when clicked on accountbox', async () => {
  //   const store = await makeStore();

  //   const { getByTestId, findByTestId } = renderWithStore(
  //     <AccountBox />,
  //     store,
  //   );

  //   const accountBoxDisplay = getByTestId('accountbox');
  //   fireEvent.click(accountBoxDisplay);

  //   expect(accountBoxDisplay).not.toBe(null);

  //   const dropdown = await findByTestId('accountbox-dropdown');
  //   expect(dropdown).not.toBe(null);
  // });

  // test('dropdown should not be visible when clicked outside', async () => {
  //   const store = await makeStore();

  //   const { getByTestId, findByTestId } = renderWithStore(
  //     <AccountBox />,
  //     store,
  //   );

  //   const accountBoxDisplay = getByTestId('accountbox');
  //   fireEvent.click(accountBoxDisplay);

  //   fireEvent.click(document.body);

  //   const dropdown = await findByTestId('accountbox-dropdown');
  //   expect(dropdown).not.toBeInTheDocument();
  // });

  test('name changing input should be visible when clicked on trigger', async () => {
    const store = await makeStore();

    renderWithStore(
      <AccountBox />,
      store,
    );

    const accountBoxDisplay = screen.getByTestId('accountbox');
    fireEvent.click(accountBoxDisplay);

    expect(accountBoxDisplay).not.toBe(null);

    const dropdown = screen.getByTestId('accountbox-dropdown');
    expect(dropdown).not.toBe(null);

    const inputTrigger = screen.getByTestId('accountbox-show-input-trigger');
    expect(inputTrigger).not.toBe(null);
    expect(inputTrigger).toHaveTextContent('Choose your own name');
    fireEvent.click(inputTrigger);

    const form = await screen.queryByRole('form');
    expect(form).not.toBe(null);
  });

  test('name is longer than 25 characters', async () => {
    const store = makeStore();

    const mockName = 'qwertyuiopasdfghjklzxcvbnmqwerty';

    renderWithStore(
      <AccountBox />,
      store,
    );
    const item = screen.getByTestId('accountbox-show-input-trigger');
    fireEvent.click(item);
    const input = await screen.queryByTestId('accountbox-name-input');
    expect(input).not.toBe(null);
    fireEvent.change(input, { target: { value: mockName } });
    const submitButton = await screen.queryByTestId('accountbox-name-submit');
    fireEvent.click(submitButton);
    const errorMessage = await screen.queryByTestId('accountbox-name-error');
    expect(errorMessage).not.toBe(null);
  });
});
