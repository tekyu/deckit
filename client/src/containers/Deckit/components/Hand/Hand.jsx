import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../Card/Card";
import selectUser from "../../../../store/selectors/selectUser";
import selectMyCards from "../../../../store/deckit/selectors/selectMyCards";
import selectGameStage from "../../../../store/deckit/selectors/selectGameStage";
import selectHinter from "../../../../store/deckit/selectors/selectHinter";

const StyledContainer = styled.div`
  width: 90%;
  background: blue;
  /* bottom: 0;
  position: absolute;
  width: 100%;
  background: cornflowerblue;
  height: 120px;
  transition: height 0.4s ease-in-out;
  display: flex;
  flex-wrap: wrap;
  &:hover {
    height: 80%;
  } */
`;

const StyledCardContainer = styled.div`
  width: 100%;
  background: green;
  display: block;
`;

const getCards = (cards, state) => {
  console.log("getCards", cards, state);
  return cards.map(card => {
    return <Card card={card} key={card.id} state={state} />;
  });
};

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
  const cards = useSelector(selectMyCards);
  const hinter = useSelector(selectHinter);
  const stage = useSelector(selectGameStage);
  const user = useSelector(selectUser); // select cards from user
  const state = getState(hinter.id, stage, user.id);
  const cards1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <StyledContainer>
      <h2>Center Mode</h2>
      <Slider
        settings={{
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 3,
          speed: 500,
          responsive: [
            {
              breakpoint: 1024, // width to change options
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
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
        }}
      >
        {cards1.map(card => {
          console.log("CARD IN CAROUSEL", card);
          return (
            <Card
              card={card}
              key={card.id}
              onLoad={() => window.dispatchEvent(new Event("resize"))}
            />
          );
        })}
      </Slider>
    </StyledContainer>
  );
};

export default Hand;
