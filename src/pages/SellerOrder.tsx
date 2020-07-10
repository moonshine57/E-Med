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
    fetch(CONFIG.API_ENDPOINT+"sup_med/sup_check_order/", {
            method: 'POST',
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
            orders: res,
            segment: "order1"
          });
          console.log(res);
         let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(this.state.orders[i].ordstatus==="未发货")
              {this.state.order1.push(this.state.orders[i]);}
          }
         console.log(this.state.order1);
         this.setState({orders:this.state.order1});
         console.log(this.state.orders);
        },
       
        (err) => {
            console.error(err);
        }
      )
  }

 
  
 order1 = () => {
  this.setState({segment:"order1"})
   fetch(CONFIG.API_ENDPOINT+"sup_med/sup_check_order/", {
            method: 'POST',
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
            orders: res,
            segment: "order1"
          });
          this.setState({order1:[]});
          let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(this.state.orders[i].ordstatus==="未发货")
              {this.state.order1.push(this.state.orders[i]);}
          }
          this.setState({orders:this.state.order1});
        },
         
       
        (err) => {
            console.error(err);
        }
      )
 }
  order2 = () => {
  this.setState({segment:"order2"})
    fetch(CONFIG.API_ENDPOINT+"sup_med/sup_check_order/", {
            method: 'POST',
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
            orders: res,
            segment: "order2"
          });
         console.log(res);
         this.setState({order2:[]});
         let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(this.state.orders[i].ordstatus==="商家已发货")
              {this.state.order2.push(this.state.orders[i]);}
          }
         console.log(this.state.order2);
          this.setState({orders:this.state.order2});
        },
       
        (err) => {
            console.error(err);
        }
      )
 }
  order3 = () => {
  this.setState({segment:"order3"})
    fetch(CONFIG.API_ENDPOINT+"sup_med/sup_check_order/", {
            method: 'POST',
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
            orders: res ,
            segment: "order3"
          });
          this.setState({order3:[]});
         let i;
          let len;
          for(i=0,len=this.state.orders.length; i< len;i++)
          { if(this.state.orders[i].ordstatus==="交易成功")
              {this.state.order3.push(this.state.orders[i]);}
          }
         console.log(this.state.order3);
          this.setState({orders:this.state.order3});
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
                  <IonCol  size="10" text-center>
                  <p className="opname">当前无待发货订单</p>        
                  </IonCol>
                </IonRow>
          :
          <>{this.state.order1.map((order: any) =>
          <SellerOrd1Card ordno={order.ordno} uid={order.uid} ordprice={order.ordprice} add_time={order.add_time} xinx={order.xinx} expno={order.expno} inexpno={order.inexpno} upexpno={order.upexpno}></SellerOrd1Card>)}</>}
          </IonList>
        );
      case 'order2':
        return  (
          <IonList>
           {this.state.order2[0] ===undefined? 
          <IonRow> 
                  <IonCol  size="10" text-center>                  
                  <p className="opname">当前无已发货订单</p>        
                  </IonCol>
                </IonRow>
          :
          <>{this.state.order2.map((order: any) =>
          <SellerOrd2Card ordno={order.ordno} uid={order.uid} ordprice={order.ordprice} add_time={order.add_time} xinx={order.xinx} expno={order.expno}></SellerOrd2Card>)}</>}
          </IonList>
        );
      case 'order3':
        return (
         <IonList>
           {this.state.order3[0] ===undefined? 
          <IonRow> 
                  <IonCol  size="10" text-center>                  
                  <p className="opname">当前无已完成订单</p>        
                  </IonCol>
                </IonRow>
          :
          <>{this.state.order3.map((order: any) =>
          <SellerOrd3Card ordno={order.ordno} uid={order.uid} ordprice={order.ordprice} pro={order.pro} expno={order.expno} psum={order.psum} incart={order.incart}></SellerOrd3Card>)}</>}
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
         
           <p className="title">{"药店：" +localStorage.getItem("username")}</p>
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