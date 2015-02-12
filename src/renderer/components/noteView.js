var actionCreator = require('../actions/actionCreator');

var NoteViewMenu = React.createClass({
  makeNote: function(content){
    actionCreator.makeNote(content);
  },

  render: function(){
    return(
      <div>
        <button onClick={this.makeNote(this.props.note)}></button>
      </div>
    );
  }
});

var NoteView = React.createClass({
  render: function(){
    var classes = 'note ';
    return (
      <div className={classes}>
        <NoteViewMenu note={this.props.note}/>
        {this.props.note}
      </div>
    );
  }
});

module.exports = NoteView;
