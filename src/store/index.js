import { defineStore } from 'pinia'
import { defaultPid, defaultPlatform } from '@/config'

export const useBaseStore = defineStore('main', {
  state: () => ({
    pid: defaultPid,
    platform: defaultPlatform,
    channelInfo: {},
    timestamp: +new Date()
  }),
  actions: {}
})
