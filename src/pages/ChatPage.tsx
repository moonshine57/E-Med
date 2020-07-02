import React from 'react';
import io from "socket.io-client";
import { IonListHeader, IonTitle, IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList } from '@ionic/react';

const socket = io.connect("http://120.24.164.113:5000");

type Props = { props: any };
type State = {msg:string,chat:Array<any>,shopId:string,shopName:string };

class ChatPage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
        shopId:"",
        msg:"",
        chat:[],
        shopName:""
    };

  }

  componentDidMount() {
    let shopName = this.state.shopName;
    socket.on("chat message", ({shopId, msg}:{shopId:any,msg:any}) => {
      if(shopId == this.state.shopId){
        this.setState({
            chat: [...this.state.chat, {shopName , msg }]
        });
    }
    });
  }

  onTextChange = (e: any) => {
    this.setState({ msg: e.detail.value });
  };

  onMessageSubmit = () => {
    const shopId = this.state.shopId;
    const msg = this.state.msg;
    socket.emit("chat message", { shopId, msg });
    this.setState({ msg: "" });
  };

  renderChat() {
    return this.state.chat.map(({ shopName, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{shopName}: </span>
        <span>{msg}</span>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <span>Message</span>
        <input
          name="msg"
          onChange={e => this.onTextChange(e)}
          value={this.state.msg}
        />
        <button onClick={this.onMessageSubmit}>Send</button>
        <div>{this.renderChat()}</div>
      </div>
    );
  }


}

export default ChatPage;
