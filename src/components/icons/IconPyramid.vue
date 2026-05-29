<template>
  <svg :width="size" :height="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- top brick — narrow apex -->
    <rect x="28" y="2" width="24" height="20" rx="6" fill="currentColor"/>
    <!-- middle row — clearly wider than top -->
    <rect x="8"  y="28" width="28" height="18" rx="5" fill="currentColor" opacity="0.7"/>
    <rect x="44" y="28" width="28" height="18" rx="5" fill="currentColor" opacity="0.7"/>
    <!-- bottom row — widest, full span -->
    <rect x="4"  y="52" width="22" height="22" rx="5" fill="currentColor" opacity="0.42"/>
    <rect x="29" y="52" width="22" height="22" rx="5" fill="currentColor" opacity="0.42"/>
    <rect x="54" y="52" width="22" height="22" rx="5" fill="currentColor" opacity="0.42"/>
    <!-- + between bottom bricks -->
    <text x="27.5" y="67" font-family="system-ui" font-size="11" font-weight="900" fill="currentColor" opacity="0.95" text-anchor="middle">+</text>
    <text x="52.5" y="67" font-family="system-ui" font-size="11" font-weight="900" fill="currentColor" opacity="0.95" text-anchor="middle">+</text>
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
