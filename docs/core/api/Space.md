# Space

A space is an object representing a square in the level.

Usually, spaces are returned from senses.

The methods in a space are useful to gather information about what is there.

## Space Methods

### <a id="isWall"></a>[`isWall()`](#isWall)

Determine if a wall is at that location. A wall is the edge of the level. You can't walk here.

#### Returns

*(Boolean)*: Return `true` if the space is a wall.

<hr>

### <a id="isEmpty"></a>[`isEmpty()`](#isEmpty)

If a space is empty, this means that nothing (except maybe stairs) is at this location.

#### Returns

*(Boolean)*: Return `true` if the space is empty.

<hr>

### <a id="isStairs"></a>[`isStairs()`](#isStairs)

Determine if stairs are at that location.

#### Returns

*(Boolean)*: Return `true` if the space has the level stairs.

<hr>

### <a id="isWarrior"></a>[`isWarrior()`](#isWarrior)

Determine if the Warrior is at that location.

#### Returns

*(Boolean)*: Return `true` if this space contains the Warrior.

<hr>

### <a id="isPlayer"></a>[`isPlayer()`](#isPlayer)

Determine if the Warrior is at that location. Alias of [`isWarrior()`](#isWarrior).

#### Returns

*(Boolean)*: Return `true` if this space contains the Warrior.

<hr>

### <a id="isEnemy"></a>[`isEnemy()`](#isEnemy)

Determine if an enemy unit is at this location.

#### Returns

*(Boolean)*: Return `true` if this space contains an enemy unit.

<hr>

### <a id="isBound"></a>[`isBound()`](#isBound)

Determine if a bound unit is at this location.

#### Returns

*(Boolean)*: Return `true` if this space contains a bound unit.

<hr>

### <a id="is"></a>[`is(effect)`](#is)

Determine if there is a unit at the space, and if that unit is affected by `effect`.

#### Arguments

1. `effect` (*String*): The name of the effect.

#### Returns

*(Boolean)*: Return `true` if this space contains a unit with `effect`.

<hr>
