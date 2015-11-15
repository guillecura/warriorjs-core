import Senses from '../../constants/Senses';
import DirectionOf from './DirectionOf';
import DirectionOfStairs from './DirectionOfStairs';
import DistanceOf from './DistanceOf';
import Feel from './Feel';
import Health from './Health';
import Listen from './Listen';
import Look from './Look';

export default {
  [Senses.directionOf]: DirectionOf,
  [Senses.directionOfStairs]: DirectionOfStairs,
  [Senses.distanceOf]: DistanceOf,
  [Senses.feel]: Feel,
  [Senses.health]: Health,
  [Senses.listen]: Listen,
  [Senses.look]: Look,
}
