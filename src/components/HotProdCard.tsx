import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './ProdCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = {  
 pname:string,
 price:string,
 sname:string,
 pid:string
}

type State = {  
}


class HotProdCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
      
    }
   /* this.routeLink = '/article/'+this.props.slug;
    this.profileLink = '/profile/'+this.props.author;*/
   

  }

card(){
  let purl ="product/"+this.props.pid;
   return (  
   
           <IonItem>
             <img src={image} slot="start" width = '40%'/> 
              <IonGrid >
               <IonRow>
                <IonCol size="20">
                <Link className="pname" to={purl} text-left>{this.props.pname}</Link> 
                 </IonCol >
                </IonRow>
               
                <IonRow>
                  <IonCol size="10">
                  <Link className="category" to={purl}>
                  店家:{this.props.sname}</Link>
                 </IonCol >
               </IonRow>
           
               
                 <IonRow> 
                  <IonCol  size="6" text-left>                  
                  <p className="price" >价格：{this.props.price}</p>        
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

export default HotProdCard
