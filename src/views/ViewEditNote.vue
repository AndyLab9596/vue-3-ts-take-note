<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bg-color="link"
      :place-holder="`Edit note with id ${$route.params.id}`"
      label="Edit Note"
    >
      <template #buttons>
        <button class="button is-link is-light mr-2" @click="$router.back()">
          Cancel
        </button>
        <button
          class="button is-link has-background-link"
          :disabled="!noteContent"
          @click="onSaveNote"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";

import { useStoreNotes } from "@/stores/storeNotes";
import { useRoute, useRouter } from "vue-router";

/**Store */
const storeNotes = useStoreNotes();

const route = useRoute();
const router = useRouter();
const noteId = route.params.id as string;
const contentFromStore = storeNotes.getNoteById(noteId)?.content as string;

const noteContent = ref(contentFromStore);

const onSaveNote = () => {
  if (noteContent.value === contentFromStore) return;
  storeNotes.updateNote({ id: noteId, content: noteContent.value });
  router.back();
};
</script>

<style scoped></style>
