import pubsub from 'pubsub-js'

function publish (topic, data) {
  data = Array.prototype.splice.call(arguments, 1)
  pubsub.publish(topic, data)
}

function subscribe (topic, listener) {
  pubsub.subscribe(topic, (_, data) => {
    listener.apply(null, data)
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
