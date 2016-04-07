import Level from './Level';

const MAX_TURNS = 1000;

export function playLevel(levelConfig, profile, maxTurns = MAX_TURNS) {
  const level = new Level();
  level.loadLevel(levelConfig, profile);
  level.loadPlayer();
  return level.play(maxTurns);
}
