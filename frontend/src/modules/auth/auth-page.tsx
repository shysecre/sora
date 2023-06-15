import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOnMount } from "../../common/hooks/useOnMount.hook";
import { useAuthUserWithCodeMutation } from "../../app/api/auth/auth-slice.api";

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [authUserWithCode, { isLoading }] = useAuthUserWithCodeMutation();
  const navigate = useNavigate();

  const authUser = () => {
    const [foundCode, foundState] = [searchParams.get("code"), searchParams.get("state")];

    const authState = localStorage.getItem("authState");

    if (!foundCode || !foundState || foundState !== authState) {
      return navigate("/", { replace: true });
    }

    localStorage.removeItem("authState");

    authUserWithCode({ code: foundCode })
      .unwrap()
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        navigate("/profile", { replace: true });
      });
  };

  useOnMount(authUser);

  return (
    <div>
      <h1>Auth Page</h1>
      {isLoading && <p>Waiting for server to process your authorization...</p>}
    </div>
  );
};
