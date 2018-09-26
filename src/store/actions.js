import {GET} from '../core/http'

export default {
  getBroadCasts ({ commit, state }) {
    if (!state.timer) {
      GET('/api/voice/playlist/')
        .then(data => {
          commit('initBroadCasts', data.map(item => {
            return Object.assign(item, {playStatus: 'NotPlay', isPlay: false})
          }))
        })
    }
  }
}
