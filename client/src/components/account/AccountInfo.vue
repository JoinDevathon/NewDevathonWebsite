<template>
    <TopLeft :href="href">
        <Logo height="70px"/>
        <template v-if="account && account.id">
            <TopLink href="/">
                <TopText>Home</TopText>
                <TopIcon>
                    <HomeIcon/>
                </TopIcon>
            </TopLink>
            <TopLink href="/authentication/away">
                <TopText>Account</TopText>
                <TopIcon>
                    <GithubAvatar :id="account.github_id" size="18" marginBottom="0" marginTop="0"/>
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
            <TopLink href="/">
                <TopText>Home</TopText>
                <TopIcon>
                    <HomeIcon/>
                </TopIcon>
            </TopLink>
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
    @media (min-width: 1000px) {
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
