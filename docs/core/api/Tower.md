# Tower

## Tower Methods

### <a id="runLevel"></a>[`runLevel(levelNumber, warriorName, playerCode)`](#runLevel)

Run a level with a player's code.

#### Arguments

1. `levelNumber` (*Number*): The number of the level to run.
2. `warriorName` (*String*): The name of the warrior.
3. `playerCode` (*String*): The code written by the player. It should define a `Player` class with a `playTurn(warrior)` method.

#### Returns

(*Object*) An object containing the result of running the level, with the following members:
* `events` (*Array*): The sequence of events that took place when running the level.
* `passed` (*Boolean*): Whether the level was passed or not.
* `score` (*Object*): The resulting score, with the following members:
  * `clearBonus` (*Number*): A bonus for defeating all enemies and rescuing all captives.
  * `warrior` (*Number*): The points earned by the warrior by killing units and rescuing captives.
  * `timeBonus` (*Number*): A bonus for completing the level in less than a specified amount of turns.
