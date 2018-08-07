import Vue from 'vue'
import redactor from '~/components/redactor';
import shitcoinHeader from '~/components/shitcoin-header';
import dropzone from 'nuxt-dropzone';
import vtooltip from 'v-tooltip';

Vue.use(vtooltip);
Vue.component('redactor', redactor);
Vue.component('dropzone', dropzone);
Vue.component('shitcoin-header', shitcoinHeader)