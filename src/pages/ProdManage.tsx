import React from 'react';
import {  IonContent,  IonSegment, IonSegmentButton,IonButton, IonLabel,  IonList, IonAvatar, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption,IonFooter,IonToolbar,IonButtons,IonPage} from '@ionic/react'
import { Link } from 'react-router-dom';
import ProdCard from '../components/ProdCard';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = { props:any };
type State = { products: Array<any>, segment: string};

class ProdManagePage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      products: [],              
      segment: "product"
    };    
 
  }  
 
  
  componentDidMount() {       
     fetch(CONFIG.API_ENDPOINT+"sup_med/sup_pro_man/", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", 
                "Authorization": ""+localStorage.getItem("token")
            },
         
        })
      .then(res => res.json())
      .then(
        (res) => {
         res = JSON.parse(res);
          console.log(res[0]);
         {res[0]===undefined ? this.setState({segment: "product"}):
        this.setState({           
            products: res[0].pro,
            segment: "product"
          });}
         console.log(res);
         console.log(res[0]);
         console.log(this.state.segment);
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
          {this.state.products[0] ===undefined? 
          <IonRow> 
                  <IonCol  size="6" text-center>                  
                  <p className="pname">当前无已上架商品</p>        
                  </IonCol>
                </IonRow>
          :
           <IonList>
        {/*this.state.articles.map((article: any) => 
        <CartCard key={article.slug} title={article.title} src={article.author.image} description={article.description} favorited={article.favorited} favoritesCount={article.favoritesCount} slug={article.slug} author={article.author.username} checkbox={article.checkbox} incart={article.incart}></CartCard>)*/}
         {this.state.products.map((product: any) =>
          <ProdCard pk={product.pk} pname={product.pname} price={product.price} onsale={true}></ProdCard>)}
         <IonItem><p>  </p></IonItem>
              </IonList> }
          </IonContent> 
          <IonFooter>
          <IonToolbar>
              <IonButtons slot="start">
             <Link to={url}> <IonButton color="light" fill = 'solid' size="large">
                  上架商品</IonButton></Link>
              </IonButtons>
          </IonToolbar>
         </IonFooter>
         </IonPage>
          </>
      );
    }
  
}
export default ProdManagePage