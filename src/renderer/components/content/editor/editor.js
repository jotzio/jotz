var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/action_creator');
var NoteBlock = require('./note_block');

/*
 Contains functions for each note.
 Renders NoteBlocks which are stored together in an array as a note.
 TODO: change title h3 to input and add state callback to update note
 */


var Editor = React.createClass({
  //newBlock and updateBlock = self explanatory
  //Be careful with changing props, can wipe noteblocks if blocks prop is messed with
  //Everything is Asynchronous, and using replaceState will wipe all blocks, deleting the note

  changed: false,

  componentDidMount: function() {
    this.props.note.on('block-updated', this.updateComp, this);
  },

  componentWillUnmount: function() {
    actionCreator.checkForSave({
      note: this.props.note,
      changed: this.changed
    });
    this.props.note.off(null, null, this);
  },

  updateComp: function() {
    this.forceUpdate();
  },

  createBlock: function() {
    actionCreator.createBlock();
    this.changed = true;
  },

  updateBlock: function(blockData) {
    actionCreator.updateBlock(blockData);
    this.changed = true;
  },

  updateTitle: function(event) {
    actionCreator.updateTitle(event.target.value);
    this.changed = true;
  },

  makeGist: function(blockIndex) {
    actionCreator.makeGist(this.props.note.get('blocks')[blockIndex]);
  },

  deleteBlock: function(index) {
    actionCreator.deleteBlock(index);
    this.changed = true;
  },

  //flux activity here, props is sent (not changed)
  //via dispatch to update store
  saveNote: function() {
    actionCreator.saveNote(this.props.note);
    this.changed = false;
  },

  closeEditor: function() {
    this.props.swapView('Notes');
  },

  deleteNote: function() {
    actionCreator.destroyNote(this.props.note);
    this.props.swapView('Notes');
  },

  newBlock: function(block, index) {
    return (
      <NoteBlock
        text={block.content}
        language={block.language}
        blockIndex={index}
        updateBlock={this.updateBlock}
        deleteBlock={_.partial(this.deleteBlock, index)}
        makeGist={this.makeGist}
      />
    );
  },

  //Called in render, this reads the blocks data and creates NoteBLocks,
  //NoteBLock appends text/value to ace editor
  renderBlocks: function() {
    return this.props.note.get('blocks').map(this.newBlock);
  },

  render: function() {
    var deleteBtn = null;
    var noteTitle = '';
    if (this.props.note.get('_id')) {
      deleteBtn = <button className="btn" onClick={this.deleteNote}>Delete</button>;
      noteTitle = this.props.note.get('title');
    }
    return (
      <div className='ace-editor-container'>
        <div className="editor-top-bar">
          <input
            type='text'
            onChange={this.updateTitle}
            placeholder='Note title'
            defaultValue={noteTitle}
          />
          <button className="btn" onClick={this.createBlock}>New Block</button>
        </div>
        {this.renderBlocks()}
        <div className="editor-actions">
          <button className="btn" onClick={this.saveNote}>Save</button>
          <button className="btn" onClick={this.closeEditor}>Close Note</button>
          {deleteBtn}
        </div>
      </div>
    );
  }
});

module.exports = Editor;
