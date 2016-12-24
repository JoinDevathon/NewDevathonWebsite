<template>
    <div class="top-icon">
        <slot/>
    </div>
</template>

<style>
    .top-icon {
        float: right;
        display: inline-block;
        box-sizing: border-box;
        height: 30px;
        text-align: right;
        margin: 0 0 0 4px;
        padding: 6px;
        background-color: rgba(255, 255, 255, 0.2);
    }
</style>