import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 20px 5px 100px rgba(207, 119, 243, 0.1),
    0px 5px 100px rgba(0, 155, 255, 0.1),
    -20px 5px 100px rgba(42, 201, 219, 0.1);
  border-radius: 6px;
  padding: 5px 20px 30px 20px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  font-family: "Catamaran";
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 18px;
  min-height: 60px;
`;

export const Welcome = styled.h3`
  margin-bottom: 30px;
  font-size: 18px;
`;

export const Title = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const Mode = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const ShowIdContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;
