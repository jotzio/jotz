var placeholder = 'Alas leggo my "leggo my eggo" legless lego legolas and leave illegible legalese legacies with legerity, lege of allegorist lasses';

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

React.render(
  <NoteView note={placeholder} />,
  document.getElementById('noteview')
);