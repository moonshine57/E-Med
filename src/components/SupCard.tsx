import React from 'react';
import {  IonAvatar,IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './SupCard.css';
import {star,starHalf} from 'ionicons/icons';
import { CONFIG } from '../constants';
import image from '../assets/images/药店.jpg';


type Props = {  
 sname:string,
 sintro:string
}

type State = { 
}


class SupCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
      
    }
   /* this.routeLink = '/article/'+this.props.slug;
    this.profileLink = '/profile/'+this.props.author;*/
   

  }

card(){
  let purl ="ShopInformation";
   return (  
   
           <IonItem>
             <img src={image} slot="start" width = '40%'/> 
              <IonGrid >
               <IonRow>
                <IonCol size="20">
                <Link className="pname" to={purl} text-left>{this.props.sname}</Link> 
                 </IonCol >
                </IonRow>
               
                <IonRow>
                  <IonCol size="10">
                  <Link className="category" to={purl}>
                  介绍:{this.props.sintro}</Link>
                 </IonCol >
               </IonRow>
           
               
                 <IonRow> 
                  <IonCol  size="20" text-left>                  
                  <p className="price" >星级：<IonIcon icon={star}></IonIcon><IonIcon icon={star}></IonIcon><IonIcon icon={star}></IonIcon><IonIcon icon={star}></IonIcon><IonIcon icon={starHalf}></IonIcon></p>       
                  </IonCol>
                  
                </IonRow>
              
              </IonGrid> 
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

export default SupCard
