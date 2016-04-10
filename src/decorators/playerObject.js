export const ORIGINAL_OBJECT = Symbol();

export function playerObject(allowedProperties = []) {
  return (target) => {
    Object.defineProperty(target.prototype, 'toPlayerObject', {
      value() {
        const result = {};

        allowedProperties
          .filter(id => typeof this[id] === 'function')
          .forEach(id => {
            result[id] = this[id].bind(this);
          });

        result[ORIGINAL_OBJECT] = this;

        return result;
      },
    });
  };
}
