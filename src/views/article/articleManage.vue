<template>
    <div  style="display: flex;flex-direction: column;width: 100%;height: 90%;background-color:#ffffff;"> 
       <div style="display: flex;justify-content: space-between;align-items: center;height: 60px;background-color: #ffffff;border-bottom: 1px solid #f2efed;">
        <div style="margin-left: 16px;font-weight: bold;">文章管理</div>
        <!-- <div style="margin-right: 16px;"><el-button type="primary" @click="addChannel">添加分类</el-button></div> -->
        <div style="margin-right: 16px;">
          <!-- <channelEdit @success="getChannelList(1)"></channelEdit> -->
           <el-button @click="addArticle" type="primary">添加文章</el-button>
        </div>
  
       </div>
    <div style="display: flex;justify-content: flex-start;align-items: center;margin-top: 20px;">
       <div class="cate" style="margin-left: 10px;font-size: small;">   
    文章分类:
        <el-select
      placeholder="请选择"
      v-model=params.cate_id
        style="width: 200px"
      @change="changeCate"
    >
      <el-option
        v-for="(item,index) in channelList"
        :key="index"
        :label="item.cate_name"
        :value="item.id"
      />
    </el-select>
  </div>
  <div class="state" style="margin-left: 10px;font-size: small;">   
    文章状态:
        <el-select
      placeholder="请选择"
     v-model=params.state
        style="width: 200px"
      @change="changeState"
    >
      <el-option
        v-for="(item,index) in stateList"
        :key="index"
        :label="item.stateValue"
        :value="item.stateValue"
      />
    </el-select>
  </div>
  <div class="searchButton" style="margin-left: 25px;"> 
    <el-button type="primary" @click="searchArticle">搜索</el-button>
  </div>
  <div class="resethButton" style="margin-left: 20px;"> 
    <el-button type="primary" @click="searchResset">重置</el-button>
  </div>
    </div>
  
  
    <el-table v-loading="loading" width="83vw" row-height="20vh" :data="articleList" style="margin: 10px auto;">
  <!--  
        {id: 31743, title: '55555', 
   pub_date: 'Tue Aug 13 2024 16:08:39 GMT+0800 (Coordinated Universal Time)', 
     state: '已发布', cate_name: '影视'}

-->
      <!-- <el-table-column  label="文章标题" width="200" type="index" /> -->
      <el-table-column label="标题" prop="title" width="150"/>
      <el-table-column label="主题" prop="cate_name" />
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="state" />
    
  
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
            @click="handleDelete(scope.$index, scope.row)"
         
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
          <el-empty description="没有数据"></el-empty>
        </template>
      </el-table>
      <!-- 分页 -->
      
    
    <channelChange @success="change" ref="channelChangeOpen"></channelChange>
  <div style="display: flex;justify-content: center;align-items: flex-start;margin-bottom: 0;">
  
        <el-pagination @current-change="pageChange" layout="prev, pager, next" :total=50  />
  

      </div>
    </div>
    <article-edit ref="articleEditRef" @success="close" ></article-edit>
    <article-change ref="articleChangeRef"  @success="close"></article-change>
  </template>
  
  <script  setup>
  import {  ref,onMounted } from 'vue'
  import{artGetChannelsService,artDelChannelService,artPublishService,artGetListService,artDelService}from '../../api/articles.js'
  import articleEdit from './component/articleEdit.vue'
  import channelChange from './component/channelChange.vue'
  import articleChange from './component/articleChange.vue'

  import {Plus}from '@element-plus/icons-vue'
  import { useUserStore } from '../../stores'
  import { dayjs } from 'element-plus'

 const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')
  const useStore=useUserStore()
  const articleEditRef=ref()
  const articleChangeRef=ref()
  const loading=ref(false)
  const currentPage=ref(1)
  const channelChangeOpen=ref()
  const channelList=ref()
//查询搜索文章参数
  const params=ref({
  pagenum:1,
  pagesize:7,
  cate_id:'',
  state:''})
const addArticle=()=>{
  articleEditRef.value.open({})
}
// const changeArticle=()=>{
//   articleChangeRef.value.open({})
// }
const stateList=ref([
  {stateValue:'已发布'},
  {stateValue:'草稿'}

])
const searchList=ref({
  cate_id:'',
  state:''
})
  const imgUrl=ref('')
const formModel=ref({
  title:'测试',
  cate_id:'29823',
  content:'测试',
  state:'草稿'
})

const changeState=(e)=>{
  params.value.state=e
  // searchList.value.state=e
// console.log('打印state',searchList.value);

}
const changeCate=(e)=>{
  params.value.cate_id=e

  // searchList.value.cate_id=e
  // console.log('打印cate',searchList.value);

}
const searchArticle=async()=>{
  if(!params.value.state && !params.value.cate_id){
    ElMessage.success("查询参数不能为空")
       return
  }
// console.log('打印搜索索引',searchList.value);

await getArticleList()
}
const searchResset=async()=>{
  params.value.cate_id='',
  params.value.state='',
await getArticleList()

}

const articleList=ref([])
const getArticleList=async()=>{
  let {pagenum,pagesize,state,cate_id}=params.value
  loading.value = true
    let  res=await artGetListService({pagenum,pagesize,cate_id,state})
    loading.value = false
    articleList.value=res.data.data


   
}

const close=()=>{
  params.value.pagenum=currentPage.value
   getArticleList()
}
  const pageChange=(e)=>{
  // console.log('打印e',e);
  currentPage.value=e
  getChannelList(e)
  params.value.pagenum=currentPage.value

  getArticleList()
  }
  const getChannelList = async (e) => {
    loading.value = true
    const res = await artGetChannelsService()
   
    // loading.value = false
      
    
    
    // //  console.log('打印slice',res.data.data.slice(0,7));
     
    // let start=e*8-8
    // let  end=e*8
  
    channelList.value=res.data.data
  
  
  
  
  
    // console.log('打印channelList',channelList.value);
    
    // loading.value = false
  }
  const change=()=>{
        getChannelList(currentPage.value)
  }
  const search = ref('')
  onMounted(()=>{
    getChannelList(1)
    getArticleList()
  })
  
  const handleEdit =async (index, row) => {
//  console.log('打印row',row);
     try{await ElMessageBox.confirm('你确认要删除该文章么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })}catch{
   
    return
  }

    await artDelService(row.id)
    params.value.pagenum=currentPage.value

    getArticleList()
    ElMessage.success('删除成功！')
 
  }
  const handleDelete = (index, row) => {
    // console.log('打印编辑',index, row)
    // channelChangeOpen.value.open(row)
    articleChangeRef.value.open(row)

  }

  </script>
  <style lang="scss">

  
  </style>
  