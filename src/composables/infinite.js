import { ref, reactive } from 'vue'

/**
 * @function 分页组合api（移动端）
 * @attention 如果有筛选查询，在调用时传入
 * @param {Object} args.filterParams 默认筛选参数（返回响响应式obj）
 * @param {Object} args.pageParams 初始分页信息（如果pageIndex从0开始时有用）
 */
export default function infinite (args = {}) {
  let list = ref([])
  // 筛选信息
  let filterInfo = reactive({
    ...args.filterParams || {}
  })
  // 数据状态信息
  let statusInfo = reactive({
    dataLoading: false,
    pullUpLoading: false,
    dataLoaded: false,
    noData: false,
    finished: false,
    error: false
  })
  // 分页信息
  let pageInfo = reactive({
    startPageIndex: 1,
    pageIndex: 1,
    pageSize: 20,
    total: 0,
    ...args.pageParams || {}
  })
  // Hook信息
  let eventInfo = reactive({
    ...args.eventParams || {}
  })
  /**
   * @function 获取列表数据
   * @param {Boolean} more 是否加载更多
   * @param {Object} body 请求body
   */
  const getPageDataList = async (more = false, body = {}) => {
    if (!args.interfaceName) return

    eventInfo.onBeforeStart && eventInfo.onBeforeStart()

    statusInfo.pullUpLoading = true
    statusInfo.dataLoading = true

    const params = {
      // pageSize: pageInfo.pageSize,
      page: more === true ? pageInfo.pageIndex + 1 : pageInfo.startPageIndex,
      ...body
    }

    Object.keys(filterInfo).forEach(e => {
      if (!['', null, undefined].includes(filterInfo[e])) {
        params[e] = filterInfo[e]
      }
    })

    eventInfo.onStart && eventInfo.onStart()

    const [res] = await args.interfaceApi[args.interfaceName](params)

    // 请求完成标记
    if (!statusInfo.dataLoaded) {
      statusInfo.dataLoaded = true
    }

    if (res.status === 200) {
      const data = res.data.items || []
      list.value = more === true ? list.value.concat(data) : data
      pageInfo.pageIndex = params.page
      pageInfo.total = Number(res.data.total || 0)

      // 异常重新请求错误转态重置
      if (statusInfo.error) {
        statusInfo.error = false
      }

      // 暂无数据
      if (list.value.length === 0) {
        statusInfo.noData = true
        statusInfo.finished = true
      } else if (list.value.length >= Number(res.data.total)) {
        // 全部数据加载完毕
        statusInfo.finished = true
      }

      eventInfo.onSuccess && eventInfo.onSuccess(res.data)

    } else {
      statusInfo.error = true
    }

    statusInfo.pullUpLoading = false
    statusInfo.dataLoading = false

    eventInfo.onFinished && eventInfo.onFinished()
  }
  /**
   * @function 上拉加载
   */
  const loadMore = async (body = {}) => {
    if (
      statusInfo.dataLoading ||
      statusInfo.noData ||
      statusInfo.finished
    ) return
    getPageDataList(list.value.length > 0, body)
  }
  /**
   * @function 重置数据
   */
  const resetData = async () => {
    Object.keys(statusInfo).forEach(e => {
      statusInfo[e] = false
    })
    pageInfo.pageIndex = pageInfo.startPageIndex
    pageInfo.total = 0
    list.value = []
  }
  /**
   * @function 重新加载数据
   */
  const restartData = async (body = {}) => {
    await resetData()
    await getPageDataList(false, body)
  }
  return {
    list,
    filterInfo,
    pageInfo,
    statusInfo,
    loadMore,
    resetData,
    restartData,
    getPageDataList
  }
}
