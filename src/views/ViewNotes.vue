<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      bg-color="success"
      place-holder="Add a new note"
    >
      <template #buttons>
        <button
          class="button is-link has-background-success"
          @click="addNote"
          :disabled="!newNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>
    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100"
    ></progress>
    <template v-else>
      <SingleNote
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />
      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        No notes here yet...
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SingleNote from "@/components/Notes/SingleNote.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useWatchCharacters } from "@/use/useWatchCharacters";

/**Store */
const storeNotes = useStoreNotes();

const newNote = ref("");
const addEditNoteRef = ref<InstanceType<typeof AddEditNote> | null>(null);

const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value?.focusTextarea();
};

useWatchCharacters(newNote, 50);
</script>

<style scoped></style>
