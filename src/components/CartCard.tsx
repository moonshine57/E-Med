import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption} from '@ionic/react'
import { Link } from 'react-router-dom';
import './CartCard.css';
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

type State = {  
  favorited: boolean,
  favoritesCount: number
}

class CartCard extends React.Component<Props, State> {

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
  let url = CONFIG.API_ENDPOINT+"carts"
   return (                 
           <IonItem>
              <img src={image} slot="start" width = '40%'/>              
              <IonGrid >
                <IonRow>
                  <IonCol size="8">
                  <Link className="sname" to={url}>
                  同仁堂药店</Link>
                  </IonCol >
                </IonRow>
                
               <IonRow>
                <Link className="pname" to={url} text-left>同仁堂感冒灵颗粒</Link>              
                </IonRow>
               
                 <IonRow> 
                  <IonCol  size="6" text-left>                  
                  <p className="price" >￥25.86</p>        
                  </IonCol>
                </IonRow>
                
               <IonRow> 
                <IonCol size="6" text-right>
                 <span className="psum">数量：1</span>
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

export default CartCard