import styled from 'styled-components';
import themes from 'assets/themes';

export const Container = styled.div`
  height: 280px;
  width: 230px;
  background: ${themes.default.background};
  box-shadow: 10px 5px 40px rgba(207, 119, 243, 0.1),
    0px 5px 40px rgba(0, 155, 255, 0.1), -10px 5px 40px rgba(42, 201, 219, 0.1);
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`;

export const Header = styled.div`
  height: 60px;
  width: 100%;
  position: relative;
`;

export const Logo = styled.div`
  width: 74px;
  height: 74px;
  position: absolute;
  bottom: -37px;
  left: 50%;
  transform: translateX(-50%);
  cursor: default;
  user-select: none;
  background: transparent;
  border: 3px solid
    rgba(
      ${themes.default.primary},
      ${themes.default.darkLow}
    );
  border-radius: 50%;
  span {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 34px;
    transform: translate(-50%, -50%);
    background: ${themes.default.primary};
    color: ${themes.default.white}
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
