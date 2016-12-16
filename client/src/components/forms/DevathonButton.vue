<template>
    <a v-if="href" :href="href" :class="classes"><slot/></a>
    <button v-else :class="classes" @click="$emit('click')"><slot/></button>
</template>

<style>
    .button {
        display: inline-block;
        box-sizing: border-box;
        width: auto;
        padding: 8px 16px;
        margin: 15px 0;

        cursor: pointer;

        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        font-size: 20px;
        background-color: rgba(255, 255, 255, 0.3);

        border: 3px solid rgba(255, 255, 255, 0.2);
        border-radius: 32px;

        transition: color 0.2s ease-out, border-color 0.2s ease-out, background-color 0.2s ease-out;
    }

    .button.thin {
        padding: 2px 4px;
    }

    .button:hover {
        color: rgba(255, 255, 255, 0.8);
        background-color: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
    }

    .button svg {
        height: 20px;
        margin: 0 4px -3px;
    }

</style>

<script>
    export default {
        props: [
            'href',
            'size'
        ],
        data() {
            return {
                classes: {
                    'button': true,
                    'thin': this.size === 'thin'
                }
            }
        }
    }
</script>
