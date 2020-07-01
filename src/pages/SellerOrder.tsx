import React from 'react';
import {IonList, IonIcon, IonSegment, IonContent, IonPage, IonAvatar, IonItem, IonLabel, IonButton, IonSegmentButton, IonGrid, IonRow, IonCol} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../components/Header';
import image from '../assets/images/商品图片.jpg';
import {airplane,business,home } from 'ionicons/icons';
import { CONFIG } from '../constants';
import { Link } from 'react-router-dom';
import SellerOrd1Card from '../components/SellerOrd1Card';
import SellerOrd2Card from '../components/SellerOrd2Card';
import SellerOrd3Card from '../components/SellerOrd3Card';


type Props = { props:any };
type State = { articles: Array<any>, segment: string};


class SellerOrderPage extends React.Component<Props & RouteComponentProps<any>, State> {
 
   constructor(props: any){
    super(props);

    this.state = {     
      articles: [],              
      segment: "order1"
    }    
  }
  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT+"articles")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            articles: res.articles,
            segment: "order1"
          });
        },
       
        (err) => {
            console.error(err);
        }
      )
  }

 
  toggle = (e: any) =>  {
    let url,headers;
    if(e.detail.value == 'order1') {
      url = CONFIG.API_ENDPOINT+"sellerorders";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": "Token "+ localStorage.getItem("token")           
    }
    } 
    else if(e.detail.value == 'order2'){
      url = CONFIG.API_ENDPOINT+"sellerorders";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": "Token "+ localStorage.getItem("token")           
    }
            }
    else {
      url = CONFIG.API_ENDPOINT+"sellerorders";
      headers =  {
        "Content-Type": "application/json", 
       "Authorization": "Token "+ localStorage.getItem("token") 
    } 
    }    
      fetch(url, {
        method: 'GET',
        headers: headers
      })
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            articles: res.articles,
            segment: e.detail.value
          });
        },
        (err) => {            
            console.error(err);
        }
      )
  }
 order1 = () => {
  this.setState({segment:"order1"})
 }
  order2 = () => {
  this.setState({segment:"order2"})
 }
  order3 = () => {
  this.setState({segment:"order3"})
 }
  renderSwitch(props:string) {
   
    switch(props) {
      case 'order1':
        return  (
         <IonList>
          {this.state.articles.map((article: any) =>
          <SellerOrd1Card psum={article.psum} incart={article.incart}></SellerOrd1Card>)}
          </IonList>
        );
      case 'order2':
        return  (
          <IonList>
          {this.state.articles.map((article: any) =>
          <SellerOrd2Card psum={article.psum} incart={article.incart}></SellerOrd2Card>)}
          </IonList>
        );
      case 'order3':
        return (
         <IonList>
          {this.state.articles.map((article: any) =>
          <SellerOrd3Card psum={article.psum} incart={article.incart}></SellerOrd3Card>)}
          </IonList>
        );
      default:
        return '';
    }
  }

  render(){
    return(
      <IonPage>
        <Header title="订单管理"></Header>

        <IonContent>
           <IonItem>
          <IonAvatar class="ion-margin-vertical">
            <img src={image} />              
          </IonAvatar>
           <p className="title">同仁堂大药房</p>
           </IonItem>
       <IonSegment  onIonChange={this.toggle} color="tertiary" value="favorite">
          <IonSegmentButton value="order1" onClick={this.order1}>
            <IonLabel>待发货</IonLabel>
            <IonIcon icon ={business}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="order2" onClick={this.order2}>
            <IonLabel>已发货</IonLabel>
            <IonIcon icon = {airplane}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="order3" onClick={this.order3}>
            <IonLabel>已完成</IonLabel>
            <IonIcon icon = {home}></IonIcon>
          </IonSegmentButton>
        </IonSegment>
        
          {this.renderSwitch(this.state.segment)}
        

        </IonContent>
      </IonPage>
    );
  }
}

export default SellerOrderPage