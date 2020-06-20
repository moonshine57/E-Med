import React from 'react';
import {IonList,IonIcon,IonSegment,IonContent,IonPage,IonAvatar,IonItem,IonLabel,IonButton,IonSegmentButton,IonGrid,IonRow,IonCol} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../components/Header';
import image from '../assets/images/头像.jpg';
import './BuyerProfile.css';
import {document,eye,home } from 'ionicons/icons';
import { CONFIG } from '../constants';
import { Link } from 'react-router-dom';
import OrderCard from '../components/OrderCard';


type Props = { props:any };
type State = { display: Array<any>, segment: string};


class BuyerProfilePage extends React.Component<Props & RouteComponentProps<any>, State> {
 
   constructor(props: any){
    super(props);

    this.state = {     
      display: [],              
      segment: "order"
    }    
  }
 
 
 
  renderSwitch(props:string) {
   
    switch(props) {
      case 'order':
        return  'order';
      case 'eye':
        return 'eye';
      case 'shop':
        return 'shop';
      default:
        return '';
    }
  }

  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT+"buyerprofile/orders")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            display: res.display,
            segment: "order"
          });
        },
       
        (err) => {
            console.error(err);
        }
      )
  }

 
  toggle = (e: any) =>  {
    let url,headers;
    if(e.detail.value == 'order') {
      url = CONFIG.API_ENDPOINT+"buyerprofile/orders";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": "Token "+ localStorage.getItem("token")           
    }
    } 
    else if(e.detail.value == 'cart'){
      url = CONFIG.API_ENDPOINT+"buyerprofile/cart";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": "Token "+ localStorage.getItem("token")           
    }
            }
    else {
      url = CONFIG.API_ENDPOINT+"buyerprofile/shops";
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
            display: res.display,
            segment: e.detail.value
          });
        },
        (err) => {            
            console.error(err);
        }
      )
  }

  render(){
    return(
      <IonPage>
        <Header title="我的"></Header>

        <IonContent>

          <IonItem>
          <IonAvatar class="ion-margin-vertical">
            <img src={image} />              
          </IonAvatar>
           <p className="title">沐皮</p>
           </IonItem>
       <IonSegment  onIonChange={this.toggle} color="tertiary" value="favorite">
          <IonSegmentButton value="order">
            <IonLabel>我的订单</IonLabel>
            <IonIcon icon ={document}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="shop">
            <IonLabel>关注店铺</IonLabel>
            <IonIcon icon = {home}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>浏览记录</IonLabel>
            <IonIcon icon = {eye}></IonIcon>
          </IonSegmentButton>
        </IonSegment>
        <IonList>
          {this.renderSwitch(this.state.segment)}
        </IonList>

        </IonContent>
      </IonPage>
    );
  }
}

export default BuyerProfilePage