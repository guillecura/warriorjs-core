import 'babel/polyfill';
import Level from './Level';

const MAX_TURNS = 1000;

export default {
  playLevel(config, profile, maxTurns = MAX_TURNS) {
    const level = new Level();
    level.loadLevel(config, profile);
    level.loadPlayer();
    return level.play(maxTurns);
  },
};
