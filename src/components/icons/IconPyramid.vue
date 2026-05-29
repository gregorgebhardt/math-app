<template>
  <svg :width="size" :height="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- top brick -->
    <rect x="24" y="4" width="32" height="22" rx="5" fill="currentColor" opacity="1"/>
    <!-- middle row -->
    <rect x="8"  y="30" width="28" height="20" rx="5" fill="currentColor" opacity="0.75"/>
    <rect x="44" y="30" width="28" height="20" rx="5" fill="currentColor" opacity="0.75"/>
    <!-- bottom row -->
    <rect x="0"  y="54" width="22" height="22" rx="5" fill="currentColor" opacity="0.5"/>
    <rect x="29" y="54" width="22" height="22" rx="5" fill="currentColor" opacity="0.5"/>
    <rect x="58" y="54" width="22" height="22" rx="5" fill="currentColor" opacity="0.5"/>
    <!-- + signs between bottom row -->
    <text x="25.5" y="69" font-family="system-ui" font-size="10" font-weight="900" fill="currentColor" opacity="0.9" text-anchor="middle">+</text>
    <text x="54.5" y="69" font-family="system-ui" font-size="10" font-weight="900" fill="currentColor" opacity="0.9" text-anchor="middle">+</text>
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
