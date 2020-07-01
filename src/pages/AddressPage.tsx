import React from 'react';
import { IonListHeader, IonTitle, IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import { Hash, createHash } from 'crypto';

type Props = { props: any };
type State = { toastMessage:string, rname: string, rphone: string, raddress: string, receiveInfo: Array<any>, toastState: boolean };

class AddressPage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      rname: '',
      rphone: '',
      raddress: '',
      receiveInfo: [],
      toastState: false,
      toastMessage:'',
    };

  }



  setRname = (event: any) => {
    this.setState({ rname: event.detail.value });
  };

  setRphone = (event: any) => {
    this.setState({ rphone: event.detail.value });
  };

  setAddress = (event: any) => {
    this.setState({ raddress: event.detail.value });
  };

  addRecieveInfo = (event: any) => {
    let newReceiveInfo:any;
    newReceiveInfo = {
      "rname": this.state.rname,
      "rphone": this.state.rphone,
      "raddress": this.state.raddress,
    }
    fetch(CONFIG.API_ENDPOINT + "user_md/addreceiveinfo/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token")
      },
      body: JSON.stringify(newReceiveInfo)
    })
      .then((res) =>{
        if(res.status == 200){
        return res.json()}
        else{throw new Error()}}
      )
      .then(
        (result) => {
          let arr:Array<any> = this.state.receiveInfo;
          arr.push(newReceiveInfo);
          this.setState({
            toastState: true,
            receiveInfo:arr,
            toastMessage:'新增地址成功'
          })
        },
        (error) => {
          this.setState({
            toastState: true,
            toastMessage:'地址已存在'
          })
        }
      )
  };

  componentWillMount() {
    let url = CONFIG.API_ENDPOINT + 'user_md/getreceiveinfo/';
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token")
      }
    })
      .then((res) => {
        if(res.status == 200){
          return res.json();
       }
       else{
         throw new Error();
       }
      }
      ).then((res)=>{
        res = JSON.parse(res);
        this.setState({receiveInfo:res})
      },
        (error) => {
          this.setState({receiveInfo:[]})
        })
  }

  render() {
    return (
      <>
        <Header title="添加收货地址"> </Header>

        <IonContent>
          <IonToast
            isOpen={this.state.toastState}
            onDidDismiss={() => this.setState(() => ({ toastState: false }))}
            message={this.state.toastMessage}
            duration={1000}
          />
          <IonList>
            <IonListHeader>
              新建地址
        </IonListHeader>
            <IonItem>
              <IonLabel position="fixed">收货人姓名</IonLabel>
              <IonInput onIonChange={this.setRname} type="text" placeholder="输入姓名"
                value={this.state.rname}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">手机号码</IonLabel>
              <IonInput onIonChange={this.setRphone} type="tel" placeholder="输入手机号码"
                value={this.state.rphone}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">地址</IonLabel>
              <IonInput onIonChange={this.setAddress} type="text" placeholder="输入地址"
                value={this.state.raddress}></IonInput>
            </IonItem>
            <IonButton color="success" expand="block" onClick={this.addRecieveInfo}>增加地址</IonButton>
          </IonList>
          <IonList>
            <IonListHeader>
              所有地址
        </IonListHeader>
        {this.state.receiveInfo.map((info: any,index) => 
          <IonItem key = {index}>
          <IonLabel>
            <h2>{info.raddress}</h2>
            <h3>{info.rname}</h3>
            <h3>{info.rphone}</h3>
      </IonLabel>
        </IonItem>
        )}
        
          </IonList>
        </IonContent>
      </>
    )
  }

}

export default AddressPage

