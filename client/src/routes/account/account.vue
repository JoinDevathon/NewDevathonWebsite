<template>
    <div id="container">
        <DHeader>
            <AccountInfo :account="account"/>
            <GithubAvatar size="150" :id="user.github_id" rounded="true" marginBottom="10px" marginTop="10px"/>
            <h2 class="account-name">{{user.username}}</h2>
        </DHeader>
        <DBody>
            <div class="clearfix">
                <div class="fifty">
                    <ColoredBox title="Trophy Case" index="1">
                        <TrophyCase>
                            <template v-for="trophy in user.trophies">
                                <Trophy :trophy="trophy"/>
                            </template>
                            <template v-if="user.trophies.length === 0">
                                <h2>No trophies have been earned yet.</h2>
                                <p v-if="account.id === user.id">To get an easy trophy, link your Twitter and Tweet <b>#devathon</b>!</p>
                            </template>
                        </TrophyCase>
                    </ColoredBox>
                    <div class="clearfix">
                        <div class="fifty">
                            <ColoredBox title="Teams" index="0">
                                <div class="account-teams">
                                    <template v-for="team in user.teams">
                                        <a :href="`/teams/${team.url}`">
                                            <img :src="`/teams/${team.url}.png`" :alt="team.name" :title="team.name" class="team-icon"/>
                                        </a>
                                    </template>
                                    <DButton v-if="account.id === user.id"
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
                                <SocialMedia :user="user" :account="account" index="2"/>
                            </ColoredBox>
                        </div>
                    </div>
                </div>
                <div class="fifty">
                    <div class="clearfix">
                        <div class="fifty padded">
                            <ContestBox info="Score: 25.6/30" width="100%"/>
                        </div>
                        <div class="fifty padded">
                            <ContestBox info="Score: 25.6/30" width="100%" index="1"/>
                        </div>
                    </div>
                </div>
            </div>
        </DBody>
    </div>
</template>

<style>
    .account-name {
        margin: 0;
    }

    .account-teams {
        text-align: center;
    }

    .team-icon {
        height: 40px;
    }
</style>

<script>
    import DHeader from '../../components/header/DevathonHeader.html';
    import DBody from '../../components/containers/DevathonBody.html';
    import TrophyCase from '../../components/contests/TrophyCase.vue';
    import Trophy from '../../components/contests/Trophy.vue';
    import GithubAvatar from '../../components/images/GithubAvatar.html';
    import AccountInfo from '../../components/account/AccountInfo.html';
    import DButton from '../../components/forms/DevathonButton.html';
    import DInput from '../../components/forms/DevathonInput.vue';
    import Tabs from '../../components/header/HeaderTabs.html';
    import BeamLogo from '../../components/images/BeamLogo.vue';
    import ColoredBox from '../../components/containers/ColoredBox.vue';
    import ContestBox from '../../components/contests/ContestBox.html';
    import SocialMedia from '../../components/account/SocialMedia.vue';
    import {devathon} from '../common';

    export default {
        data() {
            return devathon();
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
            ContestBox,
            SocialMedia,
            DInput
        },

    }
</script>
