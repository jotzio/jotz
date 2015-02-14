jest.dontMock('../../renderer/components/content/content.js');

var React = require('react/addons');
var Backbone = require('backbone');
var Content = require('../../renderer/components/content/content.js');
var Note = require('../../renderer/stores/note');
var NotebookCollection = Backbone.Collection.extend({model: Note});
var TestUtils = React.addons.TestUtils;

describe('Content', function() {
  var ContentElement = TestUtils.renderIntoDocument(<Content notebookStore={new NotebookCollection()}/>);

  it('renders a Content', function() {
    var welcomeText = TestUtils.findRenderedDOMComponentWithTag(ContentElement, 'h1');
    expect(welcomeText.getDOMNode().textContent).toEqual('This is the main content area');
  });

  it('renders a default Note upon New Note button click', function() {
    // pending:
  });
});
