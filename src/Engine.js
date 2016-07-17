import Level from './Level';

const MAX_TURNS = 1000;

export default function playLevel(levelConfig, warriorName, playerCode, maxTurns = MAX_TURNS) {
  const level = Level.load(levelConfig, warriorName);
  level.loadPlayer(playerCode);
  return level.play(maxTurns);
}
