import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from 'components/Button/Button';
import { renderWithTheme } from 'tests/utils';

describe('Button', () => {
  test('default children when no children is passed', () => {
    renderWithTheme(<Button />);
    const defaultChildren = screen.getByText('Default');

    expect(defaultChildren).toBeInTheDocument();
  });

  test('onClick is fired when is passed', () => {
    const mockFn = jest.fn(() => true);
    renderWithTheme(<Button onClick={mockFn} />);
    const defaultChildren = screen.getByText('Default');

    fireEvent.click(defaultChildren);

    expect(mockFn).toBeCalled();
  });
});
