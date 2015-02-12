var React = require('react');

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
    var style = {
      width: '60px',
      height: '60px',
      border: '1px solid black'
    };
    return (
      <div style={style}>settings</div>
    );
  }
});

var SideMenu = React.createClass({
  render: function(){
    var style = {
      width: '15%',
      height: '100vh',
      border: '1px solid red',
      overflow: 'hidden'
    };
    return (
      <div style={style}>
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
