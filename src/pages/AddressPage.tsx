import React from 'react';
import {IonListHeader,IonTitle,IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';

type Props = { props:any };
type State = {username: string, password: string, bio: string, image: string, email: string, toastState: boolean,address:string};

class AddressPage extends React.Component <Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     username: '',
     password: '',     
     bio: '',
     image: '',
     email: '',
     toastState: false,
     address:''
    };       
 
  }

  addAddress = (event: any) => {
  };

  add= () => {};

  render(){
    return(
      <>
        <Header title="添加收货地址"> </Header>
      
        <IonContent>
        <IonList>
        <IonListHeader>
         新建地址
        </IonListHeader>
        <IonItem>
            
              <IonLabel position="fixed">地址</IonLabel>
              <IonInput onIonChange={this.addAddress} type="text" placeholder="输入地址"
                value={this.state.username}></IonInput>
            </IonItem>
            <IonButton color="success" expand="block" onClick={this.add}>增加地址</IonButton>
        </IonList>
        <IonList>
        <IonListHeader>
         所有地址
        </IonListHeader> 
        <IonItem>
          <IonLabel>
              广东省广州市大学城中山大学至善园8号
          </IonLabel>
          <IonButton>删除</IonButton>
        </IonItem>
        <IonItem>
          <IonLabel>
              广东省广州市大学城中山大学慎思园10号
          </IonLabel>
          <IonButton>删除</IonButton>
        </IonItem>
        </IonList>
        </IonContent>
      </>
    )
  }

}

export default AddressPage

