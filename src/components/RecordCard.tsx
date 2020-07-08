import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption} from '@ionic/react'
import { Link } from 'react-router-dom';
import './ArticleCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = {  
  pname: string,
  sname: string,
  time: string,
}

class HistoryCard extends React.Component<Props> {

  constructor(props: Props){
    super(props);
  }
 
card() {
 let url = CONFIG.API_ENDPOINT+"buyerprofile/orders";
  return (                 
           <IonItem>
              <img src={image} slot="start" width = '30%'/>              
              <IonGrid >
                <IonRow>
                  <p className="link">
                  {this.props.sname}</p>
                </IonRow>
                
               <IonRow>
                <p className="name" >{this.props.pname}</p>              
                </IonRow>
                <IonRow>
                 
                </IonRow>
                 <IonRow> 
                  <IonCol  text-left>                  
                  <p className="price" >{this.props.time.substring(0,10)} {this.props.time.substring(11,20)}</p>        
                  </IonCol>
                </IonRow>
              </IonGrid>
            
          </IonItem>    
  )
}  
  render() {   
      return (
        <>
        {this.card()} 
        </>               
      );    
  }
}

export default HistoryCard