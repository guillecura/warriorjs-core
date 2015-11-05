import Base from './Base';

class Captive extends Base {
  _name = 'Captive';
  _maxHealth = 1;

  constructor() {
    super();

    this.bind();
  }
}

export default Captive;
