<script setup lang="ts">
defineSlots<{
  default: () => any
}>()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <h1 class="text-2xl font-bold text-gray-800">Vue Notes</h1>
      </div>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template> 