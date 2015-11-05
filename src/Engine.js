import 'babel/polyfill';
import { transform } from 'babel';
import Level from './Level';

function loadPlayer(playerCode) {
  eval(transform(playerCode, { stage: 0 }).code); // eslint-disable-line no-eval
}

const Engine = {
  playLevel(levelConfig, playerCode, warrior) {
    loadPlayer(playerCode);

    const level = new Level();

    level.loadLevel(levelConfig);
    level.setupWarrior(warrior.name, warrior.actions, warrior.senses);

    level.play();

    return {
      passed: level.passed(),
      points: {
        levelScore: level.getWarrior().getScore(),
        timeBonus: level.getTimeBonus(),
        clearBonus: level.getClearBonus(),
      },
    };
  },
};

export default Engine;
