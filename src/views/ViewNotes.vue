<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Add a new note"
            v-model="newNote"
            ref="newNoteRef"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link has-background-success"
            @click="addNote"
            :disabled="!newNote"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>
    <SingleNote
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
      @delete-note="handleDeleteNote"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { INote } from "@/types/NoteTypes";
import SingleNote from "@/components/Notes/SingleNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";

/**Store */
const storeNotes = useStoreNotes();

const newNote = ref("");
const newNoteRef = ref<HTMLTextAreaElement | null>(null);
const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  newNoteRef.value?.focus();
};

const handleDeleteNote = (id: INote["id"]) => {
  storeNotes.deleteNote(id);
};
</script>

<style scoped></style>
