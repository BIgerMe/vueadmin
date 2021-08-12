<template>
  <el-table
    v-loading="listLoading"
    :data="list"
    border
    fit
    highlight-current-row
    style="width: 100%;"
  >
    <el-table-column label="id" prop="id" sortable="custom" align="center" width="80">
      <template slot-scope="{row}">
        <span>{{ row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="物品名称" prop="name" min-width="150px" />
    <el-table-column label="数量" prop="qty" min-width="150px">
      <template slot-scope="{row}">
        {{ row.qty + row.unit }}
      </template>
    </el-table-column>
    <el-table-column label="是否必备" prop="is_necessary" min-width="150px" />
    <el-table-column label="妈妈用品" prop="mom_use" min-width="150px" />
    <el-table-column label="宝宝用品" prop="baby_use" min-width="150px" />
    <el-table-column label="重要性" prop="importance" min-width="150px">
      <template slot-scope="{row}">
        <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { add, search, del } from '@/api/bearing'
import { fetchList } from '@/api/article'

export default {
  name: 'Bearing',
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      search({}).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
