import 'babel/polyfill';
import Level from './Level';

export default {
  playLevel(config, profile) {
    const level = new Level();
    level.loadLevel(config, profile);
    level.loadPlayer();
    return level.play();
  },
};
