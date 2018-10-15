//import song from '../../src/assets/song.mp3'
//import horse from '../../src/assets/horse.mp3'
// const oneHour = 60 * 60 * 1000;
const oneHour = 20000;

export default {
  initBroadCasts (state, broadcasts) {
    state.broadcasts = broadcasts;
    state.timer = new Date().getTime();
    broadCastTimer(state);
    setInterval(() => {
      broadCastTimer(state);
      state.timer += oneHour;
    }, oneHour)
  },
  stickTheBroadcast(state, index) {
    if (state.playQueued.length > 1) {
      let bd = state.playQueued.splice(index, 1)[0]
      state.playQueued.splice(1, 0, bd);
    }
  },
  addTheQueue(state, params) {
    let {broadcast, index, jumpTheQueue} = params;
    if (broadcast.playStatus === 'Playing') {
      let queueBD;
      state.playQueued.some((item, num) => {
        if (item.id === broadcast.id) {
          queueBD = item;
          state.playQueued.splice(num, 1)
          addToPlayQueue(state, broadcast, jumpTheQueue)
          return true;
        }
      })
    } else {
      if (index !== undefined) state.broadcasts[index].playStatus = 'Playing';
      addToPlayQueue(state, broadcast, jumpTheQueue)
    }
    state.broadcastSrc.unshift(song);
  },
  cancelPlay(state, {broadcast, index}) {
    state.playQueued.splice(index, 1);
    state.broadcasts.some(item => {
      if (item.id === broadcast.id) {
        if (item.isPlay) {
          item.playStatus = 'Played'
        } else {
          item.playStatus = 'NotPlay'
        }
        return true;
      }
    })
  },
  togglePlayStatus(state, params) {
    state.broadcasts[params.index].enabled = !state.broadcasts[params.index].enabled;
  }
}

function addToPlayQueue (state, broadcast, jumpTheQueue) {
  if ((state.playQueued.length > 1) && jumpTheQueue) {
    state.playQueued.splice(1, 0, broadcast)
  } else {
    state.playQueued.push(broadcast)
  }
}

function broadCastTimer (state) {
  let currentTime = state.timer,
    broadcastTime = new Date(),
    currentHours = new Date(currentTime).getHours(),
    broadcastHours,
    currentMsec = new Date(currentTime).getTime(),
    broadcastMsec;
  state.broadcasts.some((item, index) => {
    // if (index === 0) {
    //   state.broadcastSrc.unshift(horse);
    //   state.playQueued.push(item);
    // }
    if (item.enabled) {
      new Date().setHours.apply(broadcastTime, item.scheduledAt.split(':'))
      broadcastHours = broadcastTime.getHours();
      broadcastMsec = broadcastTime.getTime()
      if (broadcastMsec < currentMsec) {
        item.playStatus = 'Played'
      } else if (broadcastMsec >= currentMsec && broadcastMsec < currentMsec + oneHour) {
        setTimeout(() => {
          state.broadcastSrc.unshift(horse);
          state.playQueued.push(item);
          item.playStatus = 'Playing'
        }, broadcastMsec - currentMsec)
      } else if (broadcastHours >= currentHours + 1) {
        return true;
      }
    }
  })
}
