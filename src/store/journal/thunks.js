import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirestoreDB } from "../../firabase/config";
import { addNewNote, setActiveNote, creatingNewNote, setNotes, setSaving, noteUpdated, setImageToNote, deleteNoteById } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(creatingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        };

        const newDoc = doc(collection(FirestoreDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote)
        newNote.id = newDoc.id;

        dispatch(addNewNote(newNote));
        dispatch(setActiveNote(newNote));

    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('User not found');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        if (!uid) throw new Error('User not found');

        const { activeNote } = getState().journal;
        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        const docRef = doc(FirestoreDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(noteUpdated(activeNote));
    }
};

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        // This way triggers one request per file
        // await fileUpload(files[0]);

        // This way triggers one request for all files
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }
        const imagesUrls = await Promise.all(fileUploadPromises);

        dispatch(setImageToNote(imagesUrls));
    }
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc(FirestoreDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id));
    }
};