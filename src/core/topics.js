import pubsub from 'pubsub-js'
import $ from 'jquery'

function publish (topic, data) {
  data = Array.prototype.splice.call(arguments, 1)
  pubsub.publish(topic, data)
}

function subscribe (topic, listener) {
  pubsub.subscribe(topic, (_, data) => {
    listener.apply(null, $.makeArray(data))
  })
}

export {
  publish,
  subscribe
}

export default {
  publish,
  subscribe
}
