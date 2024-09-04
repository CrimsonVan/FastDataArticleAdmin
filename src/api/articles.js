import request from '@/utils/request'
// 分类：获取文章分类
export const artGetChannelsService = () => request.get('http://127.0.0.1:3007/my/cate/list')
// 分类：添加文章分类
export const artAddChannelService = (data) => request.post('http://127.0.0.1:3007/my/cate/add', data)
// 分类：编辑文章分类
export const artEditChannelService = (data) =>
  request.post('http://127.0.0.1:3007/my/cate/info', data)
// 分类：删除文章分类
export const artDelChannelService = (id) =>
  // console.log('打印id类型',typeof(id));
  
  request.get('http://127.0.0.1:3007/my/cate/del', {
    params:{id} 
  })
  // request.get(`http://127.0.0.1:3007/my/cate/del/:${id}`)
// 文章：获取文章列表
export const artGetListService = (params) =>
  request.get('http://127.0.0.1:3007/my/article/list', {
    params
  })
  
// 文章：添加文章
// 注意：data需要是一个formData格式的对象
export const artPublishService = (data) => request.post('http://127.0.0.1:3007/my/article/add', data)

// 文章：获取文章详情
export const artGetDetailService = (id) =>
  request.get('http://127.0.0.1:3007/my/article/info', {
    params: { id }
  })

// 文章：编辑文章接口
export const artEditService = (data) => request.post('http://127.0.0.1:3007/my/article/editInfo', data)

// 文章：删除文章接口
export const artDelService = (id) =>
  request.get('http://127.0.0.1:3007/my/article/delInfo', { params: { id } })