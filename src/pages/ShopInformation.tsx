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
type State = { shopinformation: Array<any>,goodLists: Array<any>,display: Array<any>, segment: string,image: string, email: string, toastState: boolean,address : string,cert : string,marked : string,show_information: string, sname:string,showInfo:boolean};


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
     segment: "allProduct",
     goodLists: [],
     sname:'',//店铺名称
     shopinformation: [],
     showInfo:false
    };       
 
  }
 
 renderSwitch(props:string) {
   
    switch(props) {
      case 'allProduct':
        return  'allProduct';
      case 'newShop':
        return 'shopinformation';
      case 'shopinformation':
        return  '';
      default:
        return '';
    }
  }
 
  componentDidMount() {    
    let findSid:any;
    findSid = {
      "sid": "2"
    }
    fetch(CONFIG.API_ENDPOINT+"user_md/clicksup/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
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
            segment: "allProduct",
           
          });
        console.log("shopinformation!!!!!!!");
        console.log(this.state.shopinformation);

        },
        (err) => {
            console.error(err);
       }
      )
    fetch(CONFIG.API_ENDPOINT+"pro_up/new_pro_show/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(findSid)
        })
      .then(res => res.json())
      .then(
        (res) => {
         res = JSON.parse(res);
         console.log("newshop!!!!!!!");
         console.log(res);
          this.setState({           
           
          });
        },
        (err) => {
            console.error(err);
       }
      )
  
  }
  toggle = (e: any) =>  {
    let url,headers;
    console.log("toogle");
    console.log(e.detail.value);
    console.log("========");
    let findSid:any;
    findSid = {
      "sid": "2"
    }
     findSid=JSON.stringify(findSid); 
     

     if(e.detail.value == 'allProduct') {
      
      console.log("allProduct");
      url = CONFIG.API_ENDPOINT+"none";
      headers =  {
        "Content-Type": "application/json",  
        //"Authorization": "Token "+ localStorage.getItem("token")           
    }
    } 
    else if(e.detail.value == 'newShop'){
      url = CONFIG.API_ENDPOINT+"pro_up/new_pro_show/";
     console.log("newShop");
      headers =  {
        "Content-Type": "application/json"     
    }
            }
    else {
      url = CONFIG.API_ENDPOINT+"none";
     console.log("shopInformation");
      headers =  {
        "Content-Type": "application/json"
    } 
    }    
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: findSid
      })
      .then(res => res.json())
      .then(
        (res) => {
            res = JSON.parse(res);
            //console.log("新品");
            //console.log(res);
          this.setState({           
            display: res.display,
            show_information:res.pro,
            segment: e.detail.value
          });
            console.log("segment");
            console.log(this.state.segment);
        },
     
        (err) => {            
            console.error(err);
            this.setState({           
          
            segment: e.detail.value
          });
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
          <IonSegmentButton value="newShop">
            <IonLabel>新品</IonLabel>
            <IonIcon icon = {eye}></IonIcon>
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
          {this.renderSwitch(this.state.segment)}
        </IonList>
          </IonContent>
          <IonContent>
            {this.state.segment ==="shopInformation"? 
           <IonCard ng-show="{this.state.showInfo}">
          
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
          :
         
           <IonList>
           {this.state.goodLists.map((cart: any) =>
              <GoodLists uid={cart.uid} pid={cart.pid} pname={cart.pname} price={cart.price} sname={cart.sname} psum={cart.psum}  incart={true}></GoodLists>)}
              </IonList> 
          }
        </IonContent>
      </IonPage>
    
    )
  }

}
export default ShopInformation