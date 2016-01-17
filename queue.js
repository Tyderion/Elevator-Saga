function () {
      "use strict";
      var data = new Set();
      var push = ele => data.add(ele);
      var pop = () => {
        let value = data.values().next().value;
        data.delete(value);
        return value;
      }
      var contains = (value) => data.has(value);
      var remove = (value) => data.delete(value);
      return {
        push: push,
        next: pop,
        length: () => data.size,
        print: () => console.log(data),
        has: contains,
        remove: remove
      }
}();
