
<template>
  <div class="container_box">
    <header class="header_top">
      <p>品类管理</p>
      <el-button style="background: #337ab7; color: #fff" @click="addCate" icon="el-icon-plus"
        >添加品类</el-button
      >
    </header>
    <p style="margin-top: 15px">当前商品分类ID：0</p>
    <!-- 表格区域 -->
    <el-table :data="cateList" stripe border>
      <el-table-column label="商品ID" prop="id"></el-table-column>
      <el-table-column label="品类名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a
            href="#"
            class="opera"
            @click="editCateGory(scope.row.id, scope.row.name)"
            >修改名称</a
          >
          <el-button type="primary" @click="detail(scope.row.id)" size="mini"
            >查看其子品类</el-button
          >
        </template>
      </el-table-column>
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
      cateList: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    setCateGory() {
      this.$http.cateGory().then((res) => {
        if (res.data.status == 0) {
          this.cateList = res.data.data;
        }
      });
    },
    editCateGory(id, name) {
      let b = prompt("请输入新的品类名称", name);
      if (b == null || b == "") {
        alert("请输入正确得品类名称");
        return;
      }
      this.$http.edit(id, b).then((res) => {
        console.log(res);
        alert(res.data.data);
        this.setCateGory();
      });
    },
    detail(id) {
      this.$router.push(`/details/${id}`);
    },
    addCate() {
        this.$router.push('/add') 
    }
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
    this.setCateGory();
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
.opera {
  margin-right: 10px;
  cursor: pointer;
}
a {
  color: #337ab7;
  text-decoration: none;
}
</style>
