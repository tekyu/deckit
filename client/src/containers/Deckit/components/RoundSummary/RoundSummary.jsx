import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "swiper/swiper.scss";
import Swiper from "react-id-swiper";
import Card from "../Card/Card";
import selectHinter from "../../../../store/deckit/selectors/selectHinter";
import selectUserId from "../../../../store/selectors/selectUserId";
import selectPickedCard from "../../../../store/deckit/selectors/selectPickedCard";

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: auto;
  position: relative;
`;

const params = {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
};

const getCardState = (cardId, hinter, pickedCard, userId) => {
  if (userId === hinter.id || cardId === pickedCard.id) {
    return null;
  }
  return "chooser";
};

const RoundSummary = ({ cards = [], hintCard = {} }) => {
  return (
    <StyledContainer>
      <Swiper {...params}>
        {cards.map(({ card, owner, pickedBy }) => {
          return (
            <div>
              <Card
                card={card}
                owner={owner}
                pickedBy={pickedBy}
                key={owner.id}
              />
            </div>
          );
        })}
      </Swiper>
    </StyledContainer>
  );
};

export default RoundSummary;
