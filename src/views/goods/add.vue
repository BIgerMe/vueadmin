<template>
  <div style="padding:30px;">
      <el-form ref="form" :model="form" label-width="80px">
        <el-card class="box-card">
          <div class="el-card__body" style="height: 80vh;overflow-y: scroll;border-bottom: 1px #eeeeee solid;margin-bottom: 10px">
            <el-tabs v-model="activeName" >
              <el-tab-pane label="基础设置" name="first">
                <el-row>
                  <el-col :span=24>
                    <el-form-item label="名称">
                      <el-input v-model="form.name" maxlength="200" show-word-limit></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="短名称"><el-input v-model="form.short_name"  maxlength="50" show-word-limit></el-input></el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="促销语"><el-input v-model="form.product_name"  maxlength="100" show-word-limit></el-input></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="SPU"><el-input v-model="form.goods_spu"></el-input></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="SKU"><el-input v-model="form.goods_sku"></el-input></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="条码"><el-input v-model="form.goods_code"></el-input></el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="库存">
                      <el-input-number v-model="form.store_qty" controls-position="right" :min="1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="排序">
                      <el-input-number v-model="form.sort" controls-position="right" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="市场价">
                      <el-input-number v-model="form.market_price" controls-position="right" :precision="2" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="本店价">
                      <el-input-number v-model="form.shop_price" controls-position="right" :precision="2" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="最少起订">
                      <el-input-number v-model="form.least_sum" controls-position="right" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="限购数量">
                      <el-input-number v-model="form.purchase_sum" controls-position="right" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上架状态">
                      <el-radio v-model="form.status" label="出售中">出售中</el-radio>
                      <el-radio v-model="form.status" label="已下架">已下架</el-radio>
                    </el-form-item>
                    <el-form-item label="是否推荐">
                      <el-radio v-model="form.is_recommend" label="是">是</el-radio>
                      <el-radio v-model="form.is_recommend" label="否">否</el-radio>
                    </el-form-item>
                    <el-form-item label="是否新品">
                      <el-radio v-model="form.is_new" label="是">是</el-radio>
                      <el-radio v-model="form.is_new" label="否">否</el-radio>
                    </el-form-item>
                    <el-form-item label="是否热卖">
                      <el-radio v-model="form.is_hot" label="是">是</el-radio>
                      <el-radio v-model="form.is_hot" label="否">否</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="规格属性" name="second">规格属性</el-tab-pane>
              <el-tab-pane label="媒体设置" name="third">媒体设置</el-tab-pane>
              <el-tab-pane label="商品详情" name="fourth">商品详情</el-tab-pane>
            </el-tabs>
          </div>
          <div class="el-footer">
              <el-button type="primary" @click="handleSubmit">立即创建</el-button>
              <el-button>取消</el-button>
          </div>
        </el-card>
      </el-form>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import {add} from '@/api/goods'
  import {fetchList} from "@/api/article";
  export default {
    name: 'goodsAdd',
    data() {
      return {
        activeName: 'first',
        form: {
          'name':'',
          'short_name':'',
          'product_name':'',
          'goods_category_id':'',
          'brand_id':'',
          'goods_code':'',
          'goods_spu':'',
          'goods_sku':'',
          'bar_code':'',
          'unit':'',
          'measure_type':'',
          'measure':'',
          'store_qty':'',
          'sort':0,
          'status':'',
          'is_recommend':'',
          'is_new':'',
          'is_hot':'',
          'market_price':0,
          'shop_price':0,
          'least_sum':0,
          'purchase_sum':0,
          'is_postage':'',
          'video':'',
          'cover':''
        }
      };
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    methods: {
      handleSubmit() {
        add(this.form).then(response => {
          this.$notify({
            title: 'Success',
            message: '新增成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  };
</script>
