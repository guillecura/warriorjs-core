# API Reference

This section documents the complete WarriorJS Core API.

### Top-Level Exports

* [loadTower(tower)](loadTower.md)

### Tower API

* [Tower](Tower.md)
  * [runLevel()](Tower.md#runLevel)

### Unit API

* [Unit](Unit.md)
  * [type](Unit.md#type)
  * [maxHealth](Unit.md#maxHealth)
  * [health](Unit.md#health)
  * [position](Unit.md#position)
  * [isAlive()](Unit.md#isAlive)
  * [isBound()](Unit.md#isBound)
  * [unbind()](Unit.md#unbind)
  * [bind()](Unit.md#bind)
  * [say(message)](Unit.md#say)
  * [earnPoints(points)](Unit.md#earnPoints)
  * [heal(amount)](Unit.md#heal)
  * [takeDamage(amount)](Unit.md#takeDamage)
  * [damage(receiver, amount)](Unit.md#damage)

### Position API

* [Position](Position.md)
  * [getRelativeSpace(relativeDirection, forward = 1, right = 0)](Position.md#getRelativeSpace)
  * [move(relativeDirection, forward = 1, right = 0)](Position.md#move)
  * [rotate(relativeDirection)](Position.md#rotate)
  * [getDistanceOf(space)](Position.md#getDistanceOf)
  * [getDistanceFromStairs()](Position.md#getDistanceFromStairs)
  * [getRelativeDirectionOf(space)](Position.md#getRelativeDirectionOf)
  * [getRelativeDirectionOfStairs()](Position.md#getRelativeDirectionOfStairs)

### Floor API

* [Floor](Floor.md)
  * [getStairsSpace()](Floor.md#getStairsSpace)
  * [getUnits()](Floor.md#getUnits)
  * [getOtherUnits()](Floor.md#getOtherUnits)

### Space API

* [Space](Space.md)
  * [isWall()](Space.md#isWall)
  * [isEmpty()](Space.md#isEmpty)
  * [isStairs()](Space.md#isStairs)
  * [isWarrior()](Space.md#isWarrior)
  * [isPlayer()](Space.md#isPlayer)
  * [isEnemy()](Space.md#isEnemy)
  * [isBound()](Space.md#isBound)
  * [is(effect)](Space.md#)
