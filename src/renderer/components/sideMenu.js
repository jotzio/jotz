var MenuItems = React.createClass({
  render: function(){
    return (
      <div>
        <div>Notebooks</div>
        <div>Notes</div>
      </div>
    );
  }
});

var Settings = React.createClass({
  render: function(){
    var classes = 'settingsBtn';
    return (
      <div className={classes}>settings</div>
    );
  }
});

var SideMenu = React.createClass({
  render: function(){
    var classes = 'sidemenu';
    return (
      <div className={classes}>
        <h2>Jotz</h2>
        <MenuItems/>
        <Settings/>
      </div>
    );
  }
});

React.render(
  <SideMenu />,
  document.getElementById('sidemenu')
);
