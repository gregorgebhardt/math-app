<template>
  <svg :width="size" :height="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- all bricks 20×18, rows widen toward base -->
    <!-- top: 1 brick, 20px wide, centered -->
    <rect x="30" y="2"  width="20" height="18" rx="5" fill="currentColor"/>
    <!-- middle: 2 bricks, spanning 60px total -->
    <rect x="15" y="26" width="20" height="18" rx="5" fill="currentColor" opacity="0.7"/>
    <rect x="45" y="26" width="20" height="18" rx="5" fill="currentColor" opacity="0.7"/>
    <!-- bottom: 3 bricks, spanning 80px total -->
    <rect x="0"  y="50" width="20" height="18" rx="5" fill="currentColor" opacity="0.42"/>
    <rect x="30" y="50" width="20" height="18" rx="5" fill="currentColor" opacity="0.42"/>
    <rect x="60" y="50" width="20" height="18" rx="5" fill="currentColor" opacity="0.42"/>
    <!-- + between bottom bricks -->
    <text x="25" y="63" font-family="system-ui" font-size="11" font-weight="900" fill="currentColor" opacity="0.95" text-anchor="middle">+</text>
    <text x="55" y="63" font-family="system-ui" font-size="11" font-weight="900" fill="currentColor" opacity="0.95" text-anchor="middle">+</text>
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
