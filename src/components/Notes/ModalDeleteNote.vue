<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalDeleteRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          class="delete"
          aria-label="close"
          @click="onCancelModal"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you wantt delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="onCancelModal">Cancel</button>
        <button class="button is-danger" @click="onDeleteNote">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { INote } from "@/types/NoteTypes";
import { useStoreNotes } from "@/stores/storeNotes";

/**Store */
const storeNotes = useStoreNotes();

const props = defineProps<{
  noteId: INote["id"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

/** Button's functionalities */
const onCancelModal = () => {
  emits("update:modelValue", false);
};

const onDeleteNote = () => {
  storeNotes.deleteNote(props.noteId);
};

/** Click outside control */
const modalDeleteRef = ref<HTMLDivElement | null>(null);
onClickOutside(modalDeleteRef, () => onCancelModal());

/** Keyboard control */
const handleKeyboard = (event: KeyboardEvent) => {
  if (event.key === "Escape") onCancelModal();
};

onMounted(() => {
  document.addEventListener("keyup", handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyboard);
});
</script>

<style scoped></style>
