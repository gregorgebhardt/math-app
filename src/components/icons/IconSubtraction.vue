<template>
  <svg :width="size" :height="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- three equation rows -->
    <!-- row 1: 12 − 5 = 7 -->
    <rect x="2"  y="6"  width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <rect x="31" y="6"  width="18" height="18" rx="4" fill="currentColor" opacity="0.55"/>
    <rect x="60" y="6"  width="18" height="18" rx="4" fill="currentColor" opacity="0.75"/>
    <text x="24" y="19" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">−</text>
    <text x="53" y="19" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">=</text>

    <!-- row 2 -->
    <rect x="2"  y="31" width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <rect x="31" y="31" width="18" height="18" rx="4" fill="currentColor" opacity="0.55"/>
    <!-- answer box highlighted -->
    <rect x="60" y="31" width="18" height="18" rx="4" fill="currentColor" opacity="0.25"/>
    <rect x="60" y="31" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.9"/>
    <text x="24" y="44" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">−</text>
    <text x="53" y="44" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">=</text>
    <!-- question mark in open box -->
    <text x="69" y="45" font-family="system-ui" font-size="12" font-weight="800" fill="currentColor" opacity="0.85" text-anchor="middle">?</text>

    <!-- row 3 -->
    <rect x="2"  y="56" width="18" height="18" rx="4" fill="currentColor" opacity="0.9"/>
    <!-- left operand open box -->
    <rect x="31" y="56" width="18" height="18" rx="4" fill="currentColor" opacity="0.25"/>
    <rect x="31" y="56" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.9"/>
    <rect x="60" y="56" width="18" height="18" rx="4" fill="currentColor" opacity="0.75"/>
    <text x="24" y="69" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">−</text>
    <text x="53" y="69" font-family="system-ui" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">=</text>
    <text x="40" y="70" font-family="system-ui" font-size="12" font-weight="800" fill="currentColor" opacity="0.85" text-anchor="middle">?</text>
  </svg>
</template>

<script setup>
defineProps({ size: { type: Number, default: 40 } })
</script>
