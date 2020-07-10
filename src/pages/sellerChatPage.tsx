import React from 'react';
import io from "socket.io-client";
import { IonContent, IonFooter ,IonPage ,IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList } from '@ionic/react';
import Header from '../components/Header';


const socket = io.connect("http://120.24.164.113:5000");
const uname = ""+localStorage.getItem('username');

type Props = { props: any };
type State = {msg:string,chat:Array<any>,buyerPhone:string};

class SellerChatPage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
        msg:"",
        chat:[],
        buyerPhone:""
    };

  }

  componentDidMount() {
    socket.on("chat message", ({from,to, msg}:{from:any,to:any,msg:any}) => {
      if(to == uname ){
        let name = from;
        this.setState({
            chat: [...this.state.chat, {name , msg }]
        });
      }
      if(from == uname){
        let name = uname;
        this.setState({
          chat: [...this.state.chat, {name, msg }]
      });
      }
    });
  }

  onTextChange = (e: any) => {
    this.setState({ msg: e.target.value });
  };

  setMsgReceiver = (e:any) =>{
    this.setState({buyerPhone:e.target.value});
  };

  onMessageSubmit = () => {
    console.log(uname);
    const msg = this.state.msg;
    const from = uname;
    const to = "用户"+this.state.buyerPhone;
    socket.emit("chat message", { from,to ,msg });
    this.setState({ msg: "" });
  };

  renderChat() {
    return this.state.chat.map(({ name, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{name}：</span>
        <span>{msg}</span>
      </div>
    ));
  }

  render() {
    return (
      <IonPage>
      <Header title="消息"> </Header>
      <IonContent>
      <div>{this.renderChat()}</div>
      </IonContent>
      <IonFooter>
      <div>
        <span>指定回复用户</span>
        <input
          name="receiver"
          onChange={e => this.setMsgReceiver(e)}
          value={this.state.buyerPhone}
        />
      </div>
      <div>
        <span>消息</span>
        <input
          name="msg"
          onChange={e => this.onTextChange(e)}
          value={this.state.msg}
        />
        <button onClick={this.onMessageSubmit}>发送</button>
      </div>
      </IonFooter>
      </IonPage>
    );
  }


}

export default SellerChatPage;
