type FacebookAccessTokenResponse = {
  access_token: string;
  token_type: string;
};

export const getFacebookAccessToken = async () => {
  const url = `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&grant_type=client_credentials`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const json: FacebookAccessTokenResponse = await response.json();
    const { access_token: accessToken, token_type: tokenType } = json;
    return { accessToken, tokenType };
  } catch (error) {
    console.error("Failed to fetch Facebook access token:", error);
  }
};

export const fetchFacebookData = async (accessToken: string) => {
  return accessToken;
};
