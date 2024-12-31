<script setup lang="ts">
defineSlots<{
  default: () => any
}>()
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
    <header class="bg-white shadow-sm flex-none">
      <div class="container mx-auto px-4 py-3">
        <h1 class="text-2xl font-bold text-gray-800">Vue Notes</h1>
      </div>
    </header>
    <main class="flex-1 container mx-auto p-4 overflow-hidden">
      <slot />
    </main>
  </div>
</template> 