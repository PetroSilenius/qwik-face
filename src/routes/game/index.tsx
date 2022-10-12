import { component$, Resource } from '@builder.io/qwik';
import { DocumentHead, RequestHandler, useEndpoint } from '@builder.io/qwik-city';

interface User {
  name: string;
  email: string;
}

export const onGet: RequestHandler<User[]> = async ({ request }) => {
  const token = request.headers.get('cookie')?.split('token=')[1];

  const resp = await fetch('https://slack.com/api/users.list', {
    headers: new Headers({ Authorization: `Bearer ${token}` }),
  });
  const json = await resp.json();

  const members: User[] = json.members;
  return members;
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
          <ul>
            {members?.map((member) => (
              <li>
                {member.name} - {member.email}
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
