import Vue from 'vue'

Vue.mixin({
  methods: {
    $t: function(thing) {
      if (typeof thing == 'object') {
        let translation = thing[this.$store.state.locale]
        if (!translation || translation.length == 0) {
          translation = thing['en']
        }
        return translation
      }
      else {
        return this.$store.state.translations[thing] || thing
      }
    }
  }
})