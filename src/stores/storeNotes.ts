import { defineStore } from "pinia";
import type { INote } from "@/types/NoteTypes";
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
    addNote(note: INote): void {
      this.notes.unshift(note);
    },
    deleteNote(id: INote["id"]): void {
      const deletedNoteIndex = this.notes.findIndex((note) => note.id === id);
      if (deletedNoteIndex < 0) return;
      this.notes.splice(deletedNoteIndex, 1);
    },
  },
});
