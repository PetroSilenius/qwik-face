import { component$, useStore, $ } from '@builder.io/qwik';
import { User } from './index';
import './GamePage.css';

interface IState {
  generatorNumber: number;
  score: number;
}

export const shuffle = (array: User[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export enum KeyToIndex {
  'ArrowUp' = 0,
  'ArrowLeft' = 1,
  'ArrowRight' = 2,
  'ArrowDown' = 3,
}

export default component$(({ members }: { members: User[] }) => {
  const state = useStore<IState>({
    generatorNumber: Math.random(),
    score: 0,
  });

  const randomMembers = shuffle(members).slice(0, 4);
  const correctMember = randomMembers[Math.floor(state.generatorNumber * 4)];

  const onClick = $((event: { target: EventTarget }) => {
    const clickedButton = event.target as HTMLButtonElement;
    if (Number(clickedButton.value) === randomMembers.indexOf(correctMember)) {
      state.score++;
    }
    state.generatorNumber = Math.random();
  });

  const onKeyDown = $((event: { key: string }) => {
    const pressedKey = event.key as keyof typeof KeyToIndex;
    const index = KeyToIndex[pressedKey];

    if (typeof index !== 'number') {
      return;
    }

    if (index === randomMembers.indexOf(correctMember)) {
      state.score++;
    }
    state.generatorNumber = Math.random();
  });

  return (
    <div class="container">
      <img src={correctMember.profile.image_192} />
      <div className="options" document:onKeyDown$={onKeyDown}>
        {randomMembers.map((member, index) => (
          <button onClick$={onClick} value={index}>
            {member.real_name}
          </button>
        ))}
      </div>
      <p>{state.score}</p>
    </div>
  );
});
