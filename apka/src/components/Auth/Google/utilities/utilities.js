import axios from "axios";
import { useEffect, useRef } from "react";

export async function getGoogleDriveFiles(access_token) {
  const { data } = await axios({
    url: `https://www.googleapis.com/oauth2/v2/userinfo`,
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}

export async function getAccessTokenFromCode(code) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/auth/google",
      grant_type: "authorization_code",
      code,
    },
  });

  return {
    token: data.access_token,
    expires: data.expires_in,
    refresh: data.refresh_token,
  };
}

// Hooks

export const useTraceUpdate = (props) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
};
