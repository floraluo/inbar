<template>
  <div id="app">
    <router-view/>
    <audio ref="broadcast" @ended="playEnd" >
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { GET } from '@/core/http'
 // import horse from '@/assets/horse.mp3'
 // import song from '@/assets/song.mp3'
  import home from './home/home.vue'
  import login from './views/login.vue'
  let vm;
  export default {
    name: "App",
    components: {home, login},
    data () {
      return {
      }
    },
    computed: mapState({
      broadcasts: state => state.broadcasts,
      playQueued: state => state.playQueued,
      broadcastSrc: state => state.broadcastSrc
    }),
    watch: {
      playQueued: function(newQueue, oldQueue) {
        if (!this.$refs.broadcast.src || this.$refs.broadcast.ended) {
          if (newQueue.length > 0) {
            //todo: this.$refs.broadcast.src = this.playQueued[0].resource
            layer.msg(this.playQueued[0].resource)
            this.$refs.broadcast.src = this.broadcastSrc[0]
            this.$refs.broadcast.play()
          }
        }
      }
    },
    methods: {
      playEnd() {
        let shiftBD = this.playQueued.shift();
        if (shiftBD.id) {
          this.broadcasts.some(item => {
            if (item.id === shiftBD.id) {
              item.playStatus = 'Played'
              item.isPlay = true;
              return true;
            }
          })
        }
        if (this.playQueued.length > 0 && this.playQueued[0].resource) {
          //todo: this.$refs.broadcast.src = this.playQueued[0].resource
          layer.msg(this.playQueued[0].resource)
          this.$refs.broadcast.src = this.broadcastSrc[0]
          this.$refs.broadcast.play();
        }
      }
    },
    created () {
      vm = this;
    }
  }
</script>
