<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Add a new note"
          ref="newNoteRef"
          v-model="localModelValue"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const localModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const newNoteRef = ref<HTMLTextAreaElement | null>(null);
const focusTextarea = () => {
  newNoteRef.value?.focus();
};

defineExpose({
  focusTextarea,
});
</script>

<style scoped></style>
