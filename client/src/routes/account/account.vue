<template>
    <div id="container">
        <DHeader>
            <TopLeft>
                <Logo height="80px" style="padding: 0 0"/>
                <TopLink href="/">Go Home</TopLink>
                <TopLink href="/authentication/logout">Log Out</TopLink>
            </TopLeft>
            <GithubAvatar size="200" :username="user.username"/>
            <h2 class="account-name">{{user.username}}'s Profile Page</h2>
            <hr/>
            <p class="trophy-case-title">Trophy Case</p>
            <TrophyCase>
                <template v-for="trophy in user.trophies">
                    <Trophy :trophy="trophy"/>
                </template>
            </TrophyCase>
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
    import {devathon} from '../common';

    export default {
        data() {
            return devathon({
                user: {
                    username: ''
                }
            });
        },

        components: {
            DHeader,
            DBody,
            Logo,
            TrophyCase,
            Trophy,
            GithubAvatar,
            TopLeft,
            TopLink,
            AccountInfo
        }
    }
</script>
