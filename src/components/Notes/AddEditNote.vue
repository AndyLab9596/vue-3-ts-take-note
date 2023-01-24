<template>
  <div class="card p-4 mb-5" :class="`has-background-${props.bgColor}-dark`">
    <label class="label has-text-white" v-if="props.label">
      {{ props.label }}
    </label>

    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          :placeholder="props.placeHolder"
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
  bgColor: string;
  placeHolder: string;
  label?: string;
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
