<template lang="html">
        <div id="row4">
            <div class="foot-a">
                特殊声明：旅游时期，沽存旅行社完全遵从个人意愿，且不承担连带责任，一切解释权利仍归沽存所有。
            </div>
            <div class="foot-b">
                <img src="img/buguo.png" alt="">
                <a href="">商业合作</a>/
                <a href="">意见信箱</a>/
                <a href="">帮助中心</a>/
                <a href="">投诉建议</a>/
                <a href="">广告服务</a>/
                <br />
                <span>旅行社业务经营许可证编号：L-SH-CJ00107</span>
                <br />
                <span class="sp9">联系电话：0795-18279501002</span>
            </div>
        </div>
</template>

<script>

export default {

}
</script>

<style>
#row4{
    width:100%;
    height:250px;
    padding-top:20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    border-top:1px solid #cecece;
}
#row4 img{
    height:80px;
}
.foot-a{
    flex:1;
    color:#725848;
}
.foot-b{
	flex:1;
	color:#6d7e88;
}
</style>
