import React from 'react';
import {  IonContent,  IonSegment, IonSegmentButton, IonLabel,  IonList, IonAvatar, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption} from '@ionic/react'
import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard';
import { TagCloud } from '../components/TagCloud';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';

type Props = { props:any };
type State = { carts: Array<any>, segment: string};

class ShoppingCartPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      carts: [],              
      segment: "cart"
    };    
 
  }  
 
  
  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT+"carts")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            carts: res.carts,
            segment: "cart"
          });
        
        },
       
        (err) => {
            console.error(err);
        }
      )
  }
 
 card() {
  let url = CONFIG.API_ENDPOINT+"carts"
   return (                 
           <IonItem>
              <img src={image} slot="start" width = '40%'/>              
              <IonGrid >
                <IonRow>
                  <IonCol size="8">
                  <Link className="link" to={url}>
                  同仁堂药店</Link>
                </IonCol >
                <IonCol size="4" text-right>
                 <span className="psum">1</span>
                </IonCol>
                </IonRow>
                
               <IonRow>
                <Link className="link" to={url} text-left>同仁堂感冒灵颗粒</Link>              
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
        <Header title="购物车"></Header>
        <IonContent> 
          
        <IonList>
         {this.card()}
         {this.state.carts.map((article: any) => 
        <CartCard key={article.slug} title={article.title} src={article.author.image} description={article.description} favorited={article.favorited} favoritesCount={article.favoritesCount} slug={article.slug} author={article.author.username}></CartCard>
        )}
         <IonItem><p>  </p></IonItem>
         {this.card()}
        </IonList>
          
        </IonContent>    
      </>
      );
    }
  
}

export default ShoppingCartPage