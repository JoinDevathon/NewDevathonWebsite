<template>
    <img class="gh-avatar" :src="src" :style="style"/>
</template>

<style>
    .gh-avatar {
        border: 4px solid rgba(255, 255, 255, 0.4);
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
    }
</style>

<script>
    export default {
        props: ['username', 'size', 'marginBottom', 'rounded'],
        computed: {
            style: function() {
                return {
                    borderWidth: `${this.size / 20}px`,
                    marginTop: `${this.size / 5}px`,
                    marginBottom: this.marginBottom || `${this.size / 5}px`,
                    borderRadius: this.rounded ? `${this.size / 2}px` : '4px',
                    width: `${this.size}px`,
                    height: `${this.size}px`
                };
            },
            src: function() {
                return `https://github.com/${this.username}.png?size=${this.size}`
            }
        }
    }
</script>

