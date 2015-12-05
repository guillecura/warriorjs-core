export const originalObject = Symbol();

export function playerObject(allowedProperties = []) {
  return (target) => {
    Object.defineProperty(target.prototype, 'toPlayerObject', {
      value: function () {
        const result = {};

        allowedProperties
          .filter((id) => typeof this[id] === 'function')
          .forEach((id) => result[id] = this[id].bind(this));

        result[originalObject] = this;

        return result;
      },
    });
  };
}
