import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "swiper/swiper.scss";
import Swiper from "react-id-swiper";
import Card from "../Card/Card";
import { deckitSelectors, userSelectors } from "store/selectors";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  display: block;
  height: 60px;
  transition: height 0.4s ease-in-out;
  /* margin-top: auto; */
  @media (min-width: 600px) {
    height: 400px;
  }
  &:hover {
    height: 400px;
  }
`;

const getState = (hinterId, stage, userId) => {
  if (stage === 2 && hinterId === userId) {
    return "hinter";
  }
  if (stage === 3 && hinterId !== userId) {
    return "picker";
  }
  return null;
};

const Hand = () => {
  const cards = useSelector(deckitSelectors.myCards);
  const hinter = useSelector(deckitSelectors.hinter);
  const stage = useSelector(deckitSelectors.gameStage);
  const user = useSelector(userSelectors.user); // select cards from user
  const params = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 6,
    coverflowEffect: {
      rotate: 10,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination"
    }
  };
  return (
    <StyledContainer>
      <div style={{ height: "100%" }}>
        <Swiper {...params} activeSlideKey={cards[2].id} shouldSwiperUpdate>
          {cards.map(card => {
            return (
              <div key={card.id}>
                <Card card={card} state={getState(hinter.id, stage, user.id)} />
              </div>
            );
          })}
        </Swiper>
      </div>
    </StyledContainer>
  );
};

export default Hand;
