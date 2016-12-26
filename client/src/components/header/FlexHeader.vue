<template>
    <div class="flex-header">
        <slot/>
    </div>
</template>

<style>
    .flex-header {
        width: 1000px;
        max-width: 100%;
        margin: 0 auto;
    }

    @media (min-width: 1000px) {
        .flex-header {
            display: flex;
        }
    }
</style>