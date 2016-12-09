<template>
    <div class="trophy-case">
        <slot/>
    </div>
</template>

<style>
    .trophy-case {
        width: auto;
        display: inline-block;

        margin: 20px auto;
        padding: 10px 10px 0;

        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 4px;
    }
</style>