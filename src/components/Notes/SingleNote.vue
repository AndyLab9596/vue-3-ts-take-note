<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-grey-light mt-2 columns is-mobile">
          <small class="column">{{ noteDated }}</small>
          <small class="column has-text-right">
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
import { useDateFormat } from "@vueuse/core";

const props = defineProps<{
  note: INote;
}>();

const contentLength = computed(() => props.note.content.length);
const noteDated = computed(() => {
  const formattedDate = new Date(parseInt(props.note.date));
  const resultDate = useDateFormat(formattedDate, "YYYY-MM-DD HH:mm:ss", {
    locales: "en-US",
  });
  return resultDate;
});

/** Modals */
const modals: IModal = reactive({
  deleteNote: false,
});
</script>

<style scoped></style>
