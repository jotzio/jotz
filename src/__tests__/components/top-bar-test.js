jest.dontMock('../../renderer/components/top_bar/top_bar.js');

var React = require('react/addons');
var TopBar = require('../../renderer/components/top_bar/top_bar.js');
var TestUtils = React.addons.TestUtils;

describe('TopBar', function() {
  var TopBarElement = TestUtils.renderIntoDocument(<TopBar />);

  it('renders a TopBar', function() {
    var welcomeText = TestUtils.findRenderedDOMComponentWithTag(TopBarElement, 'h1');
    expect(welcomeText.getDOMNode().textContent).toEqual('Hello this is the top bar.');
  });
});
