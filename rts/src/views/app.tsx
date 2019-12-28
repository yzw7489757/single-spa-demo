import * as React from "react";
import { hot, setConfig } from "react-hot-loader";
import * as less from './index.module.less';

setConfig({
  reloadHooks: false
});

interface IProps {
  introduce: string
}
interface IState {
  text:string
}
// class Hello extends React.Component<IProps,IState>{
//    constructor(props:IProps){
//      super(props);
//      this.state = {
//        text: 'Welcome To React!'
//      }
//    }
//     render(){
//       return  (
//         <div className={less.fullPage}>
//           <div className={less.box}>
//             <h1>{this.props.introduce}</h1>
//             <p>{this.state.text}</p>
//           </div>
//         </div>
//       )
//     }
// }

const Hello = (props:IProps)=>(
    <div className={less.fullPage}>
      <div className={less.box}>
        <h1>{props.introduce}</h1>
      </div>
    </div>
)
export default hot(module)(Hello);
