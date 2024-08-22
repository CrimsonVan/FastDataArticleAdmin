<template>
  <div  style="display: flex;flex-direction: column;width: 100%;height: 90%;background-color:#ffffff;"> 
     <div style="display: flex;justify-content: space-between;align-items: center;height: 60px;background-color: #ffffff;border-bottom: 1px solid #f2efed;">
      <div style="margin-left: 16px;font-weight: bold;">基本资料</div>
    </div>
     <el-form
    ref="ruleFormRef"
    style="width: 500px;margin-top:40px;margin-left: 30px;"
    :model="userInfo"
    status-icon
  
    label-width="auto"
    class="demo-ruleForm"
  > 
  <el-form-item label="头像" prop="user_pic" >
      <el-upload
      ref="uploadRef"
      :auto-upload="false"
      :show-file-list="false"
      :size="200"
      :on-change="onSelectFile"
    >
    <el-avatar :src="userStore.user.user_pic" />

   
    </el-upload>

    <!-- <br /> -->
    </el-form-item>
  <el-form-item label="用户名" prop="username">
      <el-input v-model="userInfo.username" :disabled="true" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="userInfo.nickname"  autocomplete="off" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="userInfo.email"
       
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="submitForm">
          确认修改
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置内容</el-button>
    </el-form-item>
  </el-form>

  </div>
  
</template>

<script  setup>
import {  ref,onMounted } from 'vue'
import {useUserStore}from'../../stores/index'
// import { Plus } from '@element-plus/icons-vue';
import { userUpdateInfoService,userUpdateAvatarService } from '../../api/user';
// import { ElMessageBox } from 'element-plus';
// 是在使用仓库中数据的初始值 (无需响应式) 解构无问题
const {
  user: { email, id, nickname, username },
  getUser
} = useUserStore()

const userInfo = ref({
  id,
  username,
  nickname,
  email
})
const uploadRef=ref()
const userStore=useUserStore()
const ruleFormRef = ref()
const resetForm = () => {
userInfo.value.nickname='',
userInfo.value.email=''

}
const onSelectFile = async(uploadFile) => {
  // 基于 FileReader 读取图片做预览
  // console.log('打印upload图片',uploadFile);
  
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload =async () => {
  
  userStore.user.user_pic=reader.result
  let res1=await userUpdateAvatarService(reader.result)
ElMessage.success(res1.data.message || '修改成功')
        // await getUser()
  }
}
const submitForm=async()=>{
// console.log('打印ruleFormRef',userInfo.value);
try{
  let res=await userUpdateInfoService(
  {
    id: userInfo.value.id,
    nickname: userInfo.value.nickname,
    email: userInfo.value.email
}
)
ElMessage.success(res.data.message || '修改成功')
}catch{
// console.log(error);

return
}

// console.log('打印api头像',res);

await getUser()

// console.log('打印picurl',`${userInfo.value.user_pic}`);


}

</script>
<style lang="scss">


</style>
