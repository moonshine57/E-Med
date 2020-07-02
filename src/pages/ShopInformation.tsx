import React from 'react';
import { IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import {document,eye,home } from 'ionicons/icons';
import {IonList,IonIcon,IonSegment,IonPage,IonAvatar,IonSegmentButton,IonGrid,IonRow,IonCol} from '@ionic/react';
import {IonCard,IonCardContent} from '@ionic/react';
import image from '../assets/images/头像.jpg';
type Props = { props:any };
type State = { display: Array<any>, segment: string,image: string, email: string, toastState: boolean,address : string,cert : string,rank : string,marked : string,show_information: string};


class ShopInformation extends React.Component <Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     address:'默认地址',
     cert:'默认资质',
     rank:'默认星级',
     marked:'默认关注量',
     image: '',
     email: '',
     toastState: false,
     display: [],   
     show_information:'',
     segment: "newProduct"
    };       
 
  }

  renderSwitch(props:string) {
   
    switch(props) {
      case 'newProduct':
        return  'newProduct';
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
    if(e.detail.value == 'newProduct') {
      console.log("localStorage.getItemtoken");
      console.log(localStorage.getItem("token"));
     
      console.log("newProduct");
     
      url = CONFIG.API_ENDPOINT+"ShopInformation/newProduct";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": "Token "+ localStorage.getItem("token")           
    }
    } 
    else if(e.detail.value == 'allProduct'){
            console.log("allProduct");
      url = CONFIG.API_ENDPOINT+"user_md/clicksup/";
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": "Token "+ localStorage.getItem("token")           
    }
            }
    else {
     console.log("shopInformation");
      url = CONFIG.API_ENDPOINT+"ShopInformation/shopInformation";
      headers =  {
        "Content-Type": "application/json", 
       "Authorization": "Token "+ localStorage.getItem("token") 
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
           <p className="title">阿里巴巴大药房官方旗舰店  我就试一下</p>
           </IonItem>
       <IonSegment  onIonChange={this.toggle} color="tertiary" value="favorite">
          <IonSegmentButton value="newProduct">
            <IonLabel>新品</IonLabel>
            <IonIcon icon ={document}></IonIcon>
          </IonSegmentButton>
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
          看得见吗宝贝{this.state.segment}
          {this.renderSwitch(this.state.segment)}
         {this.state.show_information}
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
              <IonLabel >星级评价 {this.state.rank} </IonLabel>
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