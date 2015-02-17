var React = require('react');
var SideMenu = require('./sidemenu/sidemenu');
var Content = require('./content/content');
var TopBar = require('./topBar/topBar');
var NotebookStore = require('../stores/notebook');

var Jotz = React.createClass({
  getInitialState: function() {
    return {
      jotzState: {
        view: 'Notes'
      }
    };
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  changeView: function(newView) {
    this.setState({jotzState: {view: newView }});
  },

  render: function() {
    var right = 'right-container';
    var left = 'side-container';
    return (
      <div>
        <div className={left}>
          <SideMenu onChange={this.changeView}/>
        </div>
        <div className={right}>
          <TopBar />
          <Content view={this.state.jotzState.view} notebookStore={NotebookStore}/>
        </div>
      </div>
    )
  }
});

module.exports = Jotz;
