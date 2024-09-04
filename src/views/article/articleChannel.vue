<template>
  <div  style="display: flex;flex-direction: column;width: 100%;height: 90%;background-color:#ffffff;"> 
     <div style="display: flex;justify-content: space-between;align-items: center;height: 60px;background-color: #ffffff;border-bottom: 1px solid #f2efed;">
      <div style="margin-left: 16px;font-weight: bold;">文章分类</div>

      <div style="margin-right: 16px;">

        <el-button type="primary" @click="handleAdd">添加文章</el-button>
      </div>

     </div>



  <el-table v-loading="loading" width="83vw" row-height="20vh" :data="channelList" style="margin: 10px auto;">

    <el-table-column  label="序号" width="200" type="index" />
    <el-table-column label="分类" prop="cate_name" />
    <el-table-column label="别名" prop="cate_alias" />

    <el-table-column  width="150">
      <template  #header>
         操作
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleChange(scope.$index, scope.row)"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>
    <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    
  
  <channelChange @success="change" ref="channelChangeOpen"></channelChange>
<div style="display: flex;justify-content: center;align-items: flex-start;margin-bottom: 0;">

      <el-pagination @current-change="pageChange" layout="prev, pager, next" :total=50  />
    </div>
  </div>
  
</template>

<script  setup>
import {  ref,onMounted } from 'vue'
import{artGetChannelsService,artDelChannelService}from '../../api/articles.js'
import channelChange from './component/channelChange.vue'
const loading=ref(false)
const currentPage=ref(1)
const channelChangeOpen=ref()
const channelList=ref()
const pageChange=(e)=>{
currentPage.value=e
getChannelList(e)
}
const getChannelList = async (e) => {
  loading.value = true
  const res = await artGetChannelsService()
  if(res.data.data){
  loading.value = false
    
  }
  let start=e*8-8
  let  end=e*8
  channelList.value=res.data.data.slice(start,end)//第e页
  console.log('打印分类',channelList.value);

}
const change=()=>{
      getChannelList(currentPage.value)
}
const search = ref('')
onMounted(()=>{
  getChannelList(1)
})

const handleEdit =async (index, row) => {
       try{await ElMessageBox.confirm('你确认要删除该分类么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })}catch{
   
    return
  }

  await artDelChannelService(row.id)

  getChannelList(currentPage.value)
}
const handleChange = (index, row) => {
  channelChangeOpen.value.open(row)
}
const handleAdd = () => {
  channelChangeOpen.value.open()
}

</script>
<style lang="scss">


</style>
