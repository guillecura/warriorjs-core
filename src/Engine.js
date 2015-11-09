import 'babel/polyfill';
import Level from './Level';

const Engine = {
  playLevel(config, warrior) {
    const level = new Level();
    level.loadLevel(config, warrior);
    level.loadPlayer();
    return level.play();
  },
};

export default Engine;
