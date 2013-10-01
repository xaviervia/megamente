var vows        = require('vows')
  , assert      = require('assert')
  , jstp        = require('jstp')
  , sh          = require('execSync')
  , exec        = require('child_process').exec
  , megamente   = require('../index');

megamente.setup(jstp);

vows.describe('megamente').addBatch({
  'Run a simple `pwd` command': {
    topic: function () {
      jstp.bind({
        endpoint: {
          method: "PUT",
          resource: ["pwd"]
        }
      }, this.callback, this);

      jstp.get({
        resource: ["pwd"]
      });
    },

    'returns the path': function (engine, answer, dispatch) {
      var pwd = sh.exec("pwd");
      assert.equal(dispatch.body, pwd.stdout);
    }
  },

  'Run an echo command with an argument': 'pending',
  'Arguments as successive elements in the Resource Header': 'pending'
  
}).export(module); // Export the Suite