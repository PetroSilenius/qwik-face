import { component$, Resource, useResource$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

interface User {
  name: string;
  email: string;
}

export default component$(() => {
  const usersResource = useResource$<User[]>(() => getUsers());

  return (
    <div>
      <a href="https://slack.com/oauth/v2/authorize?user_scope=users:read&client_id=3435648499334.4209141463556">
        Go to Slack
      </a>
      <Resource
        value={usersResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(users) => (
          <ul>
            {users.map((user) => (
              <li>
                {user.name} - {user.email}
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

export async function getUsers(): Promise<User[]> {
  console.log('FETCH');
  const resp = await fetch('https://slack.com/api/users.list');
  console.log('FETCH resolved');
  const json = await resp.json();
  const users = json.members;

  return Array.isArray(users) ? users : Promise.reject(json);
}
