import playLevel from '../src/playLevel';

describe('play level', () => {
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
      warrior: {
        name: 'Spartacus',
        x: 0,
        y: 0,
        facing: 'east',
        abilities: [
          {
            name: 'walk',
            args: [],
          },
        ],
      },
      units: [],
    },
  };

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
      const { passed } = playLevel(levelConfig, playerCode, maxTurns);
      expect(passed).toBe(true);
    });

    it('should not pass level when max turns are not enough', () => {
      const maxTurns = requiredTurns - 1;
      const { passed } = playLevel(levelConfig, playerCode, maxTurns);
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
      const { passed } = playLevel(levelConfig, playerCode);
      expect(passed).toBe(false);
    });
  });
});