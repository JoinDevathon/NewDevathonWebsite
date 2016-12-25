<template>
    <div class="image-upload">
        <img v-if="image" :src="image" class="image-upload-image"/>
        <div v-else class="image-upload-placeholder">
            Upload
        </div>
        <input class="image-upload-input" type="file" accept="image/gif, image/jpeg, image/png" @change="change($event)">
    </div>
</template>

<style>
    .image-upload {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        border: 1px solid #ccc;
    }

    .image-upload-image {
        display: block;
        height: 100px;
        width: 100px;
        margin: 0 auto;
    }

    .image-upload-placeholder {
        height: 100%;
        width: 100%;

        font-family: sans-serif;
        vertical-align: middle;
        line-height: 100px;

        background-color: #ccc;
    }

    .image-upload-input {
        cursor: pointer;
        position: relative;
        top: -100px;
        width: 100px;
        height: 100px;
        opacity: 0;
    }
</style>

<script>
    export default {
        data() {
            return {
                image: null
            };
        },
        methods: {
            change(event) {
                const files = event.target.files;
                if (files.length > 0) {
                    const reader = new FileReader();

                    reader.onload = (file) => {
                        const image = new Image();
                        image.onload = () => {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            canvas.width = canvas.height = 100;
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(image, 0, 0, 100, 100);

                            this.image = canvas.toDataURL('image/png');

                            this.$emit('change', this.image);
                        };
                        image.src = file.target.result;
                    };

                    reader.readAsDataURL(files[0]);
                }
            }
        }
    }
</script>
