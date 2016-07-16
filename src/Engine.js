import Level from './Level';

const MAX_TURNS = 1000;

export default function playLevel(levelConfig, playerCode, maxTurns = MAX_TURNS) {
  const level = Level.load(levelConfig);

  level.loadPlayer(playerCode);
  const { events, passed, score } = level.play(maxTurns);

  return {
    floor: level.floor.toViewObject(),
    events,
    passed,
    score,
  };
}
