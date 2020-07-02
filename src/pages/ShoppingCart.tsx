import React from 'react';
import {  IonContent,  IonSegment, IonSegmentButton,IonButton, IonLabel,  IonList, IonAvatar, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption,IonFooter,IonToolbar,IonButtons,IonPage,IonCheckbox} from '@ionic/react'
import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = { props:any };
type State = { carts: Array<any>, segment: string,sumprice:number};

class ShoppingCartPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {      
      carts: [],              
      segment: "cart",
      sumprice:0.00
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
            sumprice:0.00
          });
         let i;
          let len;
          for(i=0,len=this.state.carts.length; i< len;i++){
          this.setState({sumprice:this.state.sumprice+this.state.carts[i].price*this.state.carts[i].psum})
          }
        console.log(res);
        console.log(this.state.carts);
        console.log(this.state.carts[0].price);
        console.log(typeof this.state.carts);
        
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
       {this.state.carts.map((cart: any) =>
          <CartCard uid={cart.uid} pid={cart.pid} pname={cart.pname} price={cart.price} sname={cart.sname} psum={cart.psum} incart={true}></CartCard>)}
        
         <IonItem><p> </p></IonItem>
              </IonList> 
          </IonContent> 
          <IonFooter>
          <IonToolbar>
               <p className="price" slot="end" >总价:¥{this.state.sumprice}</p>
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