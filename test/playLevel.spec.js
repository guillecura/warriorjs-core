import playLevel from '../src/playLevel';

describe('play level', () => {
  it('should throw an error when no warrior', () => {
    const levelConfig = {
      timeBonus: 15,
      floor: {
        size: {
          width: 8,
          height: 1,
        },
        stairs: {
          x: 7,
          y: 0,
        },
        units: [],
      },
    };
    expect(() => {
      playLevel(levelConfig);
    }).toThrow('One unit in the level must be a warrior.');
  });

  it('should throw an error when more than one warrior', () => {
    const levelConfig = {
      timeBonus: 15,
      floor: {
        size: {
          width: 8,
          height: 1,
        },
        stairs: {
          x: 7,
          y: 0,
        },
        units: [
          {
            type: 'warrior',
            position: {
              x: 0,
              y: 0,
              direction: 'east',
            },
            abilities: [
              {
                name: 'walk',
                args: [],
              },
            ],
          },
          {
            type: 'warrior',
            position: {
              x: 0,
              y: 1,
              direction: 'east',
            },
            abilities: [
              {
                name: 'walk',
                args: [],
              },
            ],
          },
        ],
      },
    };
    expect(() => {
      playLevel(levelConfig);
    }).toThrow('One unit in the level must be a warrior.');
  });

  it('should throw an error with invalid unit', () => {
    const levelConfig = {
      timeBonus: 15,
      floor: {
        size: {
          width: 8,
          height: 1,
        },
        stairs: {
          x: 7,
          y: 0,
        },
        units: [
          {
            type: 'warrior',
            position: {
              x: 0,
              y: 0,
              direction: 'east',
            },
            abilities: [
              {
                name: 'walk',
                args: [],
              },
            ],
          },
          {
            type: 'foo',
            position: {
              x: 0,
              y: 1,
              direction: 'west',
            },
          },
        ],
      },
    };
    expect(() => {
      playLevel(levelConfig);
    }).toThrow("Unknown unit 'foo'.");
  });

  it('should throw an error with invalid ability', () => {
    const levelConfig = {
      timeBonus: 15,
      floor: {
        size: {
          width: 8,
          height: 1,
        },
        stairs: {
          x: 7,
          y: 0,
        },
        units: [
          {
            type: 'warrior',
            position: {
              x: 0,
              y: 0,
              direction: 'east',
            },
            abilities: [
              {
                name: 'foo',
                args: [],
              },
            ],
          },
        ],
      },
    };
    expect(() => {
      playLevel(levelConfig);
    }).toThrow("Unknown ability 'foo'.");
  });

  it('should throw an error with invalid effect', () => {
    const levelConfig = {
      timeBonus: 15,
      floor: {
        size: {
          width: 8,
          height: 1,
        },
        stairs: {
          x: 7,
          y: 0,
        },
        units: [
          {
            type: 'warrior',
            position: {
              x: 0,
              y: 0,
              direction: 'east',
            },
            effects: [
              {
                name: 'foo',
                args: [],
              },
            ],
          },
        ],
      },
    };
    expect(() => {
      playLevel(levelConfig);
    }).toThrow("Unknown effect 'foo'.");
  });

  describe('with a valid level config', () => {
    const levelConfig = {
      timeBonus: 15,
      floor: {
        size: {
          width: 8,
          height: 1,
        },
        stairs: {
          x: 7,
          y: 0,
        },
        units: [
          {
            type: 'warrior',
            position: {
              x: 0,
              y: 0,
              direction: 'east',
            },
            abilities: [
              {
                name: 'walk',
                args: [],
              },
            ],
          },
        ],
      },
    };
    const warriorName = 'Spartacus';

    describe('with a winner player code', () => {
      const playerCode = `
        class Player {
          playTurn(warrior) {
            warrior.walk();
          }
        }
      `;
      const requiredTurns = 7;

      it('should pass level when max turns are enough', () => {
        const maxTurns = requiredTurns;
        const { passed } = playLevel(levelConfig, warriorName, playerCode, maxTurns);
        expect(passed).toBe(true);
      });

      it('should not pass level when max turns are not enough', () => {
        const maxTurns = requiredTurns - 1;
        const { passed } = playLevel(levelConfig, warriorName, playerCode, maxTurns);
        expect(passed).toBe(false);
      });
    });

    describe('with a loser player code', () => {
      const playerCode = `
        class Player {
          playTurn(warrior) {
            // Cool code goes here
          }
        }
      `;

      it('should not pass level', () => {
        const { passed } = playLevel(levelConfig, warriorName, playerCode);
        expect(passed).toBe(false);
      });
    });

    describe('with an invalid player code', () => {
      it('should throw an error when there is a syntax error', () => {
        const playerCode = `
          class Player {
            playTurn(warrior) {

          }
        `;
        expect(() => {
          playLevel(levelConfig, warriorName, playerCode);
        }).toThrow('Invalid player code. Check the syntax and try again.');
      });

      it('should throw an error when there is a reference error', () => {
        const playerCode = 'foo';
        expect(() => {
          playLevel(levelConfig, warriorName, playerCode);
        }).toThrow('Invalid player code: foo is not defined.');
      });
    });
  });
});
