<template lang="html">
<div id="order">
  <div class="order" v-if="notpay">
    <gpcard :gps="orderval"></gpcard>
    <button class="btn1" @click="nextPay">确认付款</button>
  </div>
  <div class="order" v-else>
    <div class="er_code">
      <img src="/img/bali2.jpeg" alt="">
    </div>
    <a class="be-center" v-if="goto" href="/pindex" @click="pay">完成支付，点此跳转</a>
  </div>
</div>
</template>

<script>
import Gpcard from "@/components/group/gpcard.vue";

export default {
  components: {
    Gpcard
  },
  data() {
    return {
      order: "",
      orderid: "",
      notpay: true,
      goto: true
    };
  },
  computed: {
    orderval: function() {
      let val = this.order.split("-");
      return val;
    }
  },
  methods: {
    nextPay: function() {
      this.notpay = false;
    },
    pay: function() {
      let self = this;
      self.$axios.post("/order/hadpay", {
          id: self.orderid
        })
        .then(({ status, data }) => {
          if (status === 200 && data.code === 0) {
            self.goto = true;
          } else {
            self.error = `服务器出错`;
          }
        });
    }
  },
  async asyncData(ctx) {
    let id = ctx.query.id;
    let {
      status,
      data: { order, orderid }
    } = await ctx.$axios.get("http://localhost:3000/order/out", {
      params: {
        id
      }
    });

    if (status === 200) {
      return {
        order,
        orderid
      };
    }
  }
};
</script>

<style>
#order {
  height: 600px;
  width: 100%;
}
#order .btn1 {
  height: 30px;
  width: 80px;
  text-align: center;
  font-size: 18px;
  color: cornsilk;
  background-color: rgb(167, 132, 162);
  float: right;
  margin: 20px 40px 0px 0px;
  border-radius: 10px;
}
.order {
  margin-top: 90px;
}
.er_code {
  height: 230px;
  width: 230px;
  margin: 90px auto;
  overflow: hidden;
}
.be-center {
  display:block;
  margin: 0px auto;
  height: 50px;
  width:200px;
  text-align: center;
  text-decoration: underline 1px darkblue;
}
</style>
