<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="less">
@s: 0.0133rem;
body,html{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    // overflow: hidden;
}
p{
    margin: 0;
    padding: 0;
}
.size{
    width: 100%;
    height: 100%;
}
#app {
    font-family: 'PingFang-SC-Regular', 'Avenir', Helvetica, Arial, sans-serif;
    .size;
    background: #fff;
    // overflow: hidden;
}
.flex-center{
//   display: box;              /* OLD - Android 4.4- */
//   display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    // display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    // display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    display: -webkit-flex;     /* NEW - Chrome */

    align-items: center;
    /* 09版 */
//      -webkit-box-align: center;
    /* 12版 */
    -webkit-align-items: center;
    // -moz-align-items: center;
    // -ms-align-items: center;
    // -o-align-items: center;

    justify-content: center;
    /* 09版 */
//      -webkit-box-pack: center;
    /* 12版 */
    -webkit-justify-content: center;
    // -moz-justify-content: center;
    // -ms-justify-content: center;
    // -o-justify-content: center;
  }
.flex-start{
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    display: -webkit-flex;     /* NEW - Chrome */
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
}
.flex-space{
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    display: -webkit-flex;     /* NEW - Chrome */
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}
.flex-end{
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    display: -webkit-flex;     /* NEW - Chrome */
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
}
.flex-end-end{
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    display: -webkit-flex;     /* NEW - Chrome */
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
}
.flex-space-around{
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    display: -webkit-flex;     /* NEW - Chrome */
    align-items: center;
    -webkit-align-items: center;
    justify-content: space-around;
    -webkit-justify-content: space-around;
}
.flex-col-center{
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    display: -webkit-flex;     /* NEW - Chrome */
    flex-direction:column;
    -webkit-flex-direction:column;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
}
</style>
