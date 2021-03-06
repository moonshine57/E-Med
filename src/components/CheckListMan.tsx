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
 check:boolean,
}


class CheckListMan extends React.Component<Props  , State> {

  constructor(props: Props){
    super(props);

    this.state = {      
    pro:[],
     check:true,
     //pro:[{pid: 4, pname: "药1"}, {pid: 5, pname: "药2"}],
    }
  }

TrueAction = () => {
  console.log("勾选事件")
   this.setState({check: false})
  let url = CONFIG.API_ENDPOINT+"pl_rev/checkSupAuth/"
  let checkcart = {"sid":this.props.sid,"result":"通过"}
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(checkcart)
    })
    //this.props.history.replace('/managercheck');
  }

 FalseAction = () => {
  console.log("勾选事件")
   this.setState({check: false})
  let url = CONFIG.API_ENDPOINT+"pl_rev/checkSupAuth/"
  let checkcart = {"sid":this.props.sid,"result":"不通过"}
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(checkcart)
    })
   //this.props.history.replace('/managercheck');
  }

card(){
 
   return (  
    
     <>  
     {
      this.state.check === true ?  
       <>
      <IonIcon icon = {document}></IonIcon> 
     <IonLabel >   通过       不通过</IonLabel> 
       <IonItem>
        <IonCheckbox slot="start"  onClick={this.TrueAction}><Link to={"/managercheck"}></Link> </IonCheckbox >
        <IonCheckbox slot="start"  onClick={this.FalseAction}>不通过</IonCheckbox >
         <IonLabel>店铺号：{this.props.sid}</IonLabel>
        <IonLabel>店铺名称：{this.props.sname}</IonLabel>
       
       
        </IonItem>
      审核材料：
     <IonItem>
          
           <img src={this.props.sprove} slot="start" width = '15%'/> 
      </IonItem>
      
       </>
   
       :
      <>
      <IonIcon icon = {document}></IonIcon> 
     <IonLabel >   已完成审核</IonLabel> 
       <IonItem>
     
         <IonLabel>店铺号：{this.props.sid}</IonLabel>
        <IonLabel>店铺名称：{this.props.sname}</IonLabel>
       
        </IonItem>
      审核材料：
     <IonItem>
          
           <img src={this.props.sprove} slot="start" width = '15%'/> 
      </IonItem>
       </>
       } 
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