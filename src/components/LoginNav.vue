<template>
    <header class="header-nav-wrap">
        <!-- <nav class="flex-center header-nav load-wrap flex-center">
            <router-link tag="div" active-class="load-active" class="load-link" v-for="(item, i) in links" :to="item.to" :key="i" replace>{{item.name}}</router-link>
        </nav> -->
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
    </header>
</template>
<style lang="less">
@s: 0.0133rem;
.header-nav-wrap{
    .load-wrap{ background: #fff; text-align: center; padding-top: 146*@s;width: 60%;padding-left: 20%}
    .load-link{ flex-grow: 1; font: 28*@s/76*@s "Microsoft Yahei"; border-bottom: 2px solid #afafaf; }
    .load-link{ color: #C9C9C9; font-size: 36*@s; line-height: 32px;}
    .load-active{ border-bottom: 2px solid #46BDAE; }
    .load-active{ color: #46BDAE;}
    .left-enter-active, .left-leave-active {
        transition: opacity .5s;
    }
    .left-enter, .left-leave-active {
        opacity: 0;
    }
}
</style>
<script type="text/babel">
export default {
    data () {
        return {
            links: {
                left: {
                    to: { name: 'login' },
                    name: '登录'
                },
                right: {
                    to: { name: 'register' },
                    name: '注册'
                }
            }
        }
    }
}
</script>
