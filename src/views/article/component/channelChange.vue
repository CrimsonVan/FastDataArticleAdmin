<template>

     <el-dialog v-model="dialogFormVisible" title="添加分类" width="500">
       <el-form :model="form">
         <el-form-item label="分类" :label-width="formLabelWidth">
           <el-input v-model="form.name" autocomplete="off" />
         </el-form-item>
         <el-form-item label="别名" :label-width="formLabelWidth">
           <el-input v-model="form.region" autocomplete="off" />
         </el-form-item>
         
       </el-form>
       <template #footer>
         <div class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取消</el-button>
           <el-button type="primary" @click="addChannel">
             提交
           </el-button>
         </div>
       </template>
     </el-dialog>
 
   </template>
   
   <script  setup>
 
 import{artEditChannelService}from '../../../api/articles'
 
 import {  ref } from 'vue'
   
 const emit = defineEmits(['success'])
 
   const dialogFormVisible = ref(false)
   const formLabelWidth = '140px'
   
   const form = ref({
     name: '',
     region: '',
     id:83042
   })
   const addChannel=async()=>{
     dialogFormVisible.value = false
    let res=await artEditChannelService({
        id:form.value.id,
         cate_name:form.value.name, 
         cate_alias:form.value.region
     })

   emit('success')
        // console.log('打印添加分类的res',res);
        
 }

 const open = (row) => {
    dialogFormVisible.value = true
    // console.log('打印row',row);
    
  form.value = {
     name: row.cate_name,
     region: row.cate_alias,
     id:row.id
   }
  // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
}

// 向外暴露方法
defineExpose({
  open
})
   </script>