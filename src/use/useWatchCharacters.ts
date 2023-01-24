import { watch, type Ref } from "vue";

export function useWatchCharacters(
  valueToWatch: Ref<string>,
  maxChars: number
) {
  watch(valueToWatch, (newValue) => {
    if (newValue.length === maxChars) {
      alert(`Only ${maxChars} characters allowed`);
    }
  });
}
