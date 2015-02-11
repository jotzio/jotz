(function(){
  var React = require('react');
  var SideMenu = require('./components/SideMenu');

  window.React = React;

  React.render(
    <SideMenu />,
    document.getElementById('viewport')
  )
})();

