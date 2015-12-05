function getViewObject(object) {
  return typeof object.toViewObject === 'function' ?
    object.toViewObject() :
    object;
}

export function viewObject(viewProperties = {}) {
  return (target) => {
    Object.defineProperty(target.prototype, 'toViewObject', {
      value: function () {
        const result = {};

        Object.entries(viewProperties).forEach(([viewId, id]) => {
          const value = this[id];

          result[viewId] = Array.isArray(value) ?
            value.map(getViewObject) :
            getViewObject(value);
        });

        return result;
      },
    });
  };
}
