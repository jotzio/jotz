var React = require('react');

var SideMenu = React.createClass({
  render: function() {
    var classes = 'sidemenu';
    return (
      <div className={classes}>
        <h2>Jotz</h2>
        <ul>
          <li>Notes</li>
          <li>Notebooks</li>
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
