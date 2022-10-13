import { component$, useStore, $ } from '@builder.io/qwik';
import { User } from './index';
import './GamePage.css';

interface IState {
  generatorNumber: number;
  score: number;
}

export const shuffle = (array: User[]) =>  {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


export default component$(({ members }: { members: User[] }) => {
  const state = useStore<IState>({
    generatorNumber: Math.random(),
    score: 0,
  });

  const randomMembers = shuffle(members).slice(0, 4);
  const correctMember = randomMembers[Math.floor(state.generatorNumber * 4)];

  const onClick = $((e) => {
    const clickedButton = (e.target as HTMLButtonElement);
    if (clickedButton.value === randomMembers.indexOf(correctMember)) {
      state.score ++;
    }
    state.generatorNumber = Math.random();
  })

  const onKeyDown = $((e) => {
    const index = e.keyCode - 37;

    if (index > 3) {
      return
    }

    if (index === randomMembers.indexOf(correctMember)) {
      state.score ++;
    }
    state.generatorNumber = Math.random();
  })

  return (
    <div class="container">
      <img src={correctMember.profile.image_192} />
      <div className="options" document:onKeyDown$={onKeyDown}>
      {randomMembers.map((member, index) => (
        <button onClick$={onClick} value={index}>{member.real_name}</button>
      ))}
      </div>
      <p>{state.score}</p>
    </div>
  );
});
