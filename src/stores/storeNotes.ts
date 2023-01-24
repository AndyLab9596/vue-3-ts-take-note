import { defineStore } from "pinia";
import type { INote } from "@/types/NoteTypes";
import { v4 as uuidv4 } from "uuid";

/** */
export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        {
          id: "id1",
          content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
        {
          id: "id2",
          content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
        {
          id: "id3",
          content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
      ] as INote[],
    };
  },
  actions: {
    addNote(content: INote["content"]): void {
      const newOne = {
        id: uuidv4(),
        content,
      };
      this.notes.unshift(newOne);
    },
    deleteNote(id: INote["id"]): void {
      const deletedNoteIndex = this.notes.findIndex((note) => note.id === id);
      if (deletedNoteIndex < 0) return;
      this.notes.splice(deletedNoteIndex, 1);
    },
    updateNote({ id, content }: INote): void {
      const updatedNoteIndex = this.notes.findIndex((note) => note.id === id);
      if (updatedNoteIndex < 0) return;
      this.notes[updatedNoteIndex].content = content;
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
