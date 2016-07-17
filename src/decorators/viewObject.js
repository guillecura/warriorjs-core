export default function viewObject(viewObjectShape = {}) {
  return (target) => {
    Object.defineProperty(target.prototype, 'toViewObject', {
      value() {
        const applyShape = (shape) => {
          const result = {};

          Object.keys(shape).forEach((key) => {
            if (typeof shape[key] === 'function') {
              const viewProperty = shape[key].call(this);

              if (viewProperty) {
                result[key] = typeof viewProperty.toViewObject === 'function' ?
                  viewProperty.toViewObject() :
                  viewProperty;
              } else {
                result[key] = viewProperty;
              }
            } else {
              result[key] = applyShape(shape[key]);
            }
          });

          return result;
        };

        return applyShape(viewObjectShape);
      },
    });
  };
}
