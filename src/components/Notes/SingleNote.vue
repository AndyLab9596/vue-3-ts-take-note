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
      <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">
        Edit
      </RouterLink>
      <a class="card-footer-item" @click.prevent="modals.deleteNote = true"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="props.note.id"
    />
  </div>
</template>

<script setup lang="ts">
import type { INote, IModal } from "@/types/NoteTypes";
import { computed, reactive } from "vue";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";

const props = defineProps<{
  note: INote;
}>();

const contentLength = computed(() => props.note.content.length);

/** Modals */
const modals: IModal = reactive({
  deleteNote: false,
});
</script>

<style scoped></style>
