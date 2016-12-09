<template>
    <div class="trophy">
        <object :data="url" type="image/svg+xml"></object>
        <span>{{trophy.name}}</span>
    </div>
</template>

<style>
    .trophy {
        max-width: 100px;
        margin: 10px 20px;
        display: inline-block;
        vertical-align: top;
        text-align: center;
    }
</style>

<script>
    export default {
        props: [
            'trophy'
        ],
        computed: {
            url: function () {
                return `/public/images/${this.trophy.filename}.svg`;
            }
        }
    }
</script>
