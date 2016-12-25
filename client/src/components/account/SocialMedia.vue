<template>
    <div class="account-media">
        <LoaderIcon v-if="loading"/>
        <template v-else>
            <Error v-if="error" style="margin-bottom: 15px">{{error}}</Error>
            <template v-if="edit === false">
                <DButton v-if="user.beam" :href="'https://beam.pro/' + user.beam" target="_blank" :index="index">
                    <BeamLogo/>/ {{user.beam}}
                </DButton>
                <DButton v-if="user.twitter" :href="'https://twitter.com/' + user.twitter" target="_blank" :index="index">
                    <TwitterLogo class="twitter-logo"/>/ {{user.twitter}}
                </DButton>
                <DButton v-if="user.twitch" :href="'https://twitch.tv/' + user.twitch" target="_blank" :index="index">
                    <TwitchLogo/>/ {{user.twitch}}
                </DButton>
            </template>
            <template v-else>
                <DInput :value="user.beam" id="beam" @input="input('beam', $event)">Beam</DInput>
                <DInput :value="user.twitter" id="twitter" @input="input('twitter', $event)">Twitter</DInput>
                <DInput :value="user.twitch" id="twitch" @input="input('twitch', $event)">Twitch</DInput>
            </template>
            <DButton @click="save()" index="2" box="true" full="true" size="thin">
                <template v-if="edit === false">Edit Media</template>
                <template v-else>Save</template>
            </DButton>
        </template>
    </div>
</template>

<style>
    .account-media a.button {
        width: 100%;
        display: block;
        margin: 0 0 6px;
    }

    .account-media .twitter-logo {
    }
</style>

<script>
    import 'whatwg-fetch';

    import BeamLogo from '../../components/images/BeamLogo.vue';
    import TwitterLogo from '../../components/images/TwitterLogo.vue';
    import TwitchLogo from '../../components/images/TwitchLogo.vue'
    import DButton from '../../components/forms/DevathonButton.vue';
    import DInput from '../../components/forms/DevathonInput.vue';
    import LoaderIcon from '../../components/images/LoaderIcon.vue';
    import Error from '../../components/containers/Error.vue';

    import {request, NetworkError} from '../../components/helpers/network';

    export default {
        props: ['user', 'index'],
        methods: {
            input(type, event) {
                this.user[type] = event.target.value;
            },
            async save() {
                if (this.edit) {
                    this.loading = true;
                    try {
                        await request('/api/profile/media/edit', {
                            method: 'POST',
                            body: JSON.stringify({
                                beam: this.user.beam,
                                twitch: this.user.twitch,
                                twitter: this.user.twitter
                            })
                        }); // we don't care about the return, if it's not an error
                        this.error = null;
                    } catch (err) {
                        if (err instanceof NetworkError) {
                            this.error = err.message;
                        } else {
                            console.error(err);
                            this.error = 'An unknown server error occurred.';
                        }
                    }
                    this.loading = this.edit = false;
                } else {
                    this.edit = true;
                }
            }
        },
        data() {
            return {
                error: null,
                edit: false,
                loading: false
            }
        },
        components: {
            BeamLogo,
            TwitterLogo,
            TwitchLogo,
            DButton,
            DInput,
            LoaderIcon,
            Error
        }
    }
</script>
