import playLevel from '../src/Engine';

describe('Engine', function () {
  describe('level without other units', function () {
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
          units: {
            r10qaXdP: {
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
          },
        },
      };
      this.warriorName = 'Spartacus';
    });

    describe('with a winner player code', function () {
      this.slow(500);

      beforeEach(function () {
        this.playerCode = `
          class Player {
            playTurn(warrior) {
              warrior.walk();
            }
          }
        `;
        this.requiredTurns = 7;
      });

      it('should pass level when max turns are enough', function () {
        const maxTurns = this.requiredTurns;
        const { passed } = playLevel(this.levelConfig, this.warriorName, this.playerCode, maxTurns);
        passed.should.be.true;
      });

      it('should not pass level when max turns are not enough', function () {
        const maxTurns = this.requiredTurns - 1;
        const { passed } = playLevel(this.levelConfig, this.warriorName, this.playerCode, maxTurns);
        passed.should.be.false;
      });
    });

    describe('with a loser player code', function () {
      this.slow(500);

      beforeEach(function () {
        this.playerCode = `
          class Player {
            playTurn(warrior) {
              // Cool code goes here
            }
          }
        `;
      });

      it('should not pass level', function () {
        const { passed } = playLevel(this.levelConfig, this.warriorName, this.playerCode);
        passed.should.be.false;
      });
    });
  });

  describe('level with other units', function () {
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
          units: {
            r10qaXdP: {
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
                {
                  name: 'attack',
                  args: [],
                },
                {
                  name: 'feel',
                  args: [],
                },
              ],
            },
            Bktha7dP: {
              type: 'sludge',
              position: {
                x: 4,
                y: 0,
                direction: 'west',
              },
            },
          },
        },
      };
      this.warriorName = 'Spartacus';
    });

    describe('with a winner player code', function () {
      this.slow(500);

      beforeEach(function () {
        this.playerCode = `
          class Player {
            playTurn(warrior) {
              if (warrior.feel().isEnemy()) {
                warrior.attack();
              } else {
                warrior.walk();
              }
            }
          }
        `;
        this.requiredTurns = 10;
      });

      it('should pass level when max turns are enough', function () {
        const maxTurns = this.requiredTurns;
        const { passed } = playLevel(this.levelConfig, this.warriorName, this.playerCode, maxTurns);
        passed.should.be.true;
      });

      it('should not pass level when max turns are not enough', function () {
        const maxTurns = this.requiredTurns - 1;
        const { passed } = playLevel(this.levelConfig, this.warriorName, this.playerCode, maxTurns);
        passed.should.be.false;
      });
    });

    describe('with a loser player code', function () {
      this.slow(500);

      beforeEach(function () {
        this.playerCode = `
          class Player {
            playTurn(warrior) {
              warrior.walk();
            }
          }
        `;
      });

      it('should not pass level', function () {
        const { passed } = playLevel(this.levelConfig, this.warriorName, this.playerCode);
        passed.should.be.false;
      });
    });
  });
});
