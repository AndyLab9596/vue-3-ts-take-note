<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef">
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
    <SingleNote v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SingleNote from "@/components/Notes/SingleNote.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";

/**Store */
const storeNotes = useStoreNotes();

const newNote = ref("");
const addEditNoteRef = ref<InstanceType<typeof AddEditNote> | null>(null);

const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value?.focusTextarea();
};
</script>

<style scoped></style>
