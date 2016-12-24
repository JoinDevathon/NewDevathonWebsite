<template>
    <div class="trophy-case">
        <slot/>
    </div>
</template>

<style>
    .trophy-case {
        width: auto;
        display: inline-block;

        padding: 10px;

        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 4px;
    }
</style>