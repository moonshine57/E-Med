import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './SellerOrder.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import {remove,add} from 'ionicons/icons';


type Props = {  
  pid:number,
  pname: string,

}
type State = {  

}



class DocProCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

  }
  
  
card(){
  
  let purl ="product/"+this.props.pid
   return (  
   
           <IonItem>
               <IonRow>
              
                <IonLabel> 药品名称： {this.props.pname}</IonLabel>
                <IonLabel> 药品编号：  {this.props.pid}</IonLabel>
                </IonRow>
     
          </IonItem> 
        
  )
}  

  render() {   
      return (
        <>
        {this.card()}
        {/*localStorage.getItem("isLogin") === "true" ? this.loggedInCard() : this.loggedOutCard()*/} 
      </>               
      );    
  }
}

export default DocProCard