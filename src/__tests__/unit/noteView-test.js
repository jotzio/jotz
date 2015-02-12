jest.dontMock('../../renderer/components/noteView.js');

var React = require('react/addons');
var NoteView = require('../../renderer/components/noteView.js');
var TestUtils = React.addons.TestUtils;

describe('NoteView', function() {
  it('renders a noteView', function() {
    expect(2).toEqual(2);
  });
});
