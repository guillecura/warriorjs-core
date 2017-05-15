import loadTower from '../src/loadTower';

describe('loadTower', () => {
  let tower;

  beforeEach(() => {
    tower = {
      abilities: {
        blink: unit => ({
          type: 'action',
          description: 'Teleport yourself to the given space.',
          perform(space) {
            const [spaceX, spaceY] = space.getLocation();
            const forward = Math.abs(spaceX - unit.position.x);
            const right = Math.abs(spaceY - unit.position.y);
            const direction = unit.position.getRelativeDirectionOf(space);
            unit.position.move(direction, forward, right);
          },
        }),
        locateStairs: unit => ({
          type: 'sense',
          description: 'Return the space where the stairs are located.',
          perform() {
            return unit.position.floor.getStairsSpace();
          },
        }),
      },
      effects: {
        sleeping: () => ({
          description: 'You are unable to perform any action',
          passTurn() {},
        }),
      },
      units: {
        Warrior: {
          maxHealth: 1,
        },
        Dummy: {
          maxHealth: 999,
          playTurn() {},
        },
      },
      levels: [
        {
          floor: {
            size: {
              width: 3,
              height: 3,
            },
            stairs: {
              x: 2,
              y: 2,
            },
            units: [
              {
                type: 'Warrior',
                position: {
                  x: 0,
                  y: 0,
                  direction: 'north',
                },
                abilities: {
                  blink: {},
                  locateStairs: {},
                },
              },
              {
                type: 'Dummy',
                position: {
                  x: 1,
                  y: 1,
                  direction: 'north',
                },
                effects: {
                  sleeping: {},
                },
              },
            ],
          },
        },
      ],
    };
  });

  describe('loaded tower', () => {
    let loadedTower;

    beforeEach(() => {
      loadedTower = loadTower(tower);
    });

    it('should be able to run levels', () => {
      expect(loadedTower.runLevel).toBeDefined();
    });

    describe('running a level', () => {
      const levelNumber = 1;

      it('should throw an error with invalid ability', () => {
        tower.levels[levelNumber - 1].floor.units[0].abilities.foo = {};
        expect(() => {
          loadedTower.runLevel(levelNumber);
        }).toThrow("Unknown ability: 'foo'.");
      });

      it('should throw an error with invalid effect', () => {
        tower.levels[levelNumber - 1].floor.units[1].effects.foo = {};
        expect(() => {
          loadedTower.runLevel(levelNumber);
        }).toThrow("Unknown effect: 'foo'.");
      });

      it('should throw an error with invalid unit', () => {
        tower.levels[levelNumber - 1].floor.units.push({
          type: 'Foo',
        });
        expect(() => {
          loadedTower.runLevel(levelNumber);
        }).toThrow("Unknown unit type: 'Foo'.");
      });

      it('should throw an error when there is a syntax error in the player code', () => {
        const warriorName = 'Jack';
        const playerCode = `
          clas Player {
            playTurn(warrior) {}
          }
        `;
        expect(() => {
          loadedTower.runLevel(levelNumber, warriorName, playerCode);
        }).toThrow('Invalid player code. Check the syntax and try again.');
      });

      it('should throw an error when there is another error in the player code', () => {
        const warriorName = 'Jack';
        const playerCode = 'foo';
        expect(() => {
          loadedTower.runLevel(levelNumber, warriorName, playerCode);
        }).toThrow('Invalid player code: foo is not defined.');
      });

      it('should pass level with a winner player code', () => {
        const warriorName = 'Jack';
        const playerCode = `
          class Player {
            playTurn(warrior) {
              warrior.blink(warrior.locateStairs());
            }
          }
        `;
        const { passed } = loadedTower.runLevel(levelNumber, warriorName, playerCode);
        expect(passed).toBe(true);
      });

      it('should fail level with a loser player code', () => {
        const warriorName = 'Jack';
        const playerCode = `
          class Player {
            playTurn(warrior) {
              // Cool code goes here
            }
          }
        `;
        const { passed } = loadedTower.runLevel(levelNumber, warriorName, playerCode);
        expect(passed).toBe(false);
      });
    });
  });
});
