(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){e.exports={container:"image-view_container__2SZVi"}},105:function(e,t,n){e.exports=n(293)},110:function(e,t,n){},17:function(e,t,n){e.exports={ProjectList:"project-list_ProjectList__3auL8",ProjectItem:"project-list_ProjectItem__VzQ9_",Right:"project-list_Right__2Ust4",Title:"project-list_Title__1EttB",Tags:"project-list_Tags__1tDr9",Description:"project-list_Description__XuPEy",Badge:"project-list_Badge__3zuZo"}},235:function(e,t,n){},236:function(e,t){},254:function(e,t){},289:function(e,t,n){},293:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(90),c=n.n(o),i=n(101),l=n(16);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(110);var s=n(2),u=n(3),p=n(5),h=n(4),m=n(6),d=n(25),f=n.n(d),g=n(35),v=n.n(g),b=n(37),j=n.n(b),y=n(36),E=n(38),O=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("header",{className:j.a.header},r.a.createElement("p",{className:j.a.headerTitle},r.a.createElement("a",{href:"/",className:j.a.headerLink},"Aguang's Blog")),r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:"https://t.me/aguang_xyz"},r.a.createElement(y.b,null))),r.a.createElement("li",null,r.a.createElement("a",{href:"https://github.com/aguang-xyz"},r.a.createElement(E.a,null))),r.a.createElement("li",null,r.a.createElement("a",{href:"https://www.linkedin.com/in/wang-guangrui-80337a193/"},r.a.createElement(E.b,null))),r.a.createElement("li",null,r.a.createElement("a",{href:"mailto:aguang.xyz@gmail.com"},r.a.createElement(E.c,null))))))}}]),t}(r.a.Component),k=n(91),_=n.n(k),x=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:_.a.container},r.a.createElement("input",{placeholder:"Search..",value:this.props.change,onChange:function(t){return e.props.onChange(t.target.value)}}))}}]),t}(r.a.Component),w=n(104),C=n(51),N=n(92),L=n.n(N),M={mobile:[[],[[0,0]],[[0,0],[1,1],[1,1]],[[0,0],[1,2],[1,2]],[[0,0],[1,2],[1,3],[1,3]],[[0,0],[1,2],[1,4],[3,4]]],desktop:[[],[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],[[0,0,0,1,1,1],[0,0,0,1,1,1],[0,0,0,1,1,1]],[[0,0,0,1,1,1],[0,0,0,1,1,1],[0,0,0,2,2,2],[0,0,0,2,2,2]],[[0,0,0,1,1,2],[0,0,0,1,1,2],[0,0,0,3,3,3],[0,0,0,3,3,3]],[[0,0,0,1,1,2],[0,0,0,1,1,2],[0,0,0,4,4,4],[3,3,3,4,4,4],[3,3,3,4,4,4]],[[0,0,0,1,1,2],[0,0,0,1,1,2],[0,0,0,5,5,5],[3,4,4,5,5,5],[3,4,4,5,5,5]]]},S=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={layout:n.getLayout()},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"getLayout",value:function(){return window.innerWidth<=600?M.mobile:M.desktop}},{key:"getColumns",value:function(e){return e[1][0].length}},{key:"getMaxElements",value:function(e){return e.length-1}},{key:"getStyle",value:function(){for(var e=this,t=this.state.layout,n=this.props.style?this.props.style:{},a=r.a.Children.toArray(this.props.children),o=this.getColumns(t),c="",i=0,l=function(e){i++,c+="'".concat(e,"'\n")},s=function(n){var r=Object(C.min)([a.length-n,e.getMaxElements(t)]);Object(C.cloneDeep)(t[r]).map(function(e){return e.map(function(e){return"p".concat(e+n)})}).map(function(e){return e.join(" ")}).forEach(l),u=n+=r},u=0;u<a.length;)s(u);return console.log(c),Object(w.a)({gridTemplateRows:"repeat(".concat(i,", 10rem)"),gridTemplateColumns:"repeat(".concat(o,", 1fr)"),gridTemplateAreas:c},n)}},{key:"componentDidMount",value:function(){var e=this;this._resizeHandler=window.addEventListener("resize",function(){e.setState({layout:e.getLayout()})})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this._resizeHandler)}},{key:"getClassName",value:function(){var e=[L.a.container];return this.props.className&&e.push(this.props.className),e.join(" ")}},{key:"render",value:function(){return r.a.createElement("div",{className:this.getClassName(),style:this.getStyle()},r.a.Children.map(this.props.children,function(e,t){return r.a.createElement("div",{key:t,style:{gridArea:"p".concat(t)}},e)}))}}]),t}(r.a.Component),T=n(52),z=n.n(T),A=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:z.a.container},r.a.createElement("a",{className:z.a.button,href:this.props.url,title:"Fee this page."},r.a.createElement(y.a,null)))}}]),t}(r.a.Component),D=n(53),P=n.n(D),B=n(93),R=n.n(B),U=n(94),W=n.n(U),I=n(95),F=n.n(I),$=(n(235),n(96)),G=n(54),J=n.n(G),V=n(97),H=n.n(V),Z=n(98),q=n.n(Z),Q=n(99),K=n.n(Q),X=new $.a({render:J.a.render,Module:J.a.Module}),Y=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={graph:null},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"updateGraph",value:function(e){var t=this,n=e.engine||"dot",a=e.content;X.renderString(a,{engine:n}).then(function(e){e=q.a.sanitize(e),t.setState({graph:e})})}},{key:"componentDidMount",value:function(){this.updateGraph(this.props)}},{key:"componentDidUpdate",value:function(e){e.engine===this.props.engine&&e.content===this.props.content||this.updateGraph(this.props)}},{key:"render",value:function(){return r.a.createElement("div",{className:K.a.container},H()(this.state.graph))}}]),t}(r.a.Component),ee=n(7),te=n.n(ee),ne=(n(269),n(270),n(88),n(89),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(283),n(284),n(285),n(286),n(287),n(288),n(289),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(p.a)(this,Object(h.a)(t).call(this,e))).textarea=r.a.createRef(),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"getMode",value:function(e){return{c:"text/x-csrc","c++":"text/x-c++src",cs:"text/x-csharp",bash:"text/x-sh",javascript:"text/javascript",python:"text/x-python",xml:"text/xml",yaml:"text/yaml"}[e.language]}},{key:"bindCodeMirror",value:function(e){if(this.textarea.current){var t={readOnly:!0,indentUnit:2,tabSize:2,indentWithTabs:!1,keyMap:"vim",lineNumbers:!0,matchBrackets:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],extraKeys:{"Ctrl-F":function(e){e.setOption("fullScreen",!e.getOption("fullScreen"))},Esc:function(e){e.setOption("fullScreen",!1)},"Ctrl-A":function(e){e.execCommand("selectAll")}},theme:"solarized dark",viewportMargin:1/0,lineWrapping:!1,mode:this.getMode(this.props)};te.a.fromTextArea(this.textarea.current,t)}}},{key:"componentDidMount",value:function(){this.bindCodeMirror(this.props)}},{key:"render",value:function(){var e=this.props,t=e.language,n=e.content;return"dot"===t?r.a.createElement(Y,{engine:"dot",content:n}):r.a.createElement("textarea",{ref:this.textarea,defaultValue:n})}}]),t}(r.a.Component)),ae=n(55),re=n.n(ae),oe=(n(291),n(56)),ce=n.n(oe),ie={Block:function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.content;return r.a.createElement("span",{className:ce.a.block},r.a.createElement(re.a,null,e))}}]),t}(r.a.Component),Inline:function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.content;return r.a.createElement("span",{className:ce.a.inline},r.a.createElement(re.a,null,e))}}]),t}(r.a.Component)},le=f.a.create({baseURL:"/posts"}),se=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={content:"Loading.."},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"parseTitle",value:function(e){for(var t=e.split("\n"),n=0;n<t.length;n++)if(t[n].startsWith("# "))return t[n].substring(2);return null}},{key:"loadContent",value:function(e){var t=this;le.get("".concat(e,".md")).then(function(e){if(200!==e.status)throw new Error("Failed to load");var n=t.parseTitle(e.data);null===n||t.props.preview||(document.title=n),t.setState({content:e.data})}).catch(function(e){t.setState({content:"# Page not found"})})}},{key:"componentDidMount",value:function(){this.loadContent(this.props.id)}},{key:"componentDidUpdate",value:function(e){e.id!==this.props.id&&this.loadContent(this.props.id)}},{key:"render",value:function(){var e=this,t=[F.a.container,"markdown-body"];return this.props.preview&&t.push("preview"),r.a.createElement("article",{className:"".concat(t.join(" "))},r.a.createElement(R.a,{source:this.state.content,plugins:[W.a],renderers:{math:function(e){return r.a.createElement(ie.Block,{content:"$$".concat(e.value,"$$")})},inlineMath:function(e){return r.a.createElement(ie.Inline,{content:"$".concat(e.value,"$")})},code:function(t){var n=t.language,a=t.value;return e.props.preview&&"dot"!==n?r.a.createElement("pre",null,r.a.createElement("code",null,a)):r.a.createElement(ne,{language:n,content:a})}}}))}}]),t}(r.a.Component),ue=n(100),pe=n.n(ue),he=function(e){return r.a.createElement("div",{className:pe.a.container,style:{backgroundImage:"url(".concat(e.src,")")}})},me=function(e){var t=[P.a.container];return e.image&&t.push(P.a.imageContainer),r.a.createElement("div",{className:t.join(" "),style:e.style,onClick:function(){return window.location.assign(function(e){return e.link?e.link:"#/post/".concat(e.id)}(e))}},r.a.createElement("figcaption",null,r.a.createElement("p",null,e.title)),function(e){return e.image?r.a.createElement(he,{src:e.image}):r.a.createElement(se,{id:e.id,preview:!0})}(e))},de=f.a.create({baseURL:"posts"}),fe=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",posts:[],search:""},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"loadContent",value:function(e){var t=this,n=e.match.params.category;de.get(n?"".concat(n,"/index.yaml"):"index.yaml").then(function(e){if(200!==e.status)throw new Error("Failed to load");var n=v.a.safeLoad(e.data),a=n.title,r=n.posts;t.setState({title:a,posts:r})}).catch(function(e){t.setState({title:"",posts:[]})})}},{key:"componentDidMount",value:function(){this.loadContent(this.props)}},{key:"filteredPosts",value:function(){var e=this.state,t=e.search;return e.posts.filter(function(e){return-1!==e.title.toLowerCase().indexOf(t.toLowerCase())})}},{key:"getRssPath",value:function(){var e=this.props.match.params.category;return e?"/posts/".concat(e,"/index.rss"):"/posts/index.rss"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{minHeight:"100vh",backgroundColor:"#000"}},r.a.createElement(O,null),r.a.createElement(x,{value:this.state.search,onChange:function(t){e.setState({search:t})}}),r.a.createElement(S,null,this.filteredPosts().map(function(e,t){return r.a.createElement(me,Object.assign({key:e.id},e))})),r.a.createElement(A,{url:this.getRssPath()}))}}]),t}(r.a.Component),ge=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.match.params,t=e.category,n=e.name;return r.a.createElement("div",null,r.a.createElement(O,null),r.a.createElement(se,{id:"".concat(t,"/").concat(n)}))}}]),t}(r.a.Component),ve=n(17),be=n.n(ve),je=f.a.create({baseURL:"posts"}),ye=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.post,t=e.image||"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";return r.a.createElement("div",{className:be.a.ProjectItem,onClick:function(){window.open(e.link)}},r.a.createElement("img",{src:t,alt:e.title}),r.a.createElement("div",{className:be.a.Right},r.a.createElement("div",{className:be.a.Title},e.title),r.a.createElement("div",{className:be.a.Tags},e.badge&&e.badge.map(function(t){return r.a.createElement("img",{className:be.a.Badge,src:t,alt:e.title})}),e.stack&&e.stack.map(function(e){return r.a.createElement("strong",null,e)})),r.a.createElement("div",{className:be.a.Description},e.description)))}}]),t}(r.a.Component),Ee=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",posts:[]},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"loadContent",value:function(){var e=this;je.get("projects/index.yaml").then(function(t){if(200!==t.status)throw new Error("Failed to load");var n=v.a.safeLoad(t.data),a=n.title,r=n.posts;e.setState({title:a,posts:r})}).catch(function(t){e.setState({title:"",posts:[]})})}},{key:"componentDidMount",value:function(){this.loadContent()}},{key:"render",value:function(){return r.a.createElement("div",{className:be.a.ProjectList},this.state.posts.map(function(e){return r.a.createElement(ye,{key:e.id,post:e})}),r.a.createElement(A,{url:"/posts/projects/index.rss"}))}}]),t}(r.a.Component),Oe=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(O,null),r.a.createElement(Ee,null))}}]),t}(r.a.Component);c.a.render(r.a.createElement(function(){return r.a.createElement(i.a,null,r.a.createElement(l.a,{path:"/",exact:!0,component:fe}),r.a.createElement(l.a,{path:"/post/:category",exact:!0,component:fe}),r.a.createElement(l.a,{path:"/post/:category/:name",exact:!0,component:ge}),r.a.createElement(l.a,{path:"/projects",exact:!0,component:Oe}))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},37:function(e,t,n){e.exports={header:"header_header__2eggW",headerTitle:"header_headerTitle__3mVQF",headerLink:"header_headerLink__qLoAr"}},52:function(e,t,n){e.exports={container:"feed-button_container__3JduV",button:"feed-button_button__1__k_"}},53:function(e,t,n){e.exports={container:"post-preview_container__wJEqz"}},56:function(e,t,n){e.exports={block:"latex_block__2TW2n",inline:"latex_inline__gYLjT"}},75:function(e,t){},76:function(e,t){},91:function(e,t,n){e.exports={container:"search-box_container__tJoFh"}},92:function(e,t,n){e.exports={container:"grid-flow_container__2UUId"}},95:function(e,t,n){e.exports={container:"post-view_container__3ZSNx"}},99:function(e,t,n){e.exports={container:"graphviz_container__20tt1"}}},[[105,1,2]]]);
//# sourceMappingURL=main.6e8e864f.chunk.js.map