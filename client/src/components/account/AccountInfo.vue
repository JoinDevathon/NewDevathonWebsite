<template>
    <TopLeft :href="href">
        <template v-if="user && user.username">
            <GithubAvatar :username="user.username" size="70" class="info-avatar"/>
            <TopLink href="/authentication/away">
                <TopText>Account</TopText>
                <TopIcon><AccountIcon/></TopIcon>
            </TopLink>
            <TopLink href="/authentication/logout">
                <TopText>Log Out</TopText>
                <TopIcon><LogOutIcon/></TopIcon>
            </TopLink>
        </template>
        <template v-else>
            <TopLink href="/authentication/away">
                <TopText>Log In or Register</TopText>
                <TopIcon><LogInIcon/></TopIcon>
            </TopLink>
        </template>
    </TopLeft>
</template>

<style>
    @media(min-width: 720px) {
        .info-avatar {
            margin: 5px auto 12px !important;
        }
    }
</style>

<script>
    import TopLeft from '../containers/TopLeft.vue';
    import TopLink from '../containers/TopLink.vue';
    import TopText from '../containers/TopText.vue';
    import TopIcon from '../containers/TopIcon.vue';
    import LogInIcon from '../images/LogInIcon.vue';
    import LogOutIcon from '../images/LogOutIcon.vue';
    import AccountIcon from '../images/AccountIcon.vue';
    import GithubAvatar from '../images/GithubAvatar.vue';

    export default {
        props: ['user'],
        components: {
            TopLeft,
            TopLink,
            TopText,
            TopIcon,
            LogInIcon,
            LogOutIcon,
            AccountIcon,
            GithubAvatar
        },
        computed: {
            href: function() {
                if (this.user) {
                    return '/authentication/logout';
                } else {
                    return '/authentication/away';
                }
            }
        }
    };
</script>
