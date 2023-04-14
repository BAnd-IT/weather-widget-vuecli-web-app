(function(){"use strict";var t={5008:function(t,i,e){var o=e(6369),s=function(){var t=this,i=t._self._c;return i("div",{staticClass:"app"},[i("WeatherWidget")],1)},a=[],n=function(){var t=this,i=t._self._c;return i("div",{staticClass:"weather-widget"},[t.editing?i("WeatherWidgetSettings"):i("WeatherWidgetView")],1)},r=[],c=function(){var t=this,i=t._self._c;return i("div",{staticClass:"widget-settings"},[i("button",{staticClass:"widget-settings__close-button",on:{click:t.toggleEditing}},[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}})])]),i("div",{staticClass:"widget-settings__content"},[i("div",{staticClass:"widget-settings__heading"},[t._v("Settings")]),i("div",{staticClass:"widget-settings__locations"},[i("LocationsList")],1),i("div",{staticClass:"widget-settings__form"},[i("AddLocationForm")],1)])])},l=[],d=function(){var t=this,i=t._self._c;return i("div",{staticClass:"locations-list__list"},t._l(t.locations,(function(e){return i("div",{key:e.location_id,staticClass:"locations-list__item js-draggable",attrs:{"data-id":e.location_id}},[i("div",{staticClass:"locations-list__item-tile"},[i("div",{staticClass:"locations-list__item-drag-action js-draggable-handle"},[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z"}})])]),i("div",{staticClass:"locations-list__item-location"},[i("div",[t._v(t._s(`${e.city}, ${e.country}`))])]),i("div",{staticClass:"locations-list__item-action"},[i("button",{staticClass:"locations-list__item-delete-button",on:{click:function(i){return t.removeLocationItem(e)}}},[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"}})])])])])])})),0)},u=[],h=e(3822),_=e(7319),g={name:"locations-list",computed:{...(0,h.Se)({locations:"GET_LOCATIONS"})},mounted(){const t=new _.Sortable(this.$el,{draggable:".js-draggable",handle:".js-draggable-handle",delay:250,mirror:{constrainDimensions:!0}});t.on("sortable:stop",(()=>{setTimeout((()=>{const t=this.$el.querySelectorAll(".js-draggable"),i=Array.prototype.map.call(t,(t=>t.dataset.id)),e=this.locations.sort(((t,e)=>i.indexOf(t.location_id)-i.indexOf(e.location_id)));this.$store.dispatch("setLocalStorageLocations",e),this.$store.commit("UPDATE_WEATHER",i)}))})),this.$on("hook:destroyed",(()=>{t.destroy()}))},methods:{removeLocationItem(t){let i=this.locations.findIndex((i=>i.location_id==t.location_id));this.$store.commit("REMOVE_WEATHER",i);let e=this.locations.filter((i=>i.location_id!==t.location_id));this.$store.dispatch("setLocalStorageLocations",e),this.locations[0]||this.$store.dispatch("check")}}},p=g,v=e(1001),m=(0,v.Z)(p,d,u,!1,null,null,null),L=m.exports,w=function(){var t=this,i=t._self._c;return i("div",{staticClass:"add-location-form"},[i("form",{staticClass:"add-location-form__tile",on:{submit:function(i){return i.preventDefault(),t.addLocation()}}},[i("div",{staticClass:"add-location-form__input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.city,expression:"city"}],staticClass:"ui-input",class:{"ui-input--error":t.error},attrs:{type:"text",placeholder:"Type location..."},domProps:{value:t.city},on:{blur:t.onCityInput,keyup:t.onCityInput,input:function(i){i.target.composing||(t.city=i.target.value)}}}),t.error?i("div",{staticClass:"add-location-form__error"},[t._v(t._s(t.error))]):t._e()]),i("div",{staticClass:"add-location-form__action"},[i("button",{staticClass:"ui-button",attrs:{type:"submit",disabled:!t.city}},[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z"}})])])])])])},C=[],f=(e(7658),e(5939)),y={name:"add-location-form",data(){return{city:null,error:null}},computed:{...(0,h.Se)({locations:"GET_LOCATIONS"})},methods:{isUnique(t,i){return t.filter((t=>t.city.toLowerCase()===i.toLowerCase()))},onCityInput(t){!this.error||(this.error=null,!t.ctrlKey&&t.keyCode)},addLocation(){0==this.isUnique(this.locations,this.city).length?f.Z.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=6d7941780ab2639cb20864db54125426`).then((t=>{const i=t.data.name,e=t.data.sys.country,o=new Date;let s={city:i,country:e,location_id:o};this.locations.push(s),this.$store.dispatch("setLocalStorageLocations",this.locations),this.$store.dispatch("getWeather",s),this.city=null})).catch((t=>{console.log(t),this.city=null,this.error="City not found"})):(this.error="City already present, choose another",this.city=null)}}},A=y,H=(0,v.Z)(A,w,C,!1,null,null,null),E=H.exports,b={name:"widget-settings",components:{LocationsList:L,AddLocationForm:E},methods:{toggleEditing(){this.$store.commit("TOGGLE_EDITING",!1)}}},V=b,T=(0,v.Z)(V,c,l,!1,null,null,null),M=T.exports,O=function(){var t=this,i=t._self._c;return i("div",{staticClass:"widget-view"},[i("button",{staticClass:"widget-view__settings-button",on:{click:t.toggleEditing}},[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"}})])]),i("div",{staticClass:"widget-view__content"},t._l(t.weather,(function(e){return i("div",{key:e.id,staticClass:"widget-view__item"},[i("div",{staticClass:"widget-view__location"},[t._v(" "+t._s(`${e.name}, ${e.sys.country}`)+" ")]),i("div",{staticClass:"widget-view__weather"},[i("img",{staticClass:"widget-view__weather-icon",attrs:{src:`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,alt:"weather"}}),i("p",{staticClass:"widget-view__weather-text"},[t._v(" "+t._s(Math.round(e.main.temp))+"°C ")])]),i("div",{staticClass:"widget-view__description"},[t._v(" "+t._s(`Feels like ${Math.round(e.main.feels_like)}. ${e.weather[0].main} (${e.weather[0].description})`)+" ")]),i("div",{staticClass:"widget-view__other"},[i("ul",{staticClass:"widget-view__other-list"},[i("li",{staticClass:"other-data-item",attrs:{title:"Wing direction & speed"}},[i("i",[i("svg",{style:`transform: rotate(${e.wind.deg+180}deg)`,attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"}})])]),i("p",[t._v(t._s(`${e.wind.speed} m/s`))])]),i("li",{staticClass:"other-data-item",attrs:{title:"Pressure"}},[i("i",[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V17H9V7M11,9V11H13V9H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"}})])]),i("p",[t._v(t._s(e.main.pressure)+"hPa")])]),i("li",{staticClass:"other-data-item",attrs:{title:"Humidity"}},[i("i",[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z"}})])]),i("p",[t._v(t._s(e.main.humidity)+"%")])]),i("li",{staticClass:"other-data-item",attrs:{title:"Visibility"}},[i("i",[i("svg",{attrs:{viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"}})])]),i("p",[t._v(t._s(e.visibility)+"km")])])])])])})),0)])},x=[],$={name:"weather-widget-view",computed:{...(0,h.Se)({weather:"GET_WEATHER",editing:"GET_EDITING"})},methods:{toggleEditing(){this.$store.commit("TOGGLE_EDITING",!0)}}},I=$,S=(0,v.Z)(I,O,x,!1,null,null,null),W=S.exports,Z={name:"weather-widget",components:{WeatherWidgetSettings:M,WeatherWidgetView:W},props:{},data(){return{}},computed:{...(0,h.Se)({editing:"GET_EDITING"})},mounted(){this.$store.commit("UPDATE_LOCATIONS"),this.$store.dispatch("check")},methods:{}},D=Z,k=(0,v.Z)(D,n,r,!1,null,null,null),G=k.exports,N={name:"App",components:{WeatherWidget:G}},P=N,j=(0,v.Z)(P,s,a,!1,null,null,null),R=j.exports;o.ZP.use(h.ZP);const B=new h.ZP.Store({state:{editing:!1,weather:[],locations:[]},getters:{GET_LOCATIONS(t){return t.locations},GET_WEATHER(t){return t.weather},GET_EDITING(t){return t.editing}},mutations:{TOGGLE_EDITING:(t,i)=>{t.editing=i},UPDATE_LOCATIONS(t){let i=JSON.parse(localStorage.getItem("locations"));t.locations=null!==i?i:[]},UPDATE_WEATHER(t,i){t.weather.sort(((t,e)=>i.indexOf(t.location_id)-i.indexOf(e.location_id)))},ADD_WEATHER(t,i){t.weather.push(i)},REMOVE_WEATHER(t,i){t.weather.splice(i,1)}},actions:{setLocalStorageLocations({commit:t},i){localStorage.setItem("locations",JSON.stringify(i)),t("UPDATE_LOCATIONS")},async check({state:t,dispatch:i}){t.locations[0]||await i("getUserLocaiton").then((t=>{let e=[{city:t.city,country:t.country,location_id:new Date}];i("setLocalStorageLocations",e)})),i("loadData")},async getUserLocaiton(){try{let t=await f.Z.get("https://ipinfo.io/json?token=25ec73b549150d");return t.data}catch(t){console.log(t)}},async loadData({state:t,dispatch:i}){for(let e=0;e<t.locations.length;e++){const o={city:t.locations[e].city,country:t.locations[e].country,location_id:t.locations[e].location_id};await i("getWeather",o)}},async getWeather({commit:t},i){try{await f.Z.get(`https://api.openweathermap.org/data/2.5/weather?q=${i.city},${i.country}&units=metric&appid=6d7941780ab2639cb20864db54125426`).then((e=>{let o=e.data;o.location_id=i.location_id,t("ADD_WEATHER",o)})).catch((t=>{console.log(t)}))}catch(e){console.log(e)}}},modules:{}});var U=B;o.ZP.config.productionTip=!1,new o.ZP({store:U,render:t=>t(R)}).$mount("#app")}},i={};function e(o){var s=i[o];if(void 0!==s)return s.exports;var a=i[o]={exports:{}};return t[o](a,a.exports,e),a.exports}e.m=t,function(){var t=[];e.O=function(i,o,s,a){if(!o){var n=1/0;for(d=0;d<t.length;d++){o=t[d][0],s=t[d][1],a=t[d][2];for(var r=!0,c=0;c<o.length;c++)(!1&a||n>=a)&&Object.keys(e.O).every((function(t){return e.O[t](o[c])}))?o.splice(c--,1):(r=!1,a<n&&(n=a));if(r){t.splice(d--,1);var l=s();void 0!==l&&(i=l)}}return i}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[o,s,a]}}(),function(){e.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(i,{a:i}),i}}(),function(){e.d=function(t,i){for(var o in i)e.o(i,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:i[o]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){var t={143:0};e.O.j=function(i){return 0===t[i]};var i=function(i,o){var s,a,n=o[0],r=o[1],c=o[2],l=0;if(n.some((function(i){return 0!==t[i]}))){for(s in r)e.o(r,s)&&(e.m[s]=r[s]);if(c)var d=c(e)}for(i&&i(o);l<n.length;l++)a=n[l],e.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return e.O(d)},o=self["webpackChunkweather_widget_vuecli_web_app"]=self["webpackChunkweather_widget_vuecli_web_app"]||[];o.forEach(i.bind(null,0)),o.push=i.bind(null,o.push.bind(o))}();var o=e.O(void 0,[998],(function(){return e(5008)}));o=e.O(o)})();
//# sourceMappingURL=app.de377f1e.js.map