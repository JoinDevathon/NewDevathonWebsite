<template>
    <div class="input-container">
        <label class="label" :for="id"><slot/></label>
        <input class="input" :id="id" :value="value" @input="$emit('input', $event)"/>
    </div>
</template>

<style>
    .input-container {
        display: inline-block;
        position: relative;
    }

    .input {
        display: inline-block;
        box-sizing: border-box;
        width: 240px;
        max-width: 100%;
        padding: 8px 16px;
        margin: 15px 0;

        text-align: center;

        /*color: rgba(255, 255, 255, 0.9);*/
        font-size: 20px;
        /*background-color: rgba(255, 255, 255, 0.3);*/

        border: 3px solid rgba(0, 0, 0, 0.4);
        /*border-radius: 32px;*/
    }

    .label {
        display: inline-block;
        position: absolute;
        font-size: 14px;
        width: 100%;
    }

</style>

<script>
    export default {
        props: ['id', 'value']
    }
</script>
