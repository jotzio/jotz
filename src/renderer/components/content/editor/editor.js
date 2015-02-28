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
  //already json
  note = note || new Note();
  return {
    note: note.toJSON(),
    noteModel: note
  };
};

var Editor = React.createClass({

  changed: false,

  getInitialState: function() {
    return getNewNote(this.props.note);
  },

  componentDidMount: function() {
    console.log(this.props.note);
    this.props.notes.on('add change remove', function(model) {
      this.setState({
        note: model.toJSON(),
        noteModel: model
      });
    }, this);
  },

  componentWillUnmount: function() {
    this.props.notes.off(null, null, this);

    var model = this.state.noteModel.set(this.state.note);
    actionCreator.checkForSave({
      note: model,
      changed: this.changed
    });
  },

  makeGist: function(blockIndex) {
    actionCreator.makeGist(this.state.note.attributes.blocks[blockIndex]);
  },

  updateTitle: function(event) {
    var newState = React.addons.update(this.state, {
      note: {
        title: { $set: event.target.value }
      }
    });
    this.setState(newState);
    this.changed = true;
  },

  createBlock: function() {
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $push: [ { "content": "", "language":"text" } ]
        }
      }
    });
    this.setState(newState);
    this.changed = true;
  },

  updateBlock: function(block) {
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $splice: [[block.index, 1, block.update]]
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
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $splice: [[index, 1]]
        }
      }
    });
    this.setState(newState);
    this.changed = true;
  },

  saveNote: function() {
    var model = this.state.noteModel.set(this.state.note);
    actionCreator.saveNote(model);
    this.changed = false;
  },

  closeEditor: function() {
    this.props.changeNote('Notes');
  },

  deleteNote: function() {
    actionCreator.destroyNote(this.state.noteModel);
    this.props.changeNote('Notes');
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
    if (this.state.note && this.state.note._id) {
      deleteBtn = <button className="btn" onClick={this.deleteNote}>Delete</button>;
      noteTitle = this.state.note.title;
      //notebookId = this.state.note.notebook._id;
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
