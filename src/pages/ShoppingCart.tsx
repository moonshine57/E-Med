import React from 'react';
import {  IonContent,  IonSegment, IonSegmentButton,IonButton, IonLabel,  IonList, IonAvatar, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption,IonFooter,IonToolbar,IonButtons,IonPage,IonCheckbox} from '@ionic/react'
import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = { props:any };
type State = { articles: Array<any>, segment: string};


class ShoppingCartPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      articles: [],              
      segment: "cart"
    };    
 
  }  
 
  
  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT+"articles")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            articles: res.articles,
            segment: "cart"
          });
        
        },
       
        (err) => {
            console.error(err);
        }
      )
  }



 

 
   render() { 
        return (
        <> 
        <IonPage>
        <Header title="购物车"></Header>
 
        <IonContent>
           <IonList>
        {/*this.state.articles.map((article: any) => 
        <CartCard key={article.slug} title={article.title} src={article.author.image} description={article.description} favorited={article.favorited} favoritesCount={article.favoritesCount} slug={article.slug} author={article.author.username} checkbox={article.checkbox} incart={article.incart}></CartCard>)*/}
         {this.state.articles.map((article: any) =>
          <CartCard checkbox={article.checkbox} psum={article.psum} incart={article.incart}></CartCard>)}
         <IonItem><p>  </p></IonItem>
              </IonList> 
          </IonContent> 
          <IonFooter>
          <IonToolbar>
              <IonButtons slot="start">
              <IonButton color="warning" fill = 'solid'>全选</IonButton>
              </IonButtons>
               <p className="price" slot="end" >总价</p>
              <IonButtons slot="end">
              <IonButton color="danger" fill = 'solid'>结算</IonButton>
              </IonButtons>
          </IonToolbar>
         </IonFooter>
         </IonPage>
          </>
      );
    }
  
}
export default ShoppingCartPage