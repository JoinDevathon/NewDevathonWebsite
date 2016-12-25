<template>
    <div class="colored-box" :style="styles">
        <h4 class="colored-box-title" :style="titleStyles" v-if="title">{{title}}</h4>
        <div class="colored-box-padded">
            <slot/>
        </div>
    </div>
</template>

<style>
    .colored-box {
        border-radius: 8px;
        border: 3px solid #fff;
        background-color: #fff;

        margin: 10px;
    }

    .colored-box-title {
        font-weight: 300;
        text-align: center;
        padding: 10px 16px;
        color: #fff;
    }

    .colored-box-padded {
        padding: 8px;
    }
</style>

<script>
    import {colors} from '../helpers/colors';

    export default {
        props: ['index', 'title'],
        computed: {
            styles() {
                return {
                    borderColor: colors[+this.index % colors.length]
                };
            },
            titleStyles() {
                return {
                    backgroundColor: colors[+this.index % colors.length]
                };
            }
        }
    }
</script>