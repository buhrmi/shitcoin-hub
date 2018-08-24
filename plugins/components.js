import Vue from 'vue'
import dropzone from 'nuxt-dropzone';
import vtooltip from 'v-tooltip';

Vue.use(vtooltip);
Vue.component('dropzone', dropzone);

const requireComponent = require.context('~/components/global', false, /\.vue/)

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