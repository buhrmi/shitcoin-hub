import Vue from 'vue'
import redactor from '~/components/redactor';
import shitcoinHeader from '~/components/shitcoin-header';
import dropzone from 'nuxt-dropzone';

Vue.component('redactor', redactor);
Vue.component('dropzone', dropzone);
Vue.component('shitcoin-header', shitcoinHeader)