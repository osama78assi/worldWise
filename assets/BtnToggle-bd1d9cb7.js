import{g as l,j as t,L as g}from"./index-bbe1da8d.js";var p={exports:{}},y="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",m=y,u=m;function a(){}function c(){}c.resetWarningCache=a;var f=function(){function e(v,P,R,d,j,i){if(i!==u){var n=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw n.name="Invariant Violation",n}}e.isRequired=e;function o(){return e}var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:o,element:e,elementType:e,instanceOf:o,node:e,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:c,resetWarningCache:a};return r.PropTypes=r,r};p.exports=f();var T=p.exports;const s=l(T),h="_logo_1x8e7_1",_={logo:h};function S(){return t.jsx(g,{to:"/",children:t.jsx("img",{src:"./logo.png",alt:"WorldWise logo",className:_.logo})})}const b={"btn-toggle":"_btn-toggle_3t1w7_1"};function x({onToggle:e,defineClass:o=""}){return t.jsx("button",{className:`${b["btn-toggle"]} ${o}`,onClick:()=>e(),children:t.jsx("img",{src:"/public/burger-menu-svgrepo-com.svg"})})}x.proptype={onToggle:s.func,defineClass:s.array};export{x as B,S as L};