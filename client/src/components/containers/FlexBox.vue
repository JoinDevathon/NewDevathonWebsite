<template>
    <div class="flexbox">
        <slot/>
    </div>
</template>

<style>
    .flexbox {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
</style>