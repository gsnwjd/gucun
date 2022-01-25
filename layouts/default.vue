<template>
<div>
    <div class="pd">
      <nuxt/>
    </div>
  <div height="74px">
    <GChd/>
  </div>
  <div height="260px">
    <GCft/>
  </div>
</div>  
</template>

<script>
import GChd from '@/components/public/row-head.vue'
import GCft from '@/components/public/footer.vue'

export default {
  components: {
    GChd,
    GCft
  },
  mounted(){
    this.$store.dispatch('getUser')
  }
}
</script>
  
<style>
body *{
    margin:0;
    padding:0;
    border:0;
}
body {
    margin:0;
    padding:0;
    border:0;
}
body{
  font-family: Nero;
}
@font-face{
    src:url('/font/SourceHanSansCN-Normal.otf');
    font-family: Nero;
}
@font-face{
    src:url('/font/SourceHanSerifCN-Regular.otf');
    font-family: Fmain;
}
@keyframes swing {
  20% {
    -webkit-transform: rotate3d(0, 0, 1, 10deg);
    transform: rotate3d(0, 0, 1, 10deg);
  }

  40% {
    -webkit-transform: rotate3d(0, 0, 1, -10deg);
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    -webkit-transform: rotate3d(0, 0, 1, 5deg);
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    -webkit-transform: rotate3d(0, 0, 1, -5deg);
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
}

.ani_swing {
  -webkit-transform-origin: top center;
  transform-origin: top center;
  -webkit-animation-name: swing;
  animation-name: swing;
  animation: swing 8s ease infinite;
}
@keyframes wobble {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  15% {
    -webkit-transform: translate3d(-6%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-6%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  30% {
    -webkit-transform: translate3d(5%, 0, 0) rotate3d(0, 0, 1, 1deg);
    transform: translate3d(5%, 0, 0) rotate3d(0, 0, 1, 1deg);
  }

  45% {
    -webkit-transform: translate3d(-4%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-4%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  60% {
    -webkit-transform: translate3d(3%, 0, 0) rotate3d(0, 0, 1, 1deg);
    transform: translate3d(3%, 0, 0) rotate3d(0, 0, 1, 1deg);
  }

  75% {
    -webkit-transform: translate3d(-2%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-2%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.ani_wobble {
  -webkit-animation-name: wobble;
  animation-name: wobble;
  animation: wobble 26s ease infinite;
}


a{
    text-decoration: none;
}
.mgl_10{
    margin-left: 10px;
}
.mgl_20{
    margin-left: 20px;
}
.mgl_30{
    margin-left: 30px;
}
ul,li{
    list-style: none;
}
.pd{
  padding-top:70px;
}
</style>