import Attack from '../abilities/actions/Attack';
import Bind from '../abilities/actions/Bind';
import Detonate from '../abilities/actions/Detonate';
import Explode from '../abilities/actions/Explode';
import Pivot from '../abilities/actions/Pivot';
import Rescue from '../abilities/actions/Rescue';
import Rest from '../abilities/actions/Rest';
import Shoot from '../abilities/actions/Shoot';
import Walk from '../abilities/actions/Walk';
import DirectionOf from '../abilities/senses/DirectionOf';
import DirectionOfStairs from '../abilities/senses/DirectionOfStairs';
import DistanceOf from '../abilities/senses/DistanceOf';
import Feel from '../abilities/senses/Feel';
import Health from '../abilities/senses/Health';
import Listen from '../abilities/senses/Listen';
import Look from '../abilities/senses/Look';

export const ABILITIES = {
  attack: Attack,
  bind: Bind,
  detonate: Detonate,
  directionOf: DirectionOf,
  directionOfStairs: DirectionOfStairs,
  distanceOf: DistanceOf,
  explode: Explode,
  feel: Feel,
  health: Health,
  listen: Listen,
  look: Look,
  pivot: Pivot,
  rescue: Rescue,
  rest: Rest,
  shoot: Shoot,
  walk: Walk,
};
