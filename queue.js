module.exports = (function () {
      "use strict";
      var data = new Set();
      var push = ele => data.add(ele);
      var pop = () => {
        let value = data.values().next().value;
        data.delete(value);
        return value;
      }
      return {
        push: push,
        next: pop,
        length: () => data.size
      }
})()
