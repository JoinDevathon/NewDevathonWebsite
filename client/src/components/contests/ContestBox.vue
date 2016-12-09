<template>
    <div class="contest" :style="contestStyles">
        <div class="content">
            <h3 class="title">{{title}}</h3>
            <span class="description">{{description}}</span>
        </div>
        <div class="status">
            <BoxInformation>Status: {{status}}</BoxInformation>
        </div>
        <div class="button-container">
            <DButton class="button" :href="href">More Info</DButton>
        </div>
    </div>
</template>

<style>
    .contest {
        margin: 10px 20px;

        color: #fff;

        display: inline-block;
        max-width: 300px;
    }

    .content {
        padding: 20px 10px;
    }

    .title {
        font-size: 26px;
        margin-bottom: 10px;
    }

    .description, .status {
        color: #eee;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
    }

    .button-container {
        padding: 10px;
    }

    .button {
        font-size: 20px;
        width: 100%;
    }

</style>

<script>
    import DButton from '../forms/DevathonButton.vue';
    import BoxInformation from '../containers/BoxInformation.vue';

    function shade(color, percent) {
        if (!color) {
            return '#fff';
        }

        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        let RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        let GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        let BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    const colors = [
        '#A770F3',
        '#00aeb0',
        '#40c9a2',
        '#ff6666',
        '#345995'
    ];

    export default {
        props: {
            index: {default: 0},
            title: {default: 'Default Title and Year'},
            description: {default: 'Default description of this Devathon contest, things that happened maybe the winner?'},
            status: {default: 'Planned'},
            href: {},
        },
        data() {
            return {
                color: '#fff',
                shadow: '0 0 #fff',
                contestStyles: {
                    backgroundColor: colors[this.index % colors.length],
                    boxShadow: `6px 6px ${shade(colors[this.index % colors.length], -30)}`
                }
            };
        },
        components: {
            DButton,
            BoxInformation
        }
    }


</script>
