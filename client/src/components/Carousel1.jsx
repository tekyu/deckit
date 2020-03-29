import React from "react";
import Slider from "react-slick";
import Card from "../containers/Deckit/components/Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const StyledDiv = styled.div`
  width: 300px;
  height: 600px;
`;

const StyledH2 = styled.h2`
  background: red;
  margin: 10px;
`;

const StyledContainer = styled.div`
  width: 90%;
  background: blue;
`;

const StyledCard = styled(Card)`
  margin: 10px;
`;

const cards = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export default function Carousel1() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <StyledContainer>
      <h2>Center Mode</h2>
      <Slider {...settings}>
        {cards.map(card => {
          console.log("CARD IN CAROUSEL", card);
          return <Card card={card} key={card.id} />;
        })}
      </Slider>
    </StyledContainer>
  );
}
