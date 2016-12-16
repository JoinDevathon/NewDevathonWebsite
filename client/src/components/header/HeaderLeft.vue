<template>
    <div class="header-left">
        <slot/>
    </div>
</template>

<style>
    .header-left {
        text-align: left;
    }

    @media(min-width: 720px) {
        .header-left {
            margin-right: 25px;
            min-width: 200px;
        }
    }
</style>