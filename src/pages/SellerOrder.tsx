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
type State = { orders: Array<any>, segment: string, order1:Array<any>, order2:Array<any>, order3:Array<any>,};


class SellerOrderPage extends React.Component<Props & RouteComponentProps<any>, State> {
 
   constructor(props: any){
    super(props);

    this.state = {     
      orders: [],              
      segment: "order1",
      order1: [],
      order2: [],
      order3: []
    }    
  }
  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT+"articles", {
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
          this.setState({           
            orders: res.articles,
            segment: "order1"
          });
         let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(JSON.stringify(this.state.orders[i].ordstatus)==="未发货")
              {this.state.order1.push(this.state.orders[i]);}
          }
         console.log(this.state.order1);
        },
       
        (err) => {
            console.error(err);
        }
      )
  }

 
  
 order1 = () => {
  this.setState({segment:"order1"})
   fetch(CONFIG.API_ENDPOINT+"articles", {
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
          this.setState({           
            orders: res.articles,
            segment: "order1"
          });
          let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(JSON.stringify(this.state.orders[i].ordstatus)==="未发货")
              {this.state.order1.push(this.state.orders[i]);}
          }
        },
         
       
        (err) => {
            console.error(err);
        }
      )
 }
  order2 = () => {
  this.setState({segment:"order2"})
    fetch(CONFIG.API_ENDPOINT+"articles", {
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
          this.setState({           
            orders: res.articles,
            segment: "order2"
          });
         let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(JSON.stringify(this.state.orders[i].ordstatus)==="已发货")
              {this.state.order2.push(this.state.orders[i]);}
          }
         console.log(this.state.order2);
        },
       
        (err) => {
            console.error(err);
        }
      )
 }
  order3 = () => {
  this.setState({segment:"order3"})
    fetch(CONFIG.API_ENDPOINT+"articles", {
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
          this.setState({           
            orders: res.articles,
            segment: "order3"
          });
         let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(JSON.stringify(this.state.orders[i].ordstatus)==="已完成")
              {this.state.order3.push(this.state.orders[i]);}
          }
         console.log(this.state.order3);
        },
       
        (err) => {
            console.error(err);
        }
      )
 }
  renderSwitch(props:string) {
   
    switch(props) {
      case 'order1':
        return  (
         <IonList>
           {this.state.order1[0] ===undefined? 
          <IonRow> 
                  <IonCol  size="6" text-center>
                  <p className="opname">当前无待发货订单</p>        
                  </IonCol>
                </IonRow>
          :
          <>{this.state.order1.map((order: any) =>
          <SellerOrd1Card ordno={order.ordno} pro={order.pro} expno={order.expno} inexpno={order.inexpno} upexpno={order.upexpno}></SellerOrd1Card>)}</>}
          </IonList>
        );
      case 'order2':
        return  (
          <IonList>
           {this.state.order2[0] ===undefined? 
          <IonRow> 
                  <IonCol  size="6" text-center>                  
                  <p className="opname">当前无已发货订单</p>        
                  </IonCol>
                </IonRow>
          :
          <>{this.state.order2.map((order: any) =>
          <SellerOrd2Card ordno={order.ordno} pro={order.pro} psum={order.psum} incart={order.incart}></SellerOrd2Card>)}</>}
          </IonList>
        );
      case 'order3':
        return (
         <IonList>
           {this.state.order3[0] ===undefined? 
          <IonRow> 
                  <IonCol  size="6" text-center>                  
                  <p className="opname">当前无已完成订单</p>        
                  </IonCol>
                </IonRow>
          :
          <>{this.state.order3.map((order: any) =>
          <SellerOrd3Card ordno={order.ordno} pro={order.pro} expno={order.expno} psum={order.psum} incart={order.incart}></SellerOrd3Card>)}</>}
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
       <IonSegment color="tertiary" value="favorite">
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