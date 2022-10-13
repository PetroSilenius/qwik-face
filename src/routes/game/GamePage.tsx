import { component$, useStore } from '@builder.io/qwik';
import { User } from './index';

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

  return (
    <div>
      <img src={correctMember.profile.image_192} />
      {randomMembers.map((member) => (
        <button onClick$={(e) => {
          const clickedButton = (e.target as HTMLButtonElement);

          if (clickedButton.value === correctMember.id) {
            state.generatorNumber = Math.random();
            state.score ++;
          }
        }} value={member.id}>{member.real_name}</button>
      ))}
      <p>{state.score}</p>
    </div>
  );
});