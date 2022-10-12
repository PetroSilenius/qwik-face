import type { RequestHandler } from '@builder.io/qwik-city';

const getAccessToken = (code: string) => {
  const url = 'https://slack.com/api/oauth.v2.access';

  const formData = new URLSearchParams();
  formData.append('code', code);
  formData.append('client_id', import.meta.env.VITE_SLACK_CLIENT_ID);
  formData.append('client_secret', import.meta.env.VITE_SLACK_CLIENT_SECRET);

  return fetch(url, {
    method: 'POST',
    body: formData,
  });
};

export const onGet: RequestHandler<any> = async ({ response, url }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    response.error(400);
    return;
  }

  const tokenResponse = await getAccessToken(code);

  const tokenJson = await tokenResponse.json();
  const accessToken = tokenJson.authed_user?.access_token;

  response.headers.set('Set-Cookie', `token=${accessToken}`);
  throw response.redirect('/game');
};
