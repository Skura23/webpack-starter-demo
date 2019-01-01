// 入口引入css文件, loader识别出css文件, 对其进行'翻译'
import '../css/index.css';
import '../less/less.less';
import img1 from '../images/400x700.png';

console.log('14这是入口文件');
console.log(img1);

const fn=()=>console.log('es6');
fn()

var domA = document.createElement('h1')
domA.textContent = 'hi there'
// document.appendChild(domA)
document.getElementsByTagName('body')[0].appendChild(domA)
// alert('wtf')