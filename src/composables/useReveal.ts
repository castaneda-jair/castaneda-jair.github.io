import { onMounted, onBeforeUnmount } from 'vue';
import { initReveal } from '../scripts/reveal';
export function useReveal() {
 let cleanup: (() => void) | undefined;
 onMounted(() => { cleanup = initReveal(); });
 onBeforeUnmount(() => cleanup?.());
}
