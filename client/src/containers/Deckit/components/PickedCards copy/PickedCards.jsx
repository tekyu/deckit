import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import selectHinter from "../../../../store/deckit/selectors/selectHinter";
import selectUserId from "../../../../store/selectors/selectUserId";
import selectPickedCard from "../../../../store/deckit/selectors/selectPickedCard";
import "./node_modules/slick-carousel/slick/slick.css";
import "./node_modules/slick-carousel/slick/slick-theme.css";

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: auto;
`;

const settings = {
  infinite: true,
  centerMode: true,
  className: "center",
  centerPadding: "20px",
  slidesToShow: 3,
  slidesToScroll: 3,
  variableWidth: true,
  speed: 500,
  responsive: [
    {
      breakpoint: 1350, // width to change options
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    }
  ]
};

const getCardState = (cardId, hinter, pickedCard, userId) => {
  if (userId === hinter.id || cardId === pickedCard.id) {
    return null;
  }
  return "chooser";
};

const PickedCards = ({ cards = [] }) => {
  const hinter = useSelector(selectHinter);
  const userId = useSelector(selectUserId);
  const pickedCard = useSelector(selectPickedCard);
  return (
    <StyledContainer>
      <Slider {...settings}>
        {cards.map(({ card }) => {
          return (
            <>
              <Card
                card={card}
                key={card.id}
                state={getCardState(card.id, hinter, pickedCard, userId)}
              />
            </>
          );
        })}
      </Slider>
    </StyledContainer>
  );
};

export default PickedCards;
