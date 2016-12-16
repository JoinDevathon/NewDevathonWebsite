<template>
    <div id="container">
        <DHeader>
            <TopLeft>
                <Logo height="80px" style="padding: 0 0"/>
                <TopLink href="/">
                    <TopText>Home</TopText>
                    <TopIcon>
                        <HomeIcon/>
                    </TopIcon>
                </TopLink>
                <TopLink href="/authentication/logout">
                    <TopText>Log Out</TopText>
                    <TopIcon>
                        <LogOutIcon/>
                    </TopIcon>
                </TopLink>
            </TopLeft>
            <FlexHeader>
                <HeaderLeft>
                    <GithubAvatar size="200" :username="d.user.username" style="margin-top:0;margin-bottom:0"/>
                    <h2 class="account-name">{{d.user.username}}</h2>
                    <div class="account-teams">
                        <DButton v-if="d.user.teams.length === 0" size="thin" style="margin-top: 0; width: 100%" href="/teams/create">
                            Create Team
                        </DButton>
                    </div>
                </HeaderLeft>
                <HeaderRight style="width: 100%">
                    <!--<p class="trophy-case-title">Trophies</p>-->
                    <TrophyCase>
                        <template v-for="trophy in d.user.trophies">
                            <Trophy :trophy="trophy"/>
                        </template>
                    </TrophyCase>
                </HeaderRight>
                <HeaderLeft style="min-width: 280px">
                    <ul>
                        <li>User for 1 year</li>
                        <li>50 Profile Views</li>
                        <li>Last seen: 1 hr ago</li>
                    </ul>
                </HeaderLeft>
            </FlexHeader>
            <hr/>
            <Tabs>
                <div class="account-media">
                    <template v-if="edit === false">
                        <DButton v-if="d.user.beam" :href="'https://beam.pro/' + d.user.beam" target="_blank">
                            <BeamLogo/>
                            {{d.user.beam}}
                        </DButton>
                        <DButton v-if="d.user.twitter" :href="'https://twitter.com/' + d.user.twitter" target="_blank">{{d.user.twitter}}</DButton>
                        <DButton v-if="d.user.twitch" :href="'https://twitch.tv/' + d.user.twitch">{{d.user.twitch}}</DButton>
                    </template>
                    <template v-else>
                        <DInput :value="d.user.beam" id="beam" @input="input('beam', $event)">Beam</DInput>
                        <DInput :value="d.user.twitter" id="twitter" @input="input('twitter', $event)">Twitter</DInput>
                        <DInput :value="d.user.twitch" id="twitch" @input="input('twitch', $event)">Twitch</DInput>
                    </template>
                    <DButton @click="edit = !edit">
                        <template v-if="edit === false">
                            Edit Media
                        </template>
                        <template v-else>
                            Save
                        </template>
                    </DButton>
                </div>
            </Tabs>
        </DHeader>
        <DBody>
            <h2>Contest Entries</h2>
            <p>Contains a list of entries this person has made.</p>

            <hr/>
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

    .account-media .button, .account-media .input {
        display: block;
        width: 100%;
    }
</style>

<script>
    import DHeader from '../../components/header/DevathonHeader.vue';
    import HeaderLeft from '../../components/header/HeaderLeft.vue';
    import HeaderRight from '../../components/header/HeaderRight.vue';
    import FlexHeader from '../../components/header/FlexHeader.vue';
    import DBody from '../../components/containers/DevathonBody.vue';
    import Logo from '../../components/images/Logo.vue';
    import TrophyCase from '../../components/contests/TrophyCase.vue';
    import Trophy from '../../components/contests/Trophy.vue';
    import GithubAvatar from '../../components/images/GithubAvatar.vue';
    import TopLeft from '../../components/containers/TopLeft.vue';
    import TopLink from '../../components/containers/TopLink.vue';
    import AccountInfo from '../../components/account/AccountInfo.vue';
    import HomeIcon from '../../components/images/HomeIcon.vue';
    import LogOutIcon from '../../components/images/LogOutIcon.vue';
    import TopIcon from '../../components/containers/TopIcon.vue';
    import TopText from '../../components/containers/TopText.vue';
    import DButton from '../../components/forms/DevathonButton.vue';
    import DInput from '../../components/forms/DevathonInput.vue';
    import Tabs from '../../components/header/HeaderTabs.vue';
    import BeamLogo from '../../components/images/BeamLogo.vue';
    import TabTitle from '../../components/tabs/TabTitle.vue';
    import TabBox from '../../components/tabs/TabBox.vue';
    import TabHeader from '../../components/tabs/TabHeader.vue';
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
            HeaderLeft,
            HeaderRight,
            FlexHeader,
            DBody,
            DButton,
            Tabs,
            Logo,
            TrophyCase,
            Trophy,
            GithubAvatar,
            BeamLogo,
            TopLeft,
            TopLink,
            AccountInfo,
            HomeIcon,
            LogOutIcon,
            TopIcon,
            TopText,
            TabTitle,
            TabBox,
            TabHeader,
            DInput
        },

    }
</script>
