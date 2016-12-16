<template>
    <button class="tab-title" :style="style" @click="$emit('click')"><slot/></button>
</template>

<style>
    .tab-title {
        border: 0;
        width: auto;
        cursor: pointer;
        display: inline-block;

        color: #fff;
        font-size: 26px;

        margin: 0;
        padding: 12px 18px;
    }
</style>

<script>
    import {colors} from '../helpers/colors';

    export default {
        props: {
            index: {default: 0}
        },
        data() {
            return {
                style: {
                    background: colors[this.index]
                }
            };
        }
    }
</script>