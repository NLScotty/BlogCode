const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

let DUMMY_NOTES = [
  {
    id: 'n1',
    title: 'Note 1',
    description: 'Eggs, Milk, Cereal',
    owner:'Dave'
  },
  {
    id: uuid(),
    title: 'Note 2',
    description: 'Pineapple, Tomatosauce, Ham, Cheese, Pizza Dough',
    owner:'Dave'
  },
  {
    id: uuid(),
    title: 'Today was not so good....',
    description: 'I lost my arm!',
    owner:'John'
  }
];

const getNoteById = (req, res, next) => {
  const NoteId = req.params.nid;

  const Note = DUMMY_NOTES.find(n => {
    return n.id === NoteId;
  });

  if (!Note) {
    throw new HttpError('Could not find a note for the provided id.', 404);
  }

  res.json({ Note }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getNotesByUserId = (req, res, next) => {
  const noteId = req.params.uid;

  const notes = DUMMY_NOTES.filter(n => {
    return n.owner === noteId;
  });

  if (!notes || notes.length === 0) {
    return next(
      new HttpError('Could not find notes for the provided user id.', 404)
    );
  }

  res.json({ notes });
};

const createNote = (req, res, next) => {
  const { title, description, owner } = req.body;
  // const title = req.body.title;
  const createdNote = {
    id: uuid(),
    title,
    description,
    owner
  };

  DUMMY_NOTES.push(createdNote); //unshift(createdPlace)

  res.status(201).json({ note: createdNote });
};

const updateNote = (req, res, next) => {
  const { title, description } = req.body;
  const noteId = req.params.nid;

  const updatedNote = { ...DUMMY_NOTES.find(n => n.id === noteId) };
  const noteIndex = DUMMY_NOTES.findIndex(n => n.id === noteId);
  updatedNote.title = title;
  updatedNote.description = description;

  DUMMY_NOTES[noteIndex] = updatedNote;

  res.status(200).json({ note: updatedNote });
};

const deleteNote = (req, res, next) => {
  const noteId = req.params.id;
  DUMMY_NOTES = DUMMY_NOTES.filter(n => n.id !== noteId);
  res.status(200).json({ message: 'Deleted note.' });
};

exports.getNoteById = getNoteById;
exports.getNotesByUserId = getNotesByUserId;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
