
<template>
  <div>
    <header class="header_top">
      <p>订单管理</p>
    </header>
    <ul>
      <li>
        <h1>订单号：</h1>
        <p>{{ orderDetailList.orderNo }}</p>
      </li>

      <li>
        <h1>收件人：</h1>
        <p>
          {{ orderDetailList.shippingVo.receiverName }}，{{
            orderDetailList.shippingVo.receiverProvince
          }}{{ orderDetailList.shippingVo.receiverCity }}，{{
            orderDetailList.shippingVo.receiverAddress
          }}
        </p>
      </li>

      <li>
        <h1>订单状态：</h1>
        <p>{{ orderDetailList.statusDesc }}</p>
      </li>

      <li>
        <h1>支付方式：</h1>
        <p>{{ orderDetailList.paymentTypeDesc }}</p>
      </li>
      <li>
        <h1>订单金额：</h1>
        <p>￥{{ orderDetailList.payment }}</p>
      </li>
    </ul>
    <el-table border :data="tableList">
      <el-table-column label="商品图片" prop="productImage"></el-table-column>
      <el-table-column label="商品信息" prop="productName"></el-table-column>
      <el-table-column label="单价" prop="currentUnitPrice"></el-table-column>
      <el-table-column label="数量" prop="quantity"></el-table-column>
      <el-table-column label="合计" prop="totalPrice"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      id: "",
      orderDetailList: [],
      tableList:[],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async setorderList() {
      const { data: res } = await this.$http.orderdetails(this.id);
      console.log(res);
      this.orderDetailList = res.data;
      this.tableList = res.data.orderItemVoList;
    },
  },
  // 以下是生命周期钩子 注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.id = this.$route.params.id;
    this.setorderList();
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {},
};
</script> 

<style lang="scss" scoped>
.header_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeee;
  p {
    font-size: 30px;
    color: #666666;
  }
}
ul {
  width: 100%;
  li {
    display: flex;
    align-items: center;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
      margin-left: 40px;
    }
  }
}
</style>
