var exec = require("child_process").exec;

var megamente = {
  setup: function (engine) {
    engine.bind({
      endpoint: {
        method: "GET",
        resource: ["*"]
      }
    }, this.get, this);
  },

  get: function (engine, answer, dispatch) {
    exec(dispatch.resource[0], function (error, stdout, stderr) {
      engine.put({
        resource: dispatch.resource,
        body: stdout
      });
    });
  }
}

module.exports = megamente;