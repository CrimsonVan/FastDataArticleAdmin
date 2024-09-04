<template>
  <el-dialog v-model="dialogFormVisible" :title="isEdit?'编辑分类':'添加分类'" width="400">
    <!--表单内容  -->
    <el-form :model="form">
      <el-form-item label="分类" >
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="别名" >
        <el-input v-model="form.region" autocomplete="off" />
      </el-form-item>  
    </el-form>
    <!-- 弹窗确认按钮 -->
    <template #footer>
         <div class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取消</el-button>
           <el-button v-if="isEdit" type="primary" @click="editChannel">
             修改
           </el-button>
           <el-button v-else type="primary" @click="addChannel">
             提交
           </el-button>
         </div>
    </template>
  </el-dialog>
</template>
   
<script setup>
import{artEditChannelService,artAddChannelService}from '../../../api/articles'
import {  ref } from 'vue'
const emit = defineEmits(['success'])
const dialogFormVisible = ref(false)
const isEdit=ref(false)
const form = ref({
     name: '',
     region: '',
     id:''
   })
//确认编辑分类
const editChannel=async()=>{
     dialogFormVisible.value = false
 await artEditChannelService({
        id:form.value.id,
         cate_name:form.value.name, 
         cate_alias:form.value.region
     })
     emit('success') 
  }
 //确认新增分类  
 const addChannel=async()=>{
    dialogFormVisible.value = false
    await artAddChannelService({
        cate_name:form.value.name, 
        cate_alias:form.value.region
    })
    emit('success')       
}
//打开该组件
 const open = (row) => {
  if(row){
    isEdit.value=true
    dialogFormVisible.value = true  
    form.value = {
        name: row.cate_name,
        region: row.cate_alias,
        id:row.id
      }
  }else{
    form.value = {
        name: '',
        region: '',
        id:''
      }
    isEdit.value=false
    dialogFormVisible.value = true  
    
  }
    
 
}

// 向外暴露方法open
defineExpose({
  open
})
   </script>