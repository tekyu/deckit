import styled from 'styled-components';
import { linearGradient } from 'polished';
import { Button } from 'components/Generic';

export const Backdrop = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

export const Container = styled.div`
  background: #ffffff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 500px;
  padding: 32px 64px;
`;

export const Body = styled.div`
  box-shadow: -5px 5px 100px rgba(207, 119, 243, 0.3),
    0px 5px 100px rgba(0, 155, 255, 0.3),
    -15px 5px 100px rgba(42, 201, 219, 0.3);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ExitButton = styled(Button)`
  align-self: flex-end;
  border-radius: 0 3px 0 0;
  height: 40px;
  width: 40px;
  padding: 0;
  margin: 0;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  h2 {
    font-size: 30px;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: rgba("black", 0.54);
  }
`;

export const Icon = styled.i`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px 0px rgba("sandstone", 0.24);
  margin-bottom: 10px;
  background: ${linearGradient({
    colorStops: ['#f4cc70 0%', '#de7a22 100%'],
    toDirection: 'to bottom left',
  })};
`;
