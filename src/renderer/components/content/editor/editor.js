var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/action_creator');
var NoteBlock = require('./note_block');

/*
 Contains functions for each note.
 Renders NoteBlocks which are stored together in an array as a note.
 TODO: change title h3 to input and add state callback to update note
 TODO: add note deletion
 */


var Editor = React.createClass({
  //newBlock and updateBlock = self explanatory
  //Be careful with changing props, can wipe noteblocks if blocks prop is messed with
  //Everything is Asynchronous, and using replaceState will wipe all blocks, deleting the note

  componentDidMount: function() {
    this.props.note.on('block-updated', function() {
      this.forceUpdate();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    actionCreator.saveNote(this.props.note);
    this.props.note.off(null, null, this);
  },

  createBlock: function() {
    actionCreator.createBlock();
  },

  updateBlock: function(index, content, language) {
    actionCreator.updateBlock({
      index: index,
      content: content,
      language: language
    })
  },

  //flux activity here, props is sent (not changed)
  //via dispatch to update store
  saveNote: function() {
    actionCreator.saveNote(this.props.note);
  },

  closeEditor: function() {
    this.props.swapView('Notes');
  },

  //Called in render, this reads the blocks data and creates NoteBLocks,
  //NoteBLock appends text/value to ace editor
  renderBlocks: function() {
    return this.props.note.get('blocks').map(function (block, index) {
      return (
        <NoteBlock
          text={block.content}
          language={block.language}
          blockIndex={index}
          updateBlock={this.updateBlock}
        />
      );
    }.bind(this));
  },

  render: function() {
    return (
      <div className='ace-editor-container'>
        <h3>{this.props.note.get('title')}</h3>
        <button onClick={this.createBlock}>NEW BLOCK</button>
        {this.renderBlocks()}
        <button onClick={this.saveNote}>SAVE</button>
        <button onClick={this.closeEditor}>CLOSE EDITOR</button>
      </div>
    );
  }
});

module.exports = Editor;
