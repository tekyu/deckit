import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userActions } from "store/actions";
import { userSelectors } from "store/selectors";

const Profile = (auth) => {
  const profileData = useSelector(userSelectors.user);
  const [username, setUsername] = useState(``);
  const [ranking, setRanking] = useState(0);
  const [friends, setFriends] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [createdAt, setCreatedAt] = useState(``);
  const dispatch = useDispatch();
  const history = useHistory();
  if (!auth) {
    history.push(`/`);
  }

  const sendUpdatedUserHandler = useCallback(() => {
    const data = { ranking: 1300 };
    dispatch(userActions.updateUser(data));
  }, [dispatch]);

  useEffect(() => {
    setUsername(profileData ? profileData.username : username);
    setRanking(profileData ? profileData.ranking : ranking);
    setFriends(profileData ? profileData.friends : friends);
    setAchievements(profileData ? profileData.achievements : achievements);
    setCreatedAt(profileData ? profileData.createdAt : createdAt);
  }, [achievements, createdAt, friends, profileData, ranking, username]);

  return (
    <div>
      <div>
        Username:
        {` `}
        {username}
      </div>
      <div>
        Ranking:
        {` `}
        {ranking}
      </div>
      <div>
        Friends:
        {` `}
        {friends.map(({
          nickname, id, status, ranking, avatar,
        }) => (
          <li key={id}>
            {nickname}
            {` `}
            {id}
            {` `}
            {status}
            {` `}
            {ranking}
            {` `}
            {avatar}
          </li>
        ))}
      </div>
      <div>
        Achievements:
        {` `}
        {achievements}
      </div>
      <div>
        Created:
        {` `}
        {new Date(createdAt).toLocaleDateString(`en-GB`, {
          year: `numeric`,
          month: `long`,
          day: `numeric`,
        })}
      </div>
      <button type="button" onClick={sendUpdatedUserHandler}>Change</button>
    </div>
  );
};

export default Profile;
