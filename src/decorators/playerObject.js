export const ORIGINAL_OBJECT = Symbol();

export default function playerObject(propertyBlacklist = []) {
  return (target) => {
    Object.defineProperty(target.prototype, 'toPlayerObject', {
      value() {
        const result = {};

        const properties = [
          ...Object.getOwnPropertyNames(this),
          ...Object.getOwnPropertyNames(Object.getPrototypeOf(this)),
        ];

        properties
          .filter(prop => prop !== 'toPlayerObject' && !propertyBlacklist.includes(prop))
          .forEach((prop) => {
            result[prop] = typeof this[prop] === 'function' ? this[prop].bind(this) : this[prop];
          });

        result[ORIGINAL_OBJECT] = this;

        return result;
      },
    });
  };
}
