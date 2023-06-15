import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks/store-hooks";
import { selectUser, setUser } from "../../app/store/features/user/user-slice";
import {
  useGetUserCustomRewardsMutation,
  useGetUserMutation,
} from "../../app/api/user/user-slice-api";
import { useOnMount } from "../../common/hooks/useOnMount.hook";

export const ProfilePage: React.FC = () => {
  const [getUserMutation, { isLoading: loadingUser }] = useGetUserMutation();
  const [getUserCustomRewardsMutation, { data, isLoading }] = useGetUserCustomRewardsMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const fetchUser = () => {
    getUserMutation(null)
      .unwrap()
      .then((response) => dispatch(setUser(response)));
  };

  const refetchUser = () => {
    getUserMutation(null)
      .unwrap()
      .then((response) => dispatch(setUser(response)));
  };

  const fetchCustomRewards = () => getUserCustomRewardsMutation(null).unwrap();

  useOnMount(fetchUser);

  return loadingUser ? (
    <div>Loading your profile...</div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1>Profile page</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img src={user.twitchImage} alt="profile_pic" width={128} height={128} />
        <div style={{ textAlign: "center" }}>
          <p>Twitch ID: {user.twitchId}</p>
          <p>Twitch Name: {user.twitchName}</p>
          <p>UUID: {user.id}</p>
        </div>
        <button onClick={refetchUser} disabled={isLoading}>
          Re-fetch user
        </button>
        <button onClick={fetchCustomRewards}>Fetch custom rewards</button>
        {isLoading ? (
          <div>Loading custom rewards...</div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "25px",
            }}
          >
            {data ? (
              [...data.data]
                .sort((a, b) => a.cost - b.cost)
                .map((el) => (
                  <div key={el.id}>
                    <img src={el.image?.url_1x ?? el.default_image.url_1x} alt="wtf" />
                    <p>
                      {el.title} - {el.cost}
                    </p>
                  </div>
                ))
            ) : (
              <div>No custom rewards was loaded...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
