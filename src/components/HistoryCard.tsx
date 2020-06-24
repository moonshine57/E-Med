import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption} from '@ionic/react'
import { Link } from 'react-router-dom';
import './ArticleCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = {  
  title: string,
  src: string,
  description: string,
  favorited: boolean,
  favoritesCount: number,
  slug: string,
  author: string
}

class HistoryCard extends React.Component<Props> {

  constructor(props: Props){
    super(props);

    this.state = {      
      favorited: this.props.favorited,
      favoritesCount: this.props.favoritesCount
    }
    this.routeLink = '/article/'+this.props.slug;
    this.profileLink = '/profile/'+this.props.author;
    

  }
  routeLink: string;
  profileLink: string;
 
card() {
 let url = CONFIG.API_ENDPOINT+"buyerprofile/orders";
  return (                 
           <IonItem>
              <img src={image} slot="start" width = '40%'/>              
              <IonGrid >
                <IonRow>
                  <IonCol size="8">
                  <Link className="link" to={url}>
                  同仁堂药店</Link>
                </IonCol >
                </IonRow>
                
               <IonRow>
                <p className="name" text-left>同仁堂感冒灵颗粒</p>              
                </IonRow>
                <IonRow>
                 
                </IonRow>
                 <IonRow> 
                  <IonCol  size="6" text-left>                  
                  <p className="price" >￥25.86</p>        
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