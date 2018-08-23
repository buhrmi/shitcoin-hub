import Vue from 'vue'
// import redactor from '~/components/redactor';
// import shitcoinHeader from '~/components/shitcoin-header';
import dropzone from 'nuxt-dropzone';
import vtooltip from 'v-tooltip';

Vue.use(vtooltip);
// Vue.component('redactor', redactor);
Vue.component('dropzone', dropzone);
// Vue.component('shitcoin-header', shitcoinHeader)


const requireComponent = require.context(
  // The relative path of the components folder
  '~/components/global'
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Strip the leading `./` and extension from the filename
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})