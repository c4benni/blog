<template>
  <svg width="1em" height="1em" viewBox="0 0 256 256" class="spin">
    <path
      fill="currentColor"
      d="M134 32v32a6 6 0 0 1-12 0V32a6 6 0 0 1 12 0Zm39.3 56.7a5.8 5.8 0 0 0 4.2-1.7l22.6-22.6a6 6 0 0 0-8.5-8.5L169 78.5a6.1 6.1 0 0 0 0 8.5a5.9 5.9 0 0 0 4.3 1.7ZM224 122h-32a6 6 0 0 0 0 12h32a6 6 0 0 0 0-12Zm-46.5 47a6 6 0 0 0-8.5 8.5l22.6 22.6a6 6 0 0 0 4.3 1.8a5.8 5.8 0 0 0 4.2-1.8a5.9 5.9 0 0 0 0-8.5ZM128 186a6 6 0 0 0-6 6v32a6 6 0 0 0 12 0v-32a6 6 0 0 0-6-6Zm-49.5-17l-22.6 22.6a5.9 5.9 0 0 0 0 8.5a5.8 5.8 0 0 0 4.2 1.8a6 6 0 0 0 4.3-1.8L87 177.5a6 6 0 0 0-8.5-8.5ZM70 128a6 6 0 0 0-6-6H32a6 6 0 0 0 0 12h32a6 6 0 0 0 6-6Zm-5.6-72.1a6 6 0 0 0-8.5 8.5L78.5 87a5.8 5.8 0 0 0 4.2 1.7A5.9 5.9 0 0 0 87 87a6.1 6.1 0 0 0 0-8.5Z"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SpinnerIcon",
});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0) translateZ(0);
  }
  to {
    transform: rotate(360deg) translateZ(0);
  }
}

.spin {
  animation: spin 1100ms linear infinite;
  color: var(--surface-text);
  --surface-text-alpha: 0.7;
}
</style>
