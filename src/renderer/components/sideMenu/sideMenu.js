var React = require('react');

var MenuItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.onSelect(this.props.uid);
  },

  render: function() {
    var className = this.props.active ? 'active' : null;
    return (
      <li className={className}>
        <a href={'#'} className={this.props.uid} onClick={this.handleClick}>{this.props.uid}</a>
      </li>
    )
  }
});

var SideMenu = React.createClass({
  getDefaultProps: function() {
    return {
      menuItems: [
        {uid: 'Notes'},
        {uid: 'Notebooks'}
      ]
    };
  },

  getInitialState: function() {
    return {
      activeMenuItemUid: 'Notes'
    }
  },

  setActiveMenuItem: function(uid) {
    this.setState({activeMenuItemUid: uid});
  },

  render: function() {
    var menuItems = this.props.menuItems.map(function(menuItem) {
      return (
        <MenuItem
          active={this.state.activeMenuItemUid === menuItem.uid}
          key={menuItem.ui}
          onSelect={this.setActiveMenuItem}
          uid={menuItem.uid}
        />
      );
    }.bind(this));

    var classes = {
      sidemenu: 'sidemenu',
      notebooksLink: 'notebooks-link'
    }
    return (
      <div className={classes.sidemenu}>
        <h2>Jotz</h2>
        <ul>
          {menuItems}
        </ul>
        <div>
          <ul>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SideMenu;
