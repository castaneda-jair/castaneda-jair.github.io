<template>

<div class="media-frame relative border border-line p-2.5">
  <span aria-hidden="true" class="corner -top-px -left-px border-t border-l"></span>
  <span aria-hidden="true" class="corner -top-px -right-px border-t border-r"></span>
  <span aria-hidden="true" class="corner -right-px -bottom-px border-r border-b"></span>
  <span aria-hidden="true" class="corner -bottom-px -left-px border-b border-l"></span>
  <slot />
</div>

</template>
<style>
  .media-frame {
    background-image: repeating-linear-gradient(-45deg, rgb(255 255 255 / 0.025) 0 1px, transparent 1px 4px);
  }
  .corner {
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: var(--color-rule);
  }
  .media-frame img,
  .media-frame iframe,
  .media-frame video {
    filter: drop-shadow(16px 16px 20px #000);
  }
</style>
