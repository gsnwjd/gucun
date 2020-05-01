import Vue from 'vue'
import Vuex from 'vuex'
import Vueditor from 'vueditor'

import 'vueditor/dist/style/vueditor.min.css'
import Axios from 'axios';

// 编辑器配置
let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor','|','bold', 'italic', 'underline','emoji', 'picture'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px'],
  uploadUrl: `/upload/img`
};

Vue.use(Vuex);
Vue.use(Vueditor, config);
// 创建根实例


new Vue({el: '#editorContainer'})