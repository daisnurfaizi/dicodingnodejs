const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h)=>{
  const {title, tags, body} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {id, title, tags, body, createdAt, updatedAt};
  notes.push(newNote);

  const isSuccess = notes.filter((note)=>note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(400);
  return response;
};
const getAllNotesHandler = ()=>({
  status: 'success',
  message: 'Catatan berhasil ditampilkan',
  data: {
    notes,
  },
});

const getNoteHandler = (request, h)=>{
  const {id} = request.params;
  const note = notes.find((note)=>note.id === id);

  if (note !== undefined) {
    return {
      status: 'success',
      message: 'Catatan berhasil ditampilkan',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditampilkan',
  });
  response.code(400);
  return response;
};

const editNoteHandler = (request, h)=>{
  const {id} = request.params;
  const {title, tags, body} = request.payload;
  const updatedAt = new Date().toISOString();

  const noteIndex = notes.findIndex((note)=>note.id === id);
  if (noteIndex !== -1) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      tags,
      body,
      updatedAt,
    };
    return {
      status: 'success',
      message: 'Catatan berhasil diedit',
      data: {
        noteId: id,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diedit',
  });
  response.code(400);
  return response;
};

const deleteNoteHandler = (request, h)=>{
  const {id} = request.params;
  const noteIndex = notes.findIndex((note)=>note.id === id);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
      data: {
        noteId: id,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus',
  });
  response.code(400);
  return response;
};


// eslint-disable-next-line max-len
module.exports = {addNoteHandler, getAllNotesHandler, getNoteHandler, editNoteHandler, deleteNoteHandler};
