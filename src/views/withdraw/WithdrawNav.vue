<template>
    <div>
        <header-nav :links="links"></header-nav>
    </div>
</template>
<script type="text/javascript">
import headerNav from '@c/HeaderNav'
export default {
    data () {
        return {
            links: {
                right1: {
                    to: { name: 'withdraw' },
                    name: '提现'
                },
                right2: {
                    to: { name: 'withdrawList' },
                    name: '提现记录'
                }
            }
        }
    },

    components: {
        headerNav
    }

}
</script>
