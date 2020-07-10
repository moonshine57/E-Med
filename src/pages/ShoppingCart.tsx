import React from 'react';
import {  IonContent,  IonSegment, IonSegmentButton,IonButton, IonLabel,  IonList, IonAvatar, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption,IonFooter,IonToolbar,IonButtons,IonPage,IonCheckbox} from '@ionic/react'
import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = { props:any };
type State = { carts: Array<any>, segment: string,sumprice:number,showsum:boolean};

class ShoppingCartPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      carts: [],              
      segment: "cart",
      sumprice:0.00,
      showsum:false
    };    
 
  }  
 
  
  componentDidMount() {       
    fetch(CONFIG.API_ENDPOINT+"user_md/getcart/", {
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
            carts: res ,
            segment: "cart",
            sumprice:0.00,
            showsum:false
          });
        console.log(res);
        
        },
        
        (err) => {
            console.error(err);
       }
      )
  
  }
 showsum = () => {
   this.setState({showsum:true})
    fetch(CONFIG.API_ENDPOINT+"user_md/getcart/", {
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
            carts: res ,
            sumprice:0,
            showsum:true
          });
         let i;
          let len;
          for(i=0,len=this.state.carts.length; i< len;i++){
          this.setState({sumprice:this.state.sumprice+this.state.carts[i].price*this.state.carts[i].psum})
          }
        },
        
        (err) => {
            console.error(err);
       }
      )
  
 }
  closesum = () => {
   this.setState({showsum:false})
  
 }

   render() { 
    let payurl="cartpay";
        return (
        <> 
        <IonPage>
        <Header title="购物车"></Header>
 
        <IonContent>
         {this.state.carts[0] ===undefined? 
          <IonRow> 
                  <IonCol  size="6" text-center>                  
                  <p className="pname">当前购物车为空</p>        
                  </IonCol>
                </IonRow>
          :
           <IonList>
       {this.state.carts.map((cart: any) =>
          <CartCard uid={cart.uid} sid={cart.sid} pid={cart.pid} pname={cart.pname} price={cart.price} sname={cart.sname} psum={cart.psum} p_picture={cart.p_picture} incart={true}></CartCard>)}
        
         <IonItem><p> </p></IonItem>
              </IonList> }
          </IonContent> 
          <IonFooter>
          <IonToolbar>
           {this.state.showsum === false ?
            <IonButtons slot="end">
             <IonButton color="secondary" fill ='solid' onClick={this.showsum}>查看总价</IonButton>
             </IonButtons>
             :<> <p className="price" slot="end" >总价：¥{this.state.sumprice}</p>
             <IonButtons slot="end">
            <IonButton color="warning" fill ='solid' onClick={this.closesum}>知道了</IonButton>
            </IonButtons></>}
              <IonButtons slot="end">
              <Link className="total" to={payurl} > <IonButton color="danger" fill ='solid' size="large" >结算</IonButton></Link>
              </IonButtons>
          </IonToolbar>
         </IonFooter>
         </IonPage>
          </>
         
      );
    }
  
}
export default ShoppingCartPage