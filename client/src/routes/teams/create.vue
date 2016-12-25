<template>
    <div id="container">
        <DHeader>
            <TopLeft>
                <TopLink href="/authentication/away">
                    <TopText>Back</TopText>
                </TopLink>
            </TopLeft>
        </DHeader>
        <DBody>
            <div class="clearfix">
                <div class="twenty-five" style="text-indent: -9999px">
                    If you find this send an email to paul@burngames.net and I'll hook you up with a trophy.
                </div>
                <div class="fifty">
                    <h1 class="buttercup">Create Team</h1>

                    <div class="clearfix">
                        <div class="fifty">
                            <DInput @input="form.name = $event.target.value">Team Name</DInput>
                            <DInput @input="form.url = $event.target.value">Team URL</DInput>
                        </div>
                        <div class="fifty padded" style="text-align: center">
                            <small style="margin: 0; padding: 0">Team Avatar</small>
                            <ImageUpload @change="form.image = $event"/>
                        </div>
                    </div>

                    <DInput multiline="true" @input="form.description = $event.target.value">Team Description</DInput>

                    <DButton index="1" full="true" @click="save()">Create Team</DButton>
                </div>
            </div>
        </DBody>
    </div>
</template>

<script>
    import DHeader from '../../components/header/DevathonHeader.vue';
    import DBody from '../../components/containers/DevathonBody.vue';
    import AccountInfo from '../../components/account/AccountInfo.vue';
    import ColoredBox from '../../components/containers/ColoredBox.vue';
    import DInput from '../../components/forms/DevathonInput.vue';
    import DButton from '../../components/forms/DevathonButton.vue';
    import TopLeft from '../../components/containers/TopLeft.vue';
    import TopLink from '../../components/containers/TopLink.vue';
    import TopText from '../../components/containers/TopText.vue';
    import ImageUpload from '../../components/forms/ImageUpload.vue';
    import {devathon} from '../common';

    export default {
        data() {
            return devathon({
                form: {
                    name: '',
                    url: '',
                    image: '',
                    description: ''
                }
            });
        },
        methods: {
            save() {
                console.log(JSON.stringify(this.form));
            }
        },
        components: {
            DHeader,
            DBody,
            ColoredBox,
            DInput,
            DButton,
            TopLeft,
            TopLink,
            TopText,
            ImageUpload,
            AccountInfo
        }
    }
</script>
