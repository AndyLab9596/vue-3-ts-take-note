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

    <div class="card mb-4" v-for="note in notes" :key="note.id">
      <div class="card-content">
        <div class="content">
          {{ note.content }}
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { INote } from "@/types/NoteTypes";
import { v4 as uuidv4 } from "uuid";

/**
 * Notes
 */
const notes = ref<INote[]>([
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
]);

const newNote = ref("");
const newNoteRef = ref<HTMLTextAreaElement | null>(null);
const addNote = () => {
  const newOne = {
    id: uuidv4(),
    content: newNote.value,
  };
  notes.value.unshift(newOne);
  newNote.value = "";
  newNoteRef.value?.focus();
};
</script>

<style scoped></style>
