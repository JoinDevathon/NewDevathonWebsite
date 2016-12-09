<template>
    <TopLeft :href="href">
        <template v-if="user">
            <GithubAvatar :username="user.username" size="70" class="info-avatar"/>
            <TopLink href="/account">Account</TopLink>
            <TopLink href="/authentication/logout">Log Out</TopLink>
        </template>
        <template v-else>
            <TopLink href="/authentication/away">Log In or Register</TopLink>
        </template>
    </TopLeft>
</template>

<style>
    @media(min-width: 720px) {
        .info-avatar {
            margin: 5px !important;
        }
    }
</style>

<script>
    import TopLeft from '../containers/TopLeft.vue';
    import TopLink from '../containers/TopLink.vue';
    import GithubAvatar from '../images/GithubAvatar.vue';

    export default {
        props: ['user'],
        components: {
            TopLeft,
            TopLink,
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
