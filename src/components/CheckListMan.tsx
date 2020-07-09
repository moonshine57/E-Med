import React from 'react';
import {   IonInput,IonRadio,IonCard, IonCardContent,IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './goodlist.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import {remove,add} from 'ionicons/icons';
import DocProCard from '../components/DocProCard';
import {document,eye,home } from 'ionicons/icons';
type Props = {  
  sid: number,
  sname: string,
  sprove:string
}

type State = {  
 pro: Array<any>,
}


class CheckListMan extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
    pro:[]
     //pro:[{pid: 4, pname: "药1"}, {pid: 5, pname: "药2"}],
    }
  }

TrueAction = () => {
  console.log("勾选事件")
  let url = CONFIG.API_ENDPOINT+"/pl_rev/checkSupAuth/"
  let checkcart = {"sid":this.props.sid,"result":"通过"}
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(checkcart)
    })
  
  }

 FalseAction = () => {
  console.log("勾选事件")
  let url = CONFIG.API_ENDPOINT+"/pl_rev/checkSupAuth/"
  let checkcart = {"sid":this.props.sid,"result":"不通过"}
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
      <>
      <IonIcon icon = {document}></IonIcon> 
     <IonLabel >   通过       不通过</IonLabel> 
       <IonItem>
        <IonCheckbox slot="start"  onClick={this.TrueAction}> </IonCheckbox >
        <IonCheckbox slot="start"  onClick={this.FalseAction}>不通过</IonCheckbox >
         <IonLabel>店铺号：{this.props.sid}</IonLabel>
        <IonLabel>店铺名称：{this.props.sname}</IonLabel>
         <IonLabel>审核材料：{this.props.sprove}</IonLabel>
        </IonItem>
      
       
   </>
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

export default CheckListMan