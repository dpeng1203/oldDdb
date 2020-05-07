<template>
    <header class="header-nav-wrap1">
        <nav class="flex-space header-nav load-wrap flex-center">
            <router-link tag="div" active-class="load-active" class="load-link" v-for="item in links" :to="item.to" :key="item.name" replace>{{item.name}}</router-link>
        </nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </header>
</template>
<style lang="less">
@s: 0.0133rem;
.header-nav-wrap1{
    .load-wrap{ background: #fff; text-align: center;}
    .load-link{ flex-grow: 1; border-bottom: 1px solid #afafaf;  width: 50%; font-size: 36*@s; line-height: 44px;}
    .load-link span{ color: #505050;}
    .load-active{ border-bottom: 1px solid  #46BDAE; }
    .load-active span{ color:  #46BDAE; }
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

        }
    },
    props: {
        links: {
            type: Object,
            default () {
                return {
                    to: { name: '' },
                    name: ''
                }
            }
        }
    }
}
</script>
