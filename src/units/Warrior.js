import Unit from './Unit';

export default class Warrior extends Unit {
  constructor() {
    super();

    this.name = null;
    this.score = 0;
    this.maxHealth = 20;
    this.attackPower = 5;
    this.shootPower = 3;
    this.player = null;
  }

  getName() {
    return this.name || 'Warrior';
  }

  loadPlayer(playerCode) {
    try {
      // eslint-disable-next-line
      const Player = eval(
        `
          (() => {
            ${playerCode}
            return Player;
          })();
        `,
      );
      this.player = new Player();
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error('Invalid player code. Check the syntax and try again.');
      } else if (err instanceof ReferenceError) {
        throw new Error(`Invalid player code: ${err.message}.`);
      }
    }
  }

  playTurn(turn) {
    this.player.playTurn(turn.toPlayerObject());
  }

  performTurn() {
    if (!this.currentTurn.action) {
      this.say('does nothing');
    }

    super.performTurn();
  }

  earnPoints(points) {
    this.score += points;

    this.say(`earns ${points} points`);
  }
}
