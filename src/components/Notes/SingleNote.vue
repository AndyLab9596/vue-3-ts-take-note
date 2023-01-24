<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>
            {{ contentLength }} character{{ contentLength > 1 ? "s" : "" }}
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item">Edit</a>
      <a class="card-footer-item" @click.prevent="onDeleteNote(note.id)"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { INote } from "@/types/NoteTypes";
import { computed } from "vue";

const props = defineProps<{
  note: INote;
}>();

const emits = defineEmits<{
  (e: "delete-note", id: INote["id"]): void;
}>();

const contentLength = computed(() => props.note.content.length);
const onDeleteNote = (id: INote["id"]) => {
  emits("delete-note", id);
};
</script>

<style scoped></style>
