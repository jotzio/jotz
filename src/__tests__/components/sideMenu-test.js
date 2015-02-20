jest.dontMock('../../renderer/components/side_menu/side_menu.js');

var React = require('react/addons');
var SideMenu = require('../../renderer/components/side_menu/side_menu.js');
var TestUtils = React.addons.TestUtils;

describe('SideMenu', function() {
  var SideMenuElement = TestUtils.renderIntoDocument(<SideMenu />);

  it('renders a SideMenu', function() {
    var items = TestUtils.scryRenderedDOMComponentsWithTag(SideMenuElement, 'li');
    expect(items.length).toEqual(3);
  });

  it('sets the menu item to active when clicked', function() {
    var notebooksLink = TestUtils.findRenderedDOMComponentWithClass(SideMenuElement, 'Notebooks');
    TestUtils.Simulate.click(notebooksLink);
    expect(notebooksLink._owner.props.active).toBeTruthy();
  })
});
