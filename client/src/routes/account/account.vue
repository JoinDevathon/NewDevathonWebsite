<template>
    <div id="container">
        <DHeader>
            <AccountInfo :account="d.account"/>
            <GithubAvatar size="70" :id="d.user.github_id" rounded="true"/>
            <h2 class="account-name">{{d.user.username}}</h2>
        </DHeader>
        <DBody>
            <div class="clearfix">
                <div class="fifty">
                    <ColoredBox title="Trophy Case" index="1">
                        <TrophyCase>
                            <template v-for="trophy in d.user.trophies">
                                <Trophy :trophy="trophy"/>
                            </template>
                            <template v-if="d.user.trophies.length === 0">
                                <h2>No trophies have been earned yet.</h2>
                                <p v-if="d.account.username === d.user.username">To get an easy trophy, link your Twitter and Tweet <b>#devathon</b>!</p>
                            </template>
                        </TrophyCase>
                    </ColoredBox>
                    <div class="clearfix">
                        <div class="fifty">
                            <ColoredBox title="Teams" index="0">
                                <div class="account-teams">
                                    <DButton v-if="d.account.username === d.user.username"
                                             index="0"
                                             box="true"
                                             full="true"
                                             href="/teams/create"
                                             size="thin">
                                        Create Team
                                    </DButton>
                                </div>
                            </ColoredBox>
                        </div>
                        <div class="fifty">
                            <ColoredBox title="Social Media" index="2">
                                <div class="account-media">
                                    <template v-if="edit === false">
                                        <DButton v-if="d.user.beam" :href="'https://beam.pro/' + d.user.beam" target="_blank">
                                            <BeamLogo/>
                                            {{d.user.beam}}
                                        </DButton>
                                        <DButton v-if="d.user.twitter" :href="'https://twitter.com/' + d.user.twitter" target="_blank">
                                            {{d.user.twitter}}
                                        </DButton>
                                        <DButton v-if="d.user.twitch" :href="'https://twitch.tv/' + d.user.twitch">{{d.user.twitch}}
                                        </DButton>
                                    </template>
                                    <template v-else>
                                        <DInput :value="d.user.beam" id="beam" @input="input('beam', $event)">Beam</DInput>
                                        <DInput :value="d.user.twitter" id="twitter" @input="input('twitter', $event)">Twitter</DInput>
                                        <DInput :value="d.user.twitch" id="twitch" @input="input('twitch', $event)">Twitch</DInput>
                                    </template>
                                    <DButton @click="edit = !edit" index="2" box="true" full="true" size="thin">
                                        <template v-if="edit === false">
                                            Edit Media
                                        </template>
                                        <template v-else>
                                            Save
                                        </template>
                                    </DButton>
                                </div>
                            </ColoredBox>
                        </div>
                    </div>
                </div>
                <div class="fifty">
                    <ColoredBox title="Contest Entries" index="3">
                        <h3>Contest Name <DButton index="3" size="thin">More Info</DButton></h3>
                        <small>Contest details including what the theme is and what they should've entered.</small>
                        <hr/>
                        <h3>Contest Name <DButton index="3" size="thin">More Info</DButton></h3>
                        <small>Contest details including what the theme is and what they should've entered.</small>
                        <hr/>
                        <h3>Contest Name <DButton index="3" size="thin">More Info</DButton></h3>
                        <small>Contest details including what the theme is and what they should've entered.</small>
                        <hr/>
                        <h3>Contest Name <DButton index="3" size="thin">More Info</DButton></h3>
                        <small>Contest details including what the theme is and what they should've entered.</small>
                        <hr/>
                        <h3>Contest Name <DButton index="3" size="thin">More Info</DButton></h3>
                        <small>Contest details including what the theme is and what they should've entered.</small>
                        <hr/>
                        <h3>Contest Name <DButton index="3" size="thin">More Info</DButton></h3>
                        <small>Contest details including what the theme is and what they should've entered.</small>
                        <hr/>
                    </ColoredBox>
                </div>
            </div>
        </DBody>
    </div>
</template>

<style>
    .account-name {
        margin: 5px 0 10px;
    }

    .account-teams {
        /*text-align: center;*/
    }

    .trophy-case-title {
        margin-bottom: 5px;
    }

    .account-media .input {
        display: block;
        width: 100%;
    }
</style>

<script>
    import DHeader from '../../components/header/DevathonHeader.vue';
    import DBody from '../../components/containers/DevathonBody.vue';
    import TrophyCase from '../../components/contests/TrophyCase.vue';
    import Trophy from '../../components/contests/Trophy.vue';
    import GithubAvatar from '../../components/images/GithubAvatar.vue';
    import AccountInfo from '../../components/account/AccountInfo.vue';
    import DButton from '../../components/forms/DevathonButton.vue';
    import DInput from '../../components/forms/DevathonInput.vue';
    import Tabs from '../../components/header/HeaderTabs.vue';
    import BeamLogo from '../../components/images/BeamLogo.vue';
    import ColoredBox from '../../components/containers/ColoredBox.vue';
    import {devathon} from '../common';

    export default {
        data() {
            return {
                d: devathon(),
                edit: false,
                tab: 'entries'
            };
        },

        methods: {
            input(type, event) {
                this.d.user[type] = event.target.value;
            }
        },

        components: {
            DHeader,
            DBody,
            DButton,
            Tabs,
            TrophyCase,
            Trophy,
            GithubAvatar,
            BeamLogo,
            AccountInfo,
            ColoredBox,
            DInput
        },

    }
</script>
