<template>
    <div class="buig-card">
        <div v-if="$slots.header" class="buig-card__header"><slot name="header" /></div>
        <div class="buig-card__body"><slot /></div>
        <div v-if="$slots.footer" class="buig-card__footer"><slot name="footer" /></div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigCard' });
</script>

<style>
.buig-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
}
.buig-card__header {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
}
.buig-card__body {
    padding: 16px;
}
.buig-card__footer {
    padding: 12px 16px;
    border-top: 1px solid #e5e7eb;
    text-align: right;
}
</style>
