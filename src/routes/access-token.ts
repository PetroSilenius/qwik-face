import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler<any> = async ({ response, params }) => {
  const code = params.code;
  const getAccessToken = (code: string) => {
    const url = 'https://slack.com/api/oauth.v2.access';

    const formData = new FormData();
    formData.append('code', code);
    formData.append('client_id', '3336676.569200954261');
    formData.append('client_secret', '678387edca77ef38b18aef6a2962325a');

    return fetch(url, {
      method: 'POST',
      body: formData,
    });
  };

  const accessToken = await getAccessToken(code);
  response.headers.set('Set-Cookie', `token=${accessToken}`);
  response.redirect('/');
};
