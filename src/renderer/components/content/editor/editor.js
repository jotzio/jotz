var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/action_creator');
var NoteBlock = require('./note_block');
var NotebookSelector = require('./notebook_selector');
var Note = require('../../../stores/note');

/*
 Contains functions for each note.
 Renders NoteBlocks which are stored together in an array as a note.
 */

var getNewNote = function(note) {
  return {
    note: note || new Note()
  };
};

var Editor = React.createClass({

  getInitialState: function() {
    return {
      note: this.props.note
    };
  },

  makeGist: function(blockIndex) {
    actionCreator.makeGist(this.props.note.get('blocks')[blockIndex]);
  },

  createBlock: function() {
    var blocks = this.state.note.blocks;
    blocks.push( { "content": "", "language":"text" } );
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $set: blocks
        }
      }
    });
    this.setState(newState);
    this.changed = true;
  },

  makeGist: function(blockIndex) {
    var payload = {
      block: this.state.note.get('blocks')[blockIndex],
      note: this.state.note,
      blockIdx: blockIndex
    };
    actionCreator.makeGist(payload);
  },

  deleteBlock: function(index) {
    var blocks = this.state.note.blocks;
    blocks.splice(index, 1);
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $set: blocks
        }
      }
    });
    this.setState(newState);
    this.changed = true;
  },

  //flux activity here, props is sent (not changed)
  //via dispatch to update store
  saveNote: function() {
    actionCreator.saveNote(this.state.note);
    this.changed = false;
  },

  closeEditor: function() {
    this.props.swapView('Notes');
  },

  deleteNote: function() {
    actionCreator.destroyNote(this.state.note);
    this.props.swapView('Notes');
  },

  renderBlock: function(block, index) {
    return (
      <NoteBlock
        text={block.content}
        language={block.language}
        blockIndex={index}
        blockGistUrl={block.gistUrl}
        blockGistId={block.gistId}
        updateBlock={this.updateBlock}
        deleteBlock={_.partial(this.deleteBlock, index)}
        makeGist={this.makeGist}
      />
    );
  },

  renderBlocks: function() {
    return this.state.note.blocks.map(this.renderBlock);
  },

  render: function() {
    var deleteBtn = null;
    var noteTitle = '';
    //var notebookId = null;
    if (this.state.note._id) {
      deleteBtn = <button className="btn" onClick={this.deleteNote}>Delete</button>;
      noteTitle = this.state.note.title;
      //notebookId = this.props.note.notebook._id;
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

//newBlock and updateBlock = self explanatory
//Be careful with changing props, can wipe noteblocks if blocks prop is messed with
//Everything is Asynchronous, and using replaceState will wipe all blocks, deleting the note


//componentDidMount: function() {
//  this.props.note.on('all', this.updateComp, this);
//},
//
//componentWillUnmount: function() {
//  actionCreator.checkForSave({
//    note: this.props.note,
//    changed: this.changed
//  });
//  this.props.note.off(null, null, this);
//},
//
//updateComp: function() {
//  this.forceUpdate();
//},


//updateBlock: function(blockData) {
//  actionCreator.updateBlock(blockData);
//  this.changed = true;
//},
//
//updateTitle: function(event) {
//  actionCreator.updateTitle(event.target.value);
//  this.changed = true;
//},
//
//updateNotebook: function(notebook) {
//  actionCreator.updateNotebook(notebook);
//  this.changed = true;
//},

//<NotebookSelector
//  notebookId={notebookId}
//  notebooks={this.props.notebooks}
//  note={this.props.note}
//  updateNotebook={this.updateNotebook}
///>
