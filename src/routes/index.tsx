import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <a href="https://slack.com/oauth/v2/authorize?user_scope=users:read&client_id=3435648499334.4209141463556">
        Go to Slack
      </a>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
