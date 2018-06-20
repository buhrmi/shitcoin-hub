import Vue from 'vue'

Vue.mixin({
  methods: {
    $t: function(string) {
      return this.$store.state.translations[string] || string
    }
  }
})