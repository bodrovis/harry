(function(){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e))return t;t=t.parentElement||t.parentNode}while(t!==null&&t.nodeType===1)return null});function e(){document.location.hash="#"+this.getAttribute("id")}function t(e){document.readyState!=="loading"?e():document.addEventListener("DOMContentLoaded",e)}t(function(){var t=document.querySelector(".main-menu .dropdown .is-active");!t||t.closest(".has-children").classList.add("is-active"),document.addEventListener("click",function(t){for(var n=t.target;n&&n!=this;n=n.parentNode)if(n.matches(".page-num")){e.apply(n.closest(".row"));break}},!1),document.addEventListener("click",function(t){for(var n=t.target;n&&n!=this;n=n.parentNode)if(n.matches(".chapter-title")){e.apply(n);break}},!1),document.addEventListener("click",function(e){for(var t=e.target;t&&t!=this;t=t.parentNode)if(t.matches(".js-show-dialog")){e.preventDefault(),document.querySelector(t.getAttribute("data-target")).style.display="block";break}},!1),document.onkeydown=function(e){e=e||window.event;var t=!1;"key"in e?t=e.key==="Escape"||e.key==="Esc":t=e.code===27,t&&(document.querySelector(".js-dialog").style.display="none")},document.addEventListener("click",function(e){for(var t=e.target;t&&t!=this;t=t.parentNode)if(t.matches(".js-close-dialog")){e.preventDefault(),t.closest(".js-dialog").style.display="none";break}},!1),document.addEventListener("click",function(e){for(var n,t=e.target;t&&t!=this;t=t.parentNode)if(t.matches(".js-menu-toggler")){e.preventDefault(),n=t.closest(".js-menu"),n.querySelector(t.getAttribute("data-target")).classList.toggle("visible");break}},!1),document.addEventListener("click",function(e){for(var n,s,t=e.target;t&&t!=this;t=t.parentNode)if(t.matches(".js-show-toggle")){e.preventDefault(),s=t.getAttribute("data-target"),n=t.parentNode,n.classList.toggle("opened"),n.querySelector(s).classList.toggle("hidden");break}},!1)})})()