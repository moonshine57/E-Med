import React from 'react';
import {IonModal,IonList,IonIcon,IonSegment,IonContent,IonPage,IonAvatar,IonItem,IonLabel,IonButton,IonSegmentButton,IonGrid,IonRow,IonCol} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../components/Header';
import image from '../assets/images/头像.jpg';
import './BuyerProfile.css';
import {document,eye,home } from 'ionicons/icons';
import { CONFIG } from '../constants';
import { Link } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import RecordCard from '../components/RecordCard';
import ShopInformation from './ShopInformation';


type Props = { props:any };
type State = {ordno:number, display: Array<any>, segment: string,showModal:boolean,prodDetail:Array<any>};


class BuyerProfilePage extends React.Component<Props & RouteComponentProps<any>, State> {
 
   constructor(props: any){
    super(props);
    this.state = {     
      display: [],              
      segment: "order",
      showModal:false,
      prodDetail:[],
      ordno:-1,
    }    
  }
 
  renderSwitch(props:string) {
   
    switch(props) {
      case 'order':
        return   <IonList>{this.state.display.map((order: any) => 
          <OrderCard ordprice = {order.ordprice} key = {order.ordno} sname={order.sname}  ordstatus = {order.ordstatus} pro = {order.pro} ordno = {order.ordno}></OrderCard>
          )}</IonList>
      case 'record':
        return <IonList>{this.state.display.map((record: any) => 
          <RecordCard key = {record.stime} p_picture={record.p_picture} sname={record.sname}  pname = {record.pname} time = {record.stime}></RecordCard>
          )}</IonList>;
      case 'shop':
        return (
          <IonList>
            {this.state.display.map((shop: any) => 
            <IonItem key = {shop.sid}>
            <IonIcon slot="start" src ={shop.logo}></IonIcon>
            <IonLabel>
              <h2>{shop.sname}</h2>
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
            <img src={localStorage.getItem('uimage')?""+localStorage.getItem('uimage'):image} />              
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
          {this.state.ordno != -1?
          <IonModal isOpen={this.state.showModal}>
          <IonList>
          
          {this.state.display[this.state.ordno].pro.map((product: any) =>
          <IonItem><IonRow><IonCol>{product.pname}</IonCol><IonCol text-left>￥{product.price}*{product.psum}</IonCol></IonRow></IonItem>
          )}
          </IonList>
          <IonRow><IonCol>合计</IonCol><IonCol text-left>{this.state.display[this.state.ordno].ordprice}</IonCol></IonRow>
          <div>
                <IonButton onClick={() => this.setState({ showModal: false })}>确认</IonButton>
               
              </div>
          </IonModal>
          :""}
        </IonContent>
        
      </IonPage>
    );
  }
}

export default BuyerProfilePage
