jest.dontMock('../../renderer/components/topBar/topBar.js');

var React = require('react/addons');
var TopBar = require('../../renderer/components/topBar/topBar.js');
var TestUtils = React.addons.TestUtils;

describe('TopBar', function() {
  var TopBarElement = TestUtils.renderIntoDocument(<TopBar />);

  it('renders a TopBar', function() {
    var welcomeText = TestUtils.findRenderedDOMComponentWithTag(TopBarElement, 'h1');
    expect(welcomeText.getDOMNode().textContent).toEqual('Hello this is the top bar.');
  });
});
