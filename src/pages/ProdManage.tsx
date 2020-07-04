import React from 'react';
import {  IonContent,  IonSegment, IonSegmentButton,IonButton, IonLabel,  IonList, IonAvatar, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption,IonFooter,IonToolbar,IonButtons,IonPage} from '@ionic/react'
import { Link } from 'react-router-dom';
import ProdCard from '../components/ProdCard';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = { props:any };
type State = { articles: Array<any>, segment: string};

class ProdManagePage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      articles: [],              
      segment: "product"
    };    
 
  }  
 
  
  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT+"articles")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            articles: res.articles,
            segment: "product"
          });
        
        },
       
        (err) => {
            console.error(err);
        }
      )
  }


   render() { 
    let url = "newarticle";
        return (
        <> 
        <IonPage>
        <Header title="商品管理"></Header>
 
        <IonContent>
           <IonList>
        {/*this.state.articles.map((article: any) => 
        <CartCard key={article.slug} title={article.title} src={article.author.image} description={article.description} favorited={article.favorited} favoritesCount={article.favoritesCount} slug={article.slug} author={article.author.username} checkbox={article.checkbox} incart={article.incart}></CartCard>)*/}
         {this.state.articles.map((article: any) =>
          <ProdCard psum={article.psum} onsale={article.onsale}></ProdCard>)}
         <IonItem><p>  </p></IonItem>
              </IonList> 
          </IonContent> 
          <IonFooter>
          <IonToolbar>
              <IonButtons slot="start">
              <IonButton color="light" fill = 'solid' size="large"><Link to={url}>
                  上架商品</Link></IonButton>
              </IonButtons>
          </IonToolbar>
         </IonFooter>
         </IonPage>
          </>
      );
    }
  
}
export default ProdManagePage