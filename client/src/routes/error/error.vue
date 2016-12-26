<template>
    <div id="container">
        <DHeader>
            <Logo height="20vw"/>
        </DHeader>
        <DBody>
        <Error>
            <h2>Error Occurred: {{message}}</h2>
            <DButton href="/">Go Home</DButton>
        </Error>
        </DBody>
    </div>
</template>

<script>
    import DHeader from '../../components/header/DevathonHeader.vue';
    import Logo from '../../components/images/Logo.vue';
    import DBody from '../../components/containers/DevathonBody.vue';
    import Error from '../../components/containers/Error.vue';
    import DButton from '../../components/forms/DevathonButton.vue';
    import {devathon} from '../common';

    export default {
        data() {
            return devathon();
        },
        components: {
            DHeader,
            Logo,
            DBody,
            Error,
            DButton
        }
    }
</script>
