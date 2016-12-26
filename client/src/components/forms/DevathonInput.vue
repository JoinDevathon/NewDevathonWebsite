<template>
    <div class="input-container">
        <label class="label" :for="id"><slot/></label>
        <input v-if="!multiline" class="input" :id="id" :value="value" @input="$emit('input', $event)"/>
        <textarea v-else class="input" :id="id" @input="$emit('input', $event)">{{value}}</textarea>
        <small class="sub">{{sub || ''}}</small>
    </div>
</template>

<style>
    .input-container {
        display: block;
    }

    .input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        padding: 10px;
        margin: 0;

        font-size: 14px;

        border-radius: 10px;
        border: 2px solid rgba(0, 0, 0, 0.4);
    }

    .label {
        margin: 0;
        padding: 0;
        font-size: 14px;
        width: 100%;
    }

    .sub {
        color: #555;
        margin-bottom: 10px;
        display: inline-block;
        font-family: monospace;
        font-size: 12px;
    }

</style>

<script>
    export default {
        props: ['id', 'value', 'multiline', 'sub']
    }
</script>
