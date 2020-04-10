import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "swiper/swiper.scss";
import Swiper from "react-id-swiper";
import Card from "../Card/Card";
import { deckitSelectors, userSelectors } from "store/selectors";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  transition: height 0.4s ease-in-out;
  margin-top: auto;
  overflow: hidden;
`;

const getCardState = (cardId, hinter, pickedCard, userId) => {
  if (userId === hinter.id || cardId === pickedCard.id) {
    return null;
  }
  return "chooser";
};

const PickedCards = ({ cards = [] }) => {
  const hinter = useSelector(deckitSelectors.hinter);
  const pickedCard = useSelector(deckitSelectors.pickedCard);
  const userId = useSelector(userSelectors.userId);

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

  return (
    <StyledContainer>
      <Swiper {...params}>
        {cards.map(({ card }) => {
          return (
            <div>
              <Card
                card={card}
                key={card.id}
                state={getCardState(card.id, hinter, pickedCard, userId)}
              />
            </div>
          );
        })}
      </Swiper>
    </StyledContainer>
  );
  // const settings = {
  //   infinite: false,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  //   variableWidth: true,
  //   speed: 500,
  //   responsive: [
  //     {
  //       breakpoint: 1350, // width to change options
  //       settings: {
  //         infinite: false,
  //         variableWidth: true,
  //         centerMode: true,
  //         className: "center",
  //         centerPadding: "0px",
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 1
  //       }
  //     }
  //   ]
  // };

  // const cards1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
  // return (
  //   <StyledContainer>
  //     <Slider {...settings}>
  //       {cards1.map(card => {
  //         return (
  //           <Card
  //             // card={card}
  //             key={card.id}
  //             // state={getCardState(card.id, hinter, pickedCard, userId)}
  //           />
  //         );
  //       })}
  //     </Slider>
  //   </StyledContainer>
  // );
};

export default PickedCards;
