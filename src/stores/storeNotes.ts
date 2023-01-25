import { useStoreAuth } from "./storeAuth";
import type { INote, IUser } from "@/types/NoteTypes";
import {
  deleteDoc,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  query,
  orderBy,
  collection,
} from "firebase/firestore";
import type {
  DocumentData,
  CollectionReference,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/includes/firebase";
import { defineStore } from "pinia";

let notesCollection: CollectionReference<DocumentData> | null = null;
let getNotesSnapshot: Unsubscribe | null = null;

/** */
export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [] as INote[],
      notesLoaded: true as boolean,
    };
  },
  actions: {
    async init() {
      const storeAuth = useStoreAuth();
      // initialize our database refs
      notesCollection = collection(
        db,
        "users",
        (storeAuth.user as IUser).id,
        "notes"
      );
      await this.getNotesFromFireStore();
    },
    async getNotesFromFireStore() {
      this.notesLoaded = false;
      const notesCollectionQuery = query(
        notesCollection as CollectionReference<DocumentData>,
        orderBy("date", "desc")
      );

      /** Unsubscribe from an active listener */
      if (getNotesSnapshot) getNotesSnapshot();

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        const notes: INote[] = [];
        querySnapshot.forEach((doc) => {
          notes.push({
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          });
        });
        this.notes = notes;
        this.notesLoaded = true;
      });
    },
    async addNote(content: INote["content"]) {
      const date = new Date().getTime().toString();
      await addDoc(notesCollection as CollectionReference<DocumentData>, {
        content,
        date,
      });
    },
    async deleteNote(id: INote["id"]) {
      await deleteDoc(
        doc(notesCollection as CollectionReference<DocumentData>, id)
      );
    },
    async updateNote({ id, content }: Omit<INote, "date">) {
      await updateDoc(
        doc(notesCollection as CollectionReference<DocumentData>, id),
        {
          content,
        }
      );
    },
    clearNotes() {
      this.notes = [];
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
