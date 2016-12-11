<template>
    <div id="container">
        <DHeader>
            <TopLeft>
                <Logo height="80px" style="padding: 0 0"/>
                <TopLink href="/">
                    <TopText>Home</TopText>
                    <TopIcon><HomeIcon/></TopIcon>
                </TopLink>
                <TopLink href="/authentication/logout">
                    <TopText>Log Out</TopText>
                    <TopIcon><LogOutIcon/></TopIcon>
                </TopLink>
            </TopLeft>
            <GithubAvatar size="200" :username="d.user.username"/>
            <h2 class="account-name">{{d.user.username}}'s Profile Page</h2>
            <hr/>
            <p class="trophy-case-title">Trophy Case</p>
            <TrophyCase>
                <template v-for="trophy in d.user.trophies">
                    <Trophy :trophy="trophy"/>
                </template>
            </TrophyCase>
            <hr />
            <Tabs>
                <template v-if="edit === false">
                    <DButton v-if="d.user.beam" :href="'https://beam.pro/' + d.user.beam" target="_blank"><BeamLogo/> {{d.user.beam}}</DButton>
                    <DButton v-if="d.user.twitter" :href="'https://twitter.com/' + d.user.twitter" target="_blank">{{d.user.twitter}}</DButton>
                    <DButton v-if="d.user.twitch" :href="'https://twitch.tv/' + d.user.twitch">{{d.user.twitch}}</DButton>
                </template>
                <template v-else>
                    <DInput :value="d.user.beam" id="beam" @input="input('beam', $event)">Beam</DInput>
                    <DInput :value="d.user.twitter" id="twitter" @input="input('twitter', $event)">Twitter</DInput>
                    <DInput :value="d.user.twitch" id="twitch" @input="input('twitch', $event)">Twitch</DInput>
                </template>
                <DButton @click="edit = !edit" style="position: relative">
                    <template v-if="edit === false">
                        Edit Social Media
                    </template>
                    <template v-else>
                        Save
                    </template>
                </DButton>
            </Tabs>
        </DHeader>
        <DBody>
        </DBody>
    </div>
</template>

<style>
    .account-name {
        margin: 0 0 20px;
    }

    .trophy-case-title {
        margin-top: 15px;
        margin-bottom: -15px;
    }
</style>

<script>
    import DHeader from '../../components/header/DevathonHeader.vue';
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
    import {devathon} from '../common';

    export default {
        data() {
            return {
                d: devathon(),
                edit: false
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
            DInput
        },

    }
</script>
