<template>
  <svg :width="size" :height="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- top brick — tallest, most dominant -->
    <rect x="18" y="2" width="44" height="27" rx="8" fill="currentColor"/>
    <!-- middle row -->
    <rect x="1"  y="35" width="34" height="19" rx="6" fill="currentColor" opacity="0.68"/>
    <rect x="45" y="35" width="34" height="19" rx="6" fill="currentColor" opacity="0.68"/>
    <!-- bottom row -->
    <rect x="0"  y="60" width="22" height="20" rx="5" fill="currentColor" opacity="0.4"/>
    <rect x="29" y="60" width="22" height="20" rx="5" fill="currentColor" opacity="0.4"/>
    <rect x="58" y="60" width="22" height="20" rx="5" fill="currentColor" opacity="0.4"/>
    <!-- + signs between bottom bricks -->
    <text x="26" y="74" font-family="system-ui" font-size="12" font-weight="900" fill="currentColor" opacity="0.95" text-anchor="middle">+</text>
    <text x="55" y="74" font-family="system-ui" font-size="12" font-weight="900" fill="currentColor" opacity="0.95" text-anchor="middle">+</text>
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
