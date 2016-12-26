<template>
    <div class="top-right">
        <slot/>
    </div>
</template>

<style>
    .top-right {
        display: block;
        border: 0;
        width: 100%;
        font-size: 16px;
        color: #fff;

        margin: 14px 2px 18px;
        padding: 4px 0;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.2);
        text-decoration: none;
    }

    @media (min-width: 1000px) {
        .top-right {
            display: inline-block;
            width: auto;
            position: absolute;
            top: 0;
            right: 0;
            margin: 12px;
        }
    }
</style>

<script>
    export default {

    };
</script>
