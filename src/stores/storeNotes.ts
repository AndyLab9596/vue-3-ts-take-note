import { notesCollection } from "@/includes/firebase";
import type { INote } from "@/types/NoteTypes";
import {
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";

/** */
export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [] as INote[],
    };
  },
  actions: {
    async getNotesFromFireStore() {
      onSnapshot(notesCollection, (querySnapshot) => {
        const notes: INote[] = [];
        querySnapshot.forEach((doc) => {
          notes.push({
            id: doc.id,
            content: doc.data().content,
          });
        });
        this.notes = notes;
      });
    },
    async addNote(content: INote["content"]): Promise<void> {
      await setDoc(doc(notesCollection, new Date().getTime().toString()), {
        content,
      });
    },
    async deleteNote(id: INote["id"]) {
      await deleteDoc(doc(notesCollection, id));
    },
    async updateNote({ id, content }: INote) {
      await updateDoc(doc(notesCollection, id), {
        content,
      });
    },
  },
  getters: {
    getNoteById: (state) => {
      return (noteId: INote["id"]) =>
        state.notes.find((note) => note.id === noteId);
    },
    totalNotesCount: (state) => state.notes.length,
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
