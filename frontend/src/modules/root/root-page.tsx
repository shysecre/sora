import React from "react";
import { useGetAuthLinkMutation } from "../../app/api/auth/auth-slice.api";

export const RootPage: React.FC = () => {
  const [getAuthLink, { isLoading }] = useGetAuthLinkMutation();

  const onLogIn = () => {
    getAuthLink(null)
      .unwrap()
      .then((response) => {
        localStorage.setItem("authState", response.state);
        window.location.replace(response.link);
      });
  };

  return (
    <div>
      <p>⛩️ Welcome to Sora service! ⛩️</p>
      <div>
        {isLoading && <div>🐋 Loading...</div>}
        <p>You need to log in using twitch</p>
        <button onClick={onLogIn}>log in with twitch</button>
      </div>
    </div>
  );
};
