var React = require('react');

var MenuItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.onSelect(this.props.uid);
  },

  render: function() {
    var className = this.props.active ? 'active ' : '';
    className += 'main-nav-item';

    var titleClassName = this.props.uid + ' main-nav-title';

    return (
      <li className={className} onClick={this.handleClick}>
        <img data-src={this.props.icon} className='iconic iconic-md main-nav-icon' />
        <p className={titleClassName}>{this.props.uid}</p>
      </li>
    )
  }
});

var SideMenu = React.createClass({
  getDefaultProps: function() {
    return {
      menuItems: [
        {
          uid: 'Notes',
          icon: 'fonts/icons/document.svgz'
        },
        {
          uid: 'Notebooks',
          icon: 'fonts/icons/book.svgz'
        }
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
    this.props.swapView(uid);
  },

  render: function() {
    var menuItems = this.props.menuItems.map(function(menuItem) {
      return (
        <MenuItem
          active={this.state.activeMenuItemUid === menuItem.uid}
          key={menuItem.ui}
          onSelect={this.setActiveMenuItem}
          uid={menuItem.uid}
          icon={menuItem.icon}
        />
      );
    }.bind(this));

    var classes = {
      sidemenu: 'sidemenu',
      notebooksLink: 'notebooks-link'
    };
    return (
      <div className={classes.sidemenu}>
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
