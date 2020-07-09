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
import RecordCard from '../components/RecordCard';


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
        return   <IonList>{this.state.display.map((order: any) => 
          <OrderCard key = {order.ordno} sname={order.sname}  ordstatus = {order.ordstatus} pro = {order.pro} ordno = {order.ordno}></OrderCard>
          )}</IonList>
      case 'record':
        return <IonList>{this.state.display.map((record: any) => 
          <RecordCard key = {record.stime} sname={record.sname}  pname = {record.pname} time = {record.stime}></RecordCard>
          )}</IonList>;
      case 'shop':
        return (
          <IonList>
            {this.state.display.map((shop: any) => 
            <IonItem>
            <IonIcon slot="start" icon = {home}></IonIcon>
            <IonLabel>
              <h2>shop.name</h2>
              <h3>I'm a big deal</h3>
              <p>Listen, I've had a pretty messed up day...</p>
            </IonLabel>
          </IonItem>
            )}
          </IonList>
        );
      default:
        return '';
    }
  }

  componentDidMount() { 
    fetch(CONFIG.API_ENDPOINT+"order_md/getorder/",
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token")
      }
    })
    .then((res) => {
      if (res.status == 200) {
          return res.json();
      }
      else {
          throw new Error();
      }
  }
  ).then((res) => {
      res = JSON.parse(res);
      this.setState({ display: res,
                      segment:"order" })
  },
      (error) => {  
          this.setState({ display: [],
                           segment:"order"})
      })
  }

 
  toggle = (e: any) =>  {
    console.log('9999999999999999');
    console.log(e.detail.value);
    let url,headers,segment:string;
    if(e.detail.value == 'order') {
      console.log("order");
      segment = "order";
      url = CONFIG.API_ENDPOINT+"order_md/getorder/";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": ""+ localStorage.getItem("token")           
    }
    } 
    else if(e.detail.value == 'shop'){
      url = CONFIG.API_ENDPOINT+"user_md/getlikestores/";
     segment = "shop";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": ""+ localStorage.getItem("token")           
    }
            }
    else {
      url = CONFIG.API_ENDPOINT+"user_md/getrecords/";
     segment = "record";
      headers =  {
        "Content-Type": "application/json", 
       "Authorization": ""+ localStorage.getItem("token") 
    } 
    }    
    fetch(url, {
        method: 'GET',
        headers: headers
      }) .then((res) => {
        if (res.status == 200) {
            return res.json();
        }
        else {
            throw new Error();
        }
    }
    ).then((res) => {
        res = JSON.parse(res);
        this.setState({ display: res,
                        segment:segment })
    },
        (error) => {  
          segment = "order";
          this.setState({ display: [],
                          segment:segment})
        })
      
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
           <p className="title">{"用户" +localStorage.getItem("phone")}</p>
           </IonItem>
       <IonSegment  onIonChange={this.toggle} color="tertiary" >
          <IonSegmentButton value="order">
            <IonLabel>我的订单</IonLabel>
            <IonIcon icon ={document}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="shop">
            <IonLabel>关注店铺</IonLabel>
            <IonIcon icon = {home}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="record">
            <IonLabel>浏览记录</IonLabel>
            <IonIcon icon = {eye}></IonIcon>
          </IonSegmentButton>
        </IonSegment>
          {this.renderSwitch(this.state.segment)}

        </IonContent>
      </IonPage>
    );
  }
}

export default BuyerProfilePage
