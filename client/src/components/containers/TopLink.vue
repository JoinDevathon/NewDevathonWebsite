<template>
    <a class="top-link"><slot/></a>
</template>

<style>
    .top-link {
        width: 100%;
        padding: 4px 6px;
        margin: 1px 0;
        display: block;
        box-sizing: border-box;
        /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/

        color: #fff;
        text-decoration: none;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .top-link:hover {
        background-color: rgba(255, 255, 255, 0.4);
    }
</style>