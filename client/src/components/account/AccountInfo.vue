<template>
    <TopLeft :href="href">
        <template v-if="account && (account.username || account.id)">
            <template v-if="home">
                <GithubAvatar :id="account.github_id" size="70" class="info-avatar" rounded="true"/>
            </template>
            <template v-else>
                <Logo height="70px"/>
            </template>
            <TopLink :href="href">
                <TopText v-if="home">Account</TopText>
                <TopText v-else>Home</TopText>
                <TopIcon>
                    <AccountIcon v-if="home"/>
                    <HomeIcon v-else/>
                </TopIcon>
            </TopLink>
            <TopLink href="/authentication/logout">
                <TopText>Log Out</TopText>
                <TopIcon>
                    <LogOutIcon/>
                </TopIcon>
            </TopLink>
        </template>
        <template v-else>
            <template v-if="!home">
                <Logo height="70px"/>
                <TopLink href="/" v-if="!home">
                    <TopText>Home</TopText>
                    <TopIcon><AccountIcon/></TopIcon>
                </TopLink>
            </template>
            <TopLink href="/authentication/away">
                <TopText>Log In/Register</TopText>
                <TopIcon>
                    <LogInIcon/>
                </TopIcon>
            </TopLink>
        </template>
    </TopLeft>
</template>

<style>
    @media (min-width: 720px) {
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
    import Logo from '../images/Logo.vue';
    import LogInIcon from '../images/LogInIcon.vue';
    import LogOutIcon from '../images/LogOutIcon.vue';
    import AccountIcon from '../images/AccountIcon.vue';
    import HomeIcon from '../images/HomeIcon.vue';
    import GithubAvatar from '../images/GithubAvatar.vue';

    export default {
        props: ['account', 'home'],
        components: {
            TopLeft,
            TopLink,
            TopText,
            TopIcon,
            LogInIcon,
            LogOutIcon,
            HomeIcon,
            Logo,
            AccountIcon,
            GithubAvatar
        },
        computed: {
            link() {
                if (this.home) {
                    return '/authentication/away';
                }
            },
            href() {
                if (this.home) {
                    return '/authentication/away';
                } else {
                    return '/';
                }
            }
        }
    };
</script>
