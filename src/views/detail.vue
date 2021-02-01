
<template>
  <div class="cont">
    <div class="header_box"><h1 class="page-header">商品详情</h1></div>
    <ul class="list">
      <li>
        <h2>商品名称</h2>
        <p>{{ detailList.name }}</p>
      </li>
      <li>
        <h2>商品描述</h2>
        <p>{{ detailList.subtitle }}</p>
      </li>
      <li>
        <h2>当前状态</h2>
        <p>{{ detailList.status == 1 ? "在售" : "已下架" }}</p>
      </li>
      <li>
        <h2>所属分类</h2>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </li>
      <li>
        <h2>商品价格</h2>
        <div class="price">
          {{ detailList.price }}
          <div class="yuan">元</div>
        </div>
      </li>
      <li>
        <h2>商品库存</h2>
        <div class="price">
          {{ detailList.stock }}
          <div class="yuan">件</div>
        </div>
      </li>
      <li>
        <h2>商品图片</h2>
        <img
          v-for="(item, index) in detailList.subImages.split(',')"
          :key="index"
          :src="detailList.imageHost + item"
          alt=""
        />
      </li>
      <li>
        <h2>商品详情</h2>
        <div v-html="detailList.detail"></div>
        <p></p>
      </li>
    </ul>
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
      detailList: [],
      value: "",
      value1: "",
      options: [],
      options1: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    getDetail() {
      this.$http.detailTo(this.id).then((res) => {
        console.log(res);
        this.detailList = res.data.data;
      });
    },
    // 获取下拉框数据
    getList() {
      this.$http.selectList().then((res) => {
        this.options = res.data.data;
        this.value = res.data.data.filter((item) => {
          return item.id == this.detailList.parentCategoryId;
        })[0].name;
        this.$http.selectList2(this.detailList.parentCategoryId).then((res) => {
          this.options1 = res.data.data;
          this.value1 = res.data.data.filter((item) => {
            return item.id == this.detailList.categoryId;
          })[0].name;
        });
      });
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
    this.getList();
    this.getDetail();
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
.header_box {
  width: 100%;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
.page-header {
  font-size: 28px;
  color: #666;
  padding-bottom: 9px;
}
.el-input {
  width: 400px;
}
.list li {
  display: flex;
  align-items: center;
  overflow: hidden;
}
li > h2 {
  font-size: 20px;
  margin-right: 20px;
}
li > p {
  font-size: 14px;
}
.price {
  width: 350px;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  text-indent: 6px;
  float: left;
  background-color: #eeeeee;
  border: 1px solid #cccccc;
}
.yuan {
  float: right;
  width: 50px;
  border-left: 1px solid #cccccc;
  text-align: center;
  line-height: 40px;
}
.sub-img {
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
  position: relative;
  border: 1px solid #ccc;
}
img {
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
  position: relative;
  border: 1px solid #ccc;
}
</style>
