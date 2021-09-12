<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-descriptions title="基础信息" border>
          <el-descriptions-item label="名称">{{stock_basic.name+'（'+stock_basic.fullname+'）'}}</el-descriptions-item>
          <el-descriptions-item label="代码">{{stock_basic.symbol}}</el-descriptions-item>
          <el-descriptions-item label="上市日期">{{stock_basic.list_date}}</el-descriptions-item>
          <el-descriptions-item label="地域">{{stock_basic.area}}</el-descriptions-item>
          <el-descriptions-item label="所属行业">{{stock_basic.industry}}</el-descriptions-item>
          <el-descriptions-item label="市场">{{stock_basic.market}}</el-descriptions-item>
        </el-descriptions>

      </div>
    </div>
    <div class="chart-container">
      <daily :ts_code="this.ts_code" height="50%" width="100%" />

    </div>
  </div>
</template>

<script>
import daily from './components/daily'
import { StockBasicDetail } from '@/api/stock'


export default {
  name: 'StockDetail',
  components: { daily },
  data(){
    return {
      ts_code:'',
      stock_basic: {
        name:'',
        symbol:'',
      },
    }
  },
  created() {
    this.ts_code = this.$route.params.ts_code;
    this.getDetail()
  },
  methods:{
    getDetail(){
      StockBasicDetail({ts_code:this.ts_code}).then(response => {
        this.stock_basic = response.data
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

