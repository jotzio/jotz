var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/action_creator');
var NoteBlock = require('./note_block');
var NotebookSelector = require('./notebook_selector');
var Note = require('../../../stores/note');

/*
 Contains functions for each note.
 Renders NoteBlocks which are stored together in an array as a note.
 TODO: change title h3 to input and add state callback to update note
 */

var getNewNote = function(note) {
  note = note || new Note(
    {
      blocks: [
        {
          language: 'text',
          content: ''
        }
      ]
    }
  );
  return {
    note: note
  };
};

var Editor = React.createClass({
  //newBlock and updateBlock = self explanatory
  //Be careful with changing props, can wipe noteblocks if blocks prop is messed with
  //Everything is Asynchronous, and using replaceState will wipe all blocks, deleting the note

  changed: false,

  componentDidMount: function() {
    this.state.note.on('all', this.updateComp, this);
  },

  componentWillUnmount: function() {
    actionCreator.checkForSave({
      note: this.state.note,
      changed: this.changed
    });
    this.state.note.off(null, null, this);
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

  updateNotebook: function(title) {
    actionCreator.updateNotebook(title)
  },

  makeGist: function(blockIndex) {
    actionCreator.makeGist(this.state.note.get('blocks')[blockIndex]);
  },

  deleteBlock: function(index) {
    actionCreator.deleteBlock(index);
    this.changed = true;
  },

  //flux activity here, props is sent (not changed)
  //via dispatch to update store
  saveNote: function() {
    actionCreator.saveNote(this.state.note);
    this.changed = false;
  },

  closeEditor: function() {
    this.props.changeNote('Notes');
  },

  deleteNote: function() {
    actionCreator.destroyNote(this.state.note);
    this.props.changeNote('Notes');
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
    return this.state.note.get('blocks').map(this.newBlock);
  },

  render: function() {
    var deleteBtn = null;
    var noteTitle = '';
    if (this.state.note.get('_id')) {
      deleteBtn = <button className="btn" onClick={this.deleteNote}>Delete</button>;
      noteTitle = this.state.note.get('title');
    }
    return (
      <div className='ace-editor-container'>
        <div className="editor-top-bar">
          <input
            className='editor-note-title'
            type='text'
            onChange={this.updateTitle}
            placeholder='Note title'
            defaultValue={noteTitle}
          />
          <NotebookSelector
            notebooks={this.props.notebooks}
            updateNotebook={this.updateNotebook}
          />
          <button className="btn editor-new-block" onClick={this.createBlock}>New Block</button>
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
