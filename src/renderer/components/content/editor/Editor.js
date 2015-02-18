var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/actionCreator');
var NoteBlock = require('./NoteBlock');

/*
  Contains functions for each note.
  Renders NoteBlocks which are stored together in an array as a note.
  TODO: IMPORTANT!!! save and read language to/from blocks !!!
  TODO: change title h3 to input and add state callback to update note
  TODO: add note deletion
 */


var Editor = React.createClass({
  //newBlock and updateBlock = self explanatory
  //Be careful with changing props, can wipe noteblocks if blocks prop is messed with
  //Everything is Asynchronous, and using replaceState will wipe all blocks, deleting the note
  newBlock: function() {
    var blocks = this.props.note.blocks.concat(['']);
    this.props.updateNoteBlock(blocks);
  },

  updateBlock: function(index, value) {
    var blocks = _.clone(this.props.note.blocks);
    blocks[index] = value;
    this.props.updateNoteBlock(blocks);
  },

  //flux activity here, props is sent (not changed)
  //via dispatch to update store
  saveNote: function() {
    actionCreator.saveNote(this.props.note);
  },

  //Called in render, this reads the blocks data and creates NoteBLocks,
  //NoteBLock appends text/value to ace editor
  renderBlocks: function() {
    return this.props.note.blocks.map(function (text, index) {
      return (
        <NoteBlock
          text={text}
          blockNum={index}
          updateBlock={this.updateBlock}
        />
      );
    }.bind(this));
  },

  render: function() {
    return (
      <div className='ace-editor-container'>
        <h3>{this.props.note.title}</h3>
        <button onClick={this.newBlock}>NEW BLOCK</button>
        {this.renderBlocks()}
        <button onClick={this.saveNote}>SAVE</button>
      </div>
    );
  }
});

module.exports = Editor;