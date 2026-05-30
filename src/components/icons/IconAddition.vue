<template>
  <svg :width="size" :height="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- row 1: all filled (complete equation) -->
    <rect x="2"  y="6"  width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <rect x="32" y="6"  width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <rect x="60" y="6"  width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <text x="26" y="19" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">+</text>
    <text x="55" y="19" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">=</text>

    <!-- row 2: answer is blank -->
    <rect x="2"  y="32" width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <rect x="32" y="32" width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <rect x="60" y="32" width="18" height="18" rx="4" fill="currentColor" opacity="0.18"/>
    <rect x="60" y="32" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.9"/>
    <text x="26" y="45" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">+</text>
    <text x="55" y="45" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">=</text>
    <text x="69" y="46" font-family="system-ui" font-size="12" font-weight="800" fill="currentColor" opacity="0.9" text-anchor="middle">?</text>

    <!-- row 3: right operand is blank -->
    <rect x="2"  y="58" width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <rect x="32" y="58" width="18" height="18" rx="4" fill="currentColor" opacity="0.18"/>
    <rect x="32" y="58" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.9"/>
    <rect x="60" y="58" width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <text x="26" y="71" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">+</text>
    <text x="55" y="71" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">=</text>
    <text x="41" y="72" font-family="system-ui" font-size="12" font-weight="800" fill="currentColor" opacity="0.9" text-anchor="middle">?</text>
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
