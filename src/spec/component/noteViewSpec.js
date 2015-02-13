require('node-jsx').install();
var React = require('../helpers/react-global');
var TestUtils = React.addons.TestUtils;
var jsdom = require('jsdom');

describe('NoteView', function() {
  var NoteView = require('../../renderer/components/noteView');

  beforeEach(function() {
    document = jsdom.jsdom();
    window = document.parentWindow;
    component = TestUtils.renderIntoDocument( React.createElement(NoteView, null));
  });

  it("renders", function() {
    var foundComponent = TestUtils.isCompositeComponentWithType(component, NoteView);

    expect(foundComponent).toBeTruthy();
  });
});
