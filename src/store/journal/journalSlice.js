import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        activeNote: null,
    },
    reducers: {
        creatingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.savedMessage = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.savedMessage = '';
        },
        noteUpdated: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note);
            state.savedMessage = `${action.payload.title}, was saved successfully`;
        },
        setImageToNote: (state, action) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.savedMessage = '';
            state.notes = [];
            state.activeNote = null;
        },
    }
});


export const {
    addNewNote,
    clearNotesLogout,
    creatingNewNote,
    deleteNoteById,
    noteUpdated,
    setActiveNote,
    setImageToNote,
    setNotes,
    setSaving,
} = journalSlice.actions;