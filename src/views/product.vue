
<template>
  <div class="container_box">
    <header class="header_top">
      <p>商品管理</p>
      <el-button style="background: #337ab7; color: #fff" icon="el-icon-plus" @click='addList'
        >添加商品</el-button
      >
    </header>
    <!-- 搜索区域 -->
    <div class="search_box">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select
            v-model="value"
            @change="selectChnage"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" placeholder="关键字"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="search">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格数据区域 -->
    <el-table :data="tableList" stripe border style="width: 100%">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="信息">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
          <p>{{ scope.row.subtitle }}</p>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 1 ? "在售" : "已下架" }}</span>
          <el-button
            type="warning"
            size="mini"
            style="margin-left: 10px"
            @click="setsale(scope.row.id, scope.row.status)"
            >{{ scope.row.status == 1 ? "下架" : "上架" }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row.id)"
            >查看</el-button
          >
          <el-button type="primary" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
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
      input: "",
      options: [
        {
          value: "1",
          label: "按商品id查询",
        },
        {
          value: "2",
          label: "按商品名称查询",
        },
      ],
      value: "1",
      tableList: [],
      total: 0,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    selectChnage(e) {
      console.log(e);
    },
    async spList() {
      const res = await this.$http.commodity(1).then((res) => {
        this.tableList = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    // 分页
    async handleCurrentChange(val) {
      const { data: res } = await this.$http.commodity(val);
      this.tableList = res.data.list;
      this.total = res.data.total;
    },
    //搜索
    async search() {
      let name;
      if (this.value == 1) {
        name = "productId";
      } else {
        name = "productName";
      }
      const { data: res } = await this.$http.search(name, this.input);
      this.tableList = res.data.list;
      this.total = res.data.total;
    },
    // 商品状态
    setsale(id, zt) {
      let status, name;
      console.log(zt);
      if (zt == 1) {
        status = 2;
        name = "确定下架该商品？";
      } else {
        status = 1;
        name = "确定上架该商品?";
      }
      let set = confirm(name);
      if (set == true) {
        this.$http.setsale(id, status).then((res) => {
          console.log(res);
          if (res.data.status == 0) {
            alert(res.data.data);
            this.spList();
          }
        });
      }
    },
    detail(id) {
      this.$router.push(`/detail/${id}`);
    },
    addList() {
      this.$router.push('/save')
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
    this.spList();
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
.search_box {
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
