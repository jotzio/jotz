var React = require('react/addons');

var NoteViewMenu = React.createClass({
  render: function(){
    return(
      <h3>here|are|some|menu|items</h3>
    );
  }
});

var NoteView = React.createClass({
  render: function(){
    var classes = 'note ';
    return (
      <div className={classes}>
        <NoteViewMenu />
        {this.props.note}
      </div>
    );
  }
});

module.exports = NoteView;
