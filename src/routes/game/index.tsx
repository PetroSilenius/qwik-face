import { component$, Resource } from '@builder.io/qwik';
import { DocumentHead, RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import GamePage from './GamePage';

export interface User {
  name: string;
  real_name: string;
  is_bot: boolean;
  id: string;
  profile: {
    always_active: boolean;
    is_custom_image: boolean;
    image_192: string;
  };
}

export const onGet: RequestHandler<User[]> = async ({ request, response }) => {
  const token = request.headers.get('cookie')?.split('token=')[1];

  if (!token) {
    throw response.redirect('/');
  }

  const resp = await fetch('https://slack.com/api/users.list', {
    headers: new Headers({ Authorization: `Bearer ${token}` }),
  });
  const json = await resp.json();

  const members: User[] = json.members;
  const filteredMembers = members
    .filter((member) => !member.is_bot)
    .filter((member) => !member.profile.always_active)
    .filter((member) => member.profile.is_custom_image);

  return filteredMembers;
};

export default component$(() => {
  const membersData = useEndpoint<User[]>();

  return (
    <div>
      <Resource
        value={membersData}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(members) => (
          <div>
            <GamePage members={members} />
          </div>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
