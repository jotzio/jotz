jest.dontMock('../../renderer/components/content.js');

var React = require('react/addons');
var Content = require('../../renderer/components/content.js');
var TestUtils = React.addons.TestUtils;

describe('Content', function() {
  var ContentElement = TestUtils.renderIntoDocument(<Content />);

  it('renders a Content', function() {
    var welcomeText = TestUtils.findRenderedDOMComponentWithTag(ContentElement, 'h1');
    expect(welcomeText.getDOMNode().textContent).toEqual('This is the main content area');
  });
});
