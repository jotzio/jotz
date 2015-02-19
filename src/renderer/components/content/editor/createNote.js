var remote = require('remote');
var path = require('path');
var utils = remote.require(path.join(__dirname, '../../../../browser/utils/global.js'));

var createNote = function() {
  return {
    _id: utils.createGuid(),
    title: 'Testing Title',
    blocks: [{
      language: 'text',
      content: ''
    }],
    notebook: {
      title: '',
      _id: utils.createGuid()
    }
  }
};

module.exports = createNote;
