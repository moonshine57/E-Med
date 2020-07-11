import React from 'react';
import io from "socket.io-client";
import { IonContent, IonFooter ,IonPage ,IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList } from '@ionic/react';
import Header from '../components/Header';
import { Link,RouteComponentProps } from 'react-router-dom';

const socket = io.connect("http://120.24.164.113:5000");

const sname = ""+localStorage.getItem("sname");


type Props = { props: any };
type State = {msg:string,chat:Array<any>,shopName:string};

class ChatPage extends React.Component<Props & RouteComponentProps<any>, State> {
  uphone = "用户" +localStorage.getItem("phone");
  constructor(props: any) {
    super(props);
    this.state = {
        msg:"",
        chat:[],
        shopName:sname
    };

  }

  componentDidMount() {
    socket.on("chat message", ({from,to, msg}:{from:any,to:any,msg:any}) => {
      if(to == this.uphone || to == "用户"){
        let name = from;
        this.setState({
            chat: [...this.state.chat, {name , msg }]
        });
      }
      if(from == this.uphone){
        let name = this.uphone;
        this.setState({
          chat: [...this.state.chat, {name, msg }]
      });
      }
    });
  }

  onTextChange = (e: any) => {
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit = () => {
    const msg = this.state.msg;
    const from = this.uphone;
    const to = this.state.shopName;
    socket.emit("chat message", { from,to ,msg });
    this.setState({ msg: "" });
  };

  renderChat() {
    return this.state.chat.map(({name, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{name}：</span>
        <span>{msg}</span>
      </div>
    ));
  }

  render() {
    return (
      <IonPage>
      <Header title="客服"> </Header>
      <IonContent>
      <div>{this.renderChat()}</div>
      </IonContent>
      <IonFooter>
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

export default ChatPage;
