import { Event } from '../base';
import { getRandomNumber } from '../../functions';

export default new Event({
  name: 'voiceStateUpdate',
  run(oldState, newState) {
    if (newState.channel) {
      if (newState.member?.user.id === process.env.USER_ID) {
        const tryDisconnect = setInterval(() => {
          if (!newState.channel) {
            console.log('O usuário se desconectou, parando a execução.');
            clearInterval(tryDisconnect);
            return;
          }
          const generatedNumber = getRandomNumber(1, 100);
          const guess = getRandomNumber(1, 100);
          console.log(generatedNumber, guess);
          if (generatedNumber === guess) {
            newState.disconnect();
            clearInterval(tryDisconnect);
          }
        }, 5000);
      }
    } else if (oldState.channel) {}
  },
});
