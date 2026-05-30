<template>
  <svg :width="size" :height="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="36" fill="currentColor" opacity="0.1"/>
    <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="4" opacity="0.85"/>
    <!-- Cardinal marks -->
    <line x1="40" y1="6"  x2="40" y2="13" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
    <line x1="74" y1="40" x2="67" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
    <line x1="40" y1="74" x2="40" y2="67" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
    <line x1="6"  y1="40" x2="13" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
    <!-- Hour hand at 3:00 -->
    <line x1="40" y1="40" x2="63" y2="40" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" opacity="0.9"/>
    <!-- Minute hand pointing up (:00) -->
    <line x1="40" y1="40" x2="40" y2="11" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
    <circle cx="40" cy="40" r="3.5" fill="currentColor" opacity="0.9"/>
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
