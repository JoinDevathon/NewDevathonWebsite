<template>
    <div class="top-left">
        <slot/>
    </div>
</template>

<style>
    .top-left {
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

    @media (min-width: 720px) {
        .top-left {
            display: inline-block;
            width: 150px;
            position: absolute;
            top: 0;
            left: 0;
            margin: 12px;
        }
    }

    .top-left {
        display: inline-block;
    }
</style>

<script>
    export default {

    };
</script>
