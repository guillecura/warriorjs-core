import Abilities from '../constants/Abilities';
import Attack from './actions/Attack';
import Bind from './actions/Bind';
import Detonate from './actions/Detonate';
import Explode from './actions/Explode';
import Pivot from './actions/Pivot';
import Rescue from './actions/Rescue';
import Rest from './actions/Rest';
import Shoot from './actions/Shoot';
import Walk from './actions/Walk';
import DirectionOf from './senses/DirectionOf';
import DirectionOfStairs from './senses/DirectionOfStairs';
import DistanceOf from './senses/DistanceOf';
import Feel from './senses/Feel';
import Health from './senses/Health';
import Listen from './senses/Listen';
import Look from './senses/Look';

export default {
  [Abilities.attack]: Attack,
  [Abilities.bind]: Bind,
  [Abilities.detonate]: Detonate,
  [Abilities.directionOf]: DirectionOf,
  [Abilities.directionOfStairs]: DirectionOfStairs,
  [Abilities.distanceOf]: DistanceOf,
  [Abilities.explode]: Explode,
  [Abilities.feel]: Feel,
  [Abilities.health]: Health,
  [Abilities.listen]: Listen,
  [Abilities.look]: Look,
  [Abilities.pivot]: Pivot,
  [Abilities.rescue]: Rescue,
  [Abilities.rest]: Rest,
  [Abilities.shoot]: Shoot,
  [Abilities.walk]: Walk,
};
