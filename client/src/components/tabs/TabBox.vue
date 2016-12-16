<template>
    <div class="tab-box" :style="style"><slot/></div>
</template>

<style>
    .tab-box {
        margin: 0;
        padding: 12px 18px;
        color: #fff;
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
