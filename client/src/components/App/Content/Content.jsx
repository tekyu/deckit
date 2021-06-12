import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "store/user/userSelectors";
import Routes from "./Routes/Routes";
import * as Styled from "./Content.styled";

const Content = () => {
  const auth = useSelector(selectAuth);
  return (
    <Styled.Content>
      <Routes auth={auth} />
    </Styled.Content>
  );
};

export default Content;
