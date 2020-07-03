import React from 'react';
import { IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import {document,eye,home } from 'ionicons/icons';
import {IonList,IonIcon,IonSegment,IonPage,IonAvatar,IonSegmentButton,IonGrid,IonRow,IonCol} from '@ionic/react';
import {IonCard,IonCardContent} from '@ionic/react';
import image from '../assets/images/头像.jpg';
import GoodLists from '../components/goodList';
type Props = { props:any };
type State = { shopinformation: Array<any>,goodLists: Array<any>,display: Array<any>, segment: string,image: string, email: string, toastState: boolean,address : string,cert : string,marked : string,show_information: string, sname:string};


class ShopInformation extends React.Component <Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     address:'',
     cert:'',
     marked:'',
     image: '',
     email: '',
     toastState: false,
     display: [],   
     show_information:'',
     segment: "newProduct",
     goodLists: [],
     sname:'',//店铺名称
      shopinformation: []
    };       
 
  }

 
  componentDidMount() {    
    let findSid:any;
    findSid = {
      "sid": "1"
    }
    fetch(CONFIG.API_ENDPOINT+"user_md/clicksup/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
               // "Authorization": ""+localStorage.getItem("token")
            },
            body: JSON.stringify(findSid)
        })
      .then(res => res.json())
      .then(
        (res) => {
         res = JSON.parse(res);
         console.log(res);
          this.setState({           
            goodLists: res[0].pro ,
            shopinformation: res[0],
            sname:res[0].sname,
            address:res[0].saddress,
            cert:res[0].cert,
         
            marked:res[0].marked,
            segment: "cart",
           
          });
        console.log("shopinformation!!!!!!!");
        console.log(this.state.shopinformation);
      
         
        },
        
        (err) => {
            console.error(err);
       }
      )
  
  }
  
  renderSwitch(props:string) {
   
    switch(props) {
      case 'allProduct':
        return 'allProduct';
      case 'shopInformation':
        return 'shopInformation';
      default:
        return '';
    }
  }


  toggle = (e: any) =>  {
    let url,headers;
    if(e.detail.value == 'allProduct'){
            console.log("allProduct");
      url = CONFIG.API_ENDPOINT+"user_md/clicksup/";
      headers =  {
        "Content-Type": "application/json",  
        //"Authorization": "Token "+ localStorage.getItem("token")           
    }
            }
    else {
     console.log("shopInformation");
      url = CONFIG.API_ENDPOINT+"ShopInformation/shopInformation";
      headers =  {
        "Content-Type": "application/json", 
      // "Authorization": "Token "+ localStorage.getItem("token") 
    } 
    }    
      fetch(url, {
        method: 'POST',
        headers: headers
      })
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            display: res.display,
            show_information:res.pro,
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
        <Header title="店铺详情"></Header>

        <IonContent>

          <IonItem>
          <IonAvatar class="ion-margin-vertical">
            <img src={image} />              
          </IonAvatar>
           <p className="title">{this.state.sname}</p>
           </IonItem>
       <IonSegment  onIonChange={this.toggle} color="tertiary" value="favorite">
         
          <IonSegmentButton value="allProduct">
            <IonLabel>全部宝贝</IonLabel>
            <IonIcon icon = {home}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="shopInformation">
            <IonLabel>店铺介绍</IonLabel>
            <IonIcon icon = {eye}></IonIcon>
          </IonSegmentButton>
        </IonSegment>
         
           <IonList>
       {this.state.goodLists.map((cart: any) =>
          <GoodLists uid={cart.uid} pid={cart.pid} pname={cart.pname} price={cart.price} sname={cart.sname} psum={cart.psum}  incart={true}></GoodLists>)}
        
         <IonItem><p> </p></IonItem>
              </IonList> 
       
     <IonCard>
        <IonItem>
              <IonIcon name="pin" slot="start"></IonIcon>
              <IonLabel>六味地黄丸</IonLabel>
              <IonButton fill="outline" slot="end">进入商品详情</IonButton>
         </IonItem>
           <IonCardContent>
                  这里本该有个图片
           </IonCardContent>
      </IonCard>
         
       <IonCard>
        <IonItem>
              <IonIcon name="pin" slot="start"></IonIcon>
              <IonLabel >地址：{this.state.address}</IonLabel>
         </IonItem>
         <IonItem>
              <IonIcon name="pin" slot="start"></IonIcon>
              <IonLabel >资质 {this.state.cert}</IonLabel>
         </IonItem>
       
        <IonItem>
              <IonIcon name="pin" slot="start"></IonIcon>
              <IonLabel >用户关注量 {this.state.marked}</IonLabel>
         </IonItem>
       
      </IonCard>
      
        </IonContent>
      </IonPage>
    );
  }

}
export default ShopInformation