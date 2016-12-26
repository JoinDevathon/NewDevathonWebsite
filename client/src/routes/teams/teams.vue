<template>
    <div id="container">
        <DHeader>
            <AccountInfo :account="account"/>
            <img class="header-icon" :src="`/teams/${team.url}.png`" :alt="team.name"/>
            <h2>{{team.name}}</h2>
            <h3 style="max-width: 80%; display: inline-block">{{team.description}}</h3>
        </DHeader>
        <DBody>
            <div class="clearfix">
                <div class="twenty-five">
                    <br/>
                    <ColoredBox title="Members" index="0">
                        <template v-for="member in team.members">
                            <ImageRow :src="`/avatar/${member.github_id}.png?size=50`" :title="member.username" :sub="member.role"/>
                        </template>
                    </ColoredBox>
                </div>
                <div class="twenty-five" style="text-indent: -9999px">
                    If you find this, send an email to paul@burngames.net to get a special trophy!
                </div>
                <div class="seventy-five">
                    <div class="clearfix">
                        <div class="thirty-three padded">
                            <ContestBox index="1"/>
                        </div>
                        <div class="thirty-three padded">
                            <ContestBox index="2"/>
                        </div>
                        <div class="thirty-three padded">
                            <ContestBox index="3"/>
                        </div>
                    </div>
                </div>
            </div>
        </DBody>
    </div>
</template>

<script>
    import DHeader from '../../components/header/DevathonHeader.vue';
    import AccountInfo from '../../components/account/AccountInfo.vue';
    import DBody from '../../components/containers/DevathonBody.vue';
    import ColoredBox from '../../components/containers/ColoredBox.vue';
    import ContestBox from '../../components/contests/ContestBox.vue';
    import ImageRow from '../../components/containers/ImageRow.vue';
    import {devathon} from '../common';

    export default {
        data() {
            return devathon();
        },
        components: {
            DHeader,
            AccountInfo,
            DBody,
            ColoredBox,
            ImageRow,
            ContestBox
        }
    }
</script>