import React, { useState, useCallback, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "store/actions";

const Logout = auth => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  if (!auth) {
    history.push("/");
  }
  const logoutUserHandler = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    logoutUserHandler();
    setRedirect(true);
  }, [logoutUserHandler]);

  return redirect ? <Redirect to="/" /> : <div>Logout</div>;
};

export default Logout;
