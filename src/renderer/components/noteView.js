var placeholder = 'Alas leggo my "leggo my eggo" legless lego legolas and leave illegible legalese legacies with legerity, lege of allegorist lasses';

var NoteView = React.createClass({
  render: function(){
    var classes = 'note ';
    return (
      <div className={classes}> {this.props.note} </div>
    );
  }
});

React.render(
  <NoteView note={placeholder} />,
  document.getElementById('noteview')
);