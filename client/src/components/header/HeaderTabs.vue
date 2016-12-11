<template>
    <div class="header-tabs">
        <slot/>
    </div>
</template>

<style>
    .header-tabs .button, .header-tabs .input-container {
        margin: 4px 5px;
        display: inline-block;
        width: 100%;
    }

    .header-tabs .input {
        width: 100%;
        margin: 0;
    }

    @media(min-width: 720px) {
        .header-tabs .button, .header-tabs .input-container, .header-tabs .input {
            width: auto;
        }
    }
</style>

<style>
    .header-tabs {
        margin: 20px 0 10px;
    }
</style>
