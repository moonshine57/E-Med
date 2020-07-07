import React from 'react';
import {   IonCard, IonCardContent,IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './goodlist.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import {remove,add} from 'ionicons/icons';


type Props = {  
  did: number,
  dprove: string,
  dname: string,
  dtitle:string,
}

type State = {  
 
}


class CheckListDoc extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
   
      incart:true
    }
  }

checkAction = () => {
  console.log("勾选事件")
  let url = CONFIG.API_ENDPOINT+"XXXXXX"
  let checkcart = {"did":this.props.did}
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(checkcart)
    })
  
  }

card(){

   return (  
      
       <IonItem>
        <IonLabel>资质证明号：{this.props.dprove}</IonLabel>
        <IonLabel>医生姓名：{this.props.dname}</IonLabel>
        <IonCheckbox slot="start"  onChange={this.checkAction}></IonCheckbox >
      </IonItem>
   
  )
}  

  render() {   
      return (
        <>
        {this.card()} <IonItem><p>  </p></IonItem>
        {/*localStorage.getItem("isLogin") === "true" ? this.loggedInCard() : this.loggedOutCard()*/} 
      </>               
      );    
  }
}

export default CheckListDoc