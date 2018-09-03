import Vue from 'vue';
import $ from '$';

import ace from 'ace-builds';
import monokaiThemeUrl from 'ace-builds/src-noconflict/theme-monokai';
import modeSCSSUrl from 'ace-builds/src-noconflict/mode-scss';
import modeLESSUrl from 'ace-builds/src-noconflict/mode-less';
import extLanguage from 'ace-builds/src-noconflict/ext-language_tools';


ace.config.setModuleUrl('ace/mode/scss', modeSCSSUrl);
ace.config.setModuleUrl('ace/mode/less', modeLESSUrl);
ace.config.setModuleUrl('ace/theme/monokai', monokaiThemeUrl);
ace.config.setModuleUrl('ace/ext/language_tools', extLanguage);
ace.require(extLanguage);


export default Vue.extend({
  mounted() {
    this.initPreEditor();
    this.initComplier();
  },
  data() {
    const preEditor: ace.Ace.Editor | any = {};
    const complieror: ace.Ace.Editor | any = {};
    return {
      preEditor,
      complieror
    }
  },
  methods: {
    complier(e: MouseEvent): void {
      const cssType: string = $(e.target).text();
      $.ajax({
        url: `/complier-${cssType}`,
        method: 'POST',
        dataType: 'json',
        data: {
          css: this.preEditor.getValue()
        }
      }).done((res: AjaxObject) => {
        if (res.code !== 0) {
          this.complieror.setValue(res.msg);
          return;
        }
        this.complieror.setValue(res.css);
      });
    },
    handleChange(e: MouseEvent | any): void {
      this.changeCSSlang(e.target.value);
    },
    changeCSSlang(type: string): void {
      this.complieror && this.complieror.session.setMode(`ace/mode/${type}`);
      this.preEditor && this.preEditor.session.setMode(`ace/mode/${type}`);
    },
    initComplier(): void {
      this.complieror = ace.edit('complier');
      this.complieror.setTheme('ace/theme/monokai');
      this.complieror.session.setMode("ace/mode/scss");
      this.complieror.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
    },
    initPreEditor(): void {
      this.preEditor = ace.edit('preEditor');
      this.preEditor.setTheme('ace/theme/monokai');
      this.preEditor.session.setMode("ace/mode/scss");
      this.preEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
    },
  },
})
