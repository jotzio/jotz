var React = require('react');
var MenuItem = require('./menu_item.js');

var SideMenu = React.createClass({
  getDefaultProps: function() {
    return {
      menuItems: [
        {
          category: 'Notes',
          icon: 'fonts/icons/document.svgz'
        },
        {
          category: 'Notebooks',
          icon: 'fonts/icons/book.svgz'
        }
      ]
    };
  },

  //getInitialState: function() {
  //  return {
  //    activeMenuItemUid: 'Notes'
  //  }
  //},

  //setActiveMenuItem: function(item) {
  //  this.setState({activeMenuItemUid: item});
  //  this.props.swapView(item);
  //},

  render: function() {
    var menuItems = this.props.menuItems.map(function(menuItem) {
      return (
        <MenuItem
          active={this.props.currentView === menuItem.category}
          key={menuItem.category}
          swapView={this.props.swapView}
          category={menuItem.category}
          icon={menuItem.icon}
        />
      );
    }.bind(this));

    //var classes = {
    //  sideMenu: 'side-menu',
    //  notebooksLink: 'notebooks-link'
    //};

    return (
      <div className='side-menu notebooks-link'>
        <h1 className='logo'>Jotz</h1>
        <ul className='main-nav'>
          {menuItems}
        </ul>
        <div className='aux-nav-container'>
          <ul className='aux-nav-list'>
            <li className='aux-nav-item'>
              <img data-src='fonts/icons/cog.svgz' className='iconic iconic-sm aux-nav-icon'/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SideMenu;
