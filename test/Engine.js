import { playLevel } from '../src/Engine';

describe('Engine', function () {
  this.slow(200);

  beforeEach(function () {
    this.levelConfig = {
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
  });

  describe('with a winner profile', function () {
    beforeEach(function () {
      this.profile = {
        playerCode: `
          class Player {
            playTurn(warrior) {
              warrior.walk();
            }
          }
        `,
        warriorName: 'Spartacus',
        abilities: [],
      };
      this.requiredTurns = 7;
    });

    it('should pass level when max turns are enough', function () {
      const maxTurns = this.requiredTurns;
      const { passed } = playLevel(this.levelConfig, this.profile, maxTurns);
      passed.should.be.true;
    });

    it('should not pass level when max turns are not enough', function () {
      const maxTurns = this.requiredTurns - 1;
      const { passed } = playLevel(this.levelConfig, this.profile, maxTurns);
      passed.should.be.false;
    });
  });

  describe('with a loser profile', function () {
    beforeEach(function () {
      this.profile = {
        playerCode: `
          class Player {
            playTurn(warrior) {
              // Cool code goes here
            }
          }
        `,
        warriorName: 'Spartacus',
        abilities: [],
      };
    });

    it('should not pass level', function () {
      const { passed } = playLevel(this.levelConfig, this.profile);
      passed.should.be.false;
    });
  });
});
