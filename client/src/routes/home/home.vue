<template>
    <div id="container">
        <DHeader>
            <AccountInfo :account="account" home="true"/>
            <Logo height="20vw" style="min-height: 200px; max-height: 400px"/>
            <hr/>
            <h2 class="subtext">Devathon is a Bukkit programming contest that allows anyone to join.</h2>
            <h2 class="subtext">Find an upcoming contest and participate!</h2>
            <hr/>
            <HeaderTabs>
                <DButton href="https://blog.devathon.org">Blog</DButton>
                <DButton href="https://twitter.com/JoinDevathon">Twitter</DButton>
            </HeaderTabs>
        </DHeader>
        <DBody>
            <h2>Current Contests</h2>
            <FlexBox>
                <div class="padded">
                    <ContestBox index="0"
                                title="Devathon 2016"
                                description="The very first Devathon Contest. The 2016 judges are Kazzababe, Nick Parks, and CodeBeasty."
                                status="Judging"
                                href="/2016"/>
                </div>
            </FlexBox>
            <hr/>

            <h2>Upcoming Contests</h2>
            <FlexBox>
                <div class="padded">
                    <ContestBox index="1" title="Devathon Spring 2017" description="A battle between networks, each one submitting 3 developers to contest." status="Planning"/>
                </div>
                <div class="padded">
                    <ContestBox index="2" title="Devathon Summer 2017" description="A future contest that anyone can join." status="Planning"/>
                </div>
            </FlexBox>
            <hr/>

            <h2>Previous Contests</h2>
            <FlexBox>
                <h3>No previous contests.</h3>
            </FlexBox>
        </DBody>
    </div>
</template>

<style>
    .subtext {
        font-weight: normal;
    }

</style>

<script>
    import DHeader from '../../components/header/DevathonHeader.vue';
    import Logo from '../../components/images/Logo.vue';
    import DBody from '../../components/containers/DevathonBody.vue';
    import Error from '../../components/containers/Error.vue';
    import DButton from '../../components/forms/DevathonButton.vue';
    import HeaderTabs from '../../components/header/HeaderTabs.vue';
    import AccountInfo from '../../components/account/AccountInfo.vue';
    import FlexBox from '../../components/containers/FlexBox.vue';
    import ContestBox from '../../components/contests/ContestBox.vue';
    import {devathon} from '../common';

    export default {
        components: {
            DHeader,
            Logo,
            HeaderTabs,
            AccountInfo,
            ContestBox,
            DBody,
            FlexBox,
            DButton
        },
        data() {
            return devathon({
                account: {}
            });
        }
    }
</script>