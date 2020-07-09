import React from 'react';
import { IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import { RouteComponentProps } from 'react-router-dom';
import {document,eye,home } from 'ionicons/icons';
import {IonList,IonIcon,IonSegment,IonPage,IonAvatar,IonSegmentButton,IonGrid,IonRow,IonCol} from '@ionic/react';
import {IonCard,IonCardContent} from '@ionic/react';
import image from '../assets/images/头像.jpg';
import GoodLists from '../components/goodList';
type Props = { props:any };
type State = { shopinformation: Array<any>,goodLists: Array<any>,display: Array<any>, segment: string,image: string, email: string, toastState: boolean,address : string,cert : string,marked : string,show_information: string, sname:string,showInfo:boolean,show_new:boolean,sprove:string,sphone:string,sstate:string};


class ShopInformation  extends React.Component<Props & RouteComponentProps<any>, State>{

  constructor(props: any) {
    super(props);
    this.state = {
     show_new:true,
     address:'',
     cert:'',
     marked:'',
     image: '',
     email: '',
     toastState: false,
     display: [],   
     sprove:'',//商家资质
     show_information:'',
     segment: "allProduct",
     goodLists: [],
     sname:'',//店铺名称,
     sphone:'',
     shopinformation: [],
     showInfo:false,
     sstate:''//认证状态
    };       
 
  }
 
 renderSwitch(props:string) {
    //console.log("renderSwitch");
    switch(props) {
      case 'allProduct':
        return  (
               <IonList>
           {this.state.goodLists.map((cart: any) =>
              <GoodLists key={cart.pid} uid={cart.uid} pid={cart.pid} pname={cart.pname} price={cart.price} sname={cart.sname} psum={cart.psum}  incart={true}></GoodLists>)}
              </IonList> 
        );
      case 'newShop':
        return (
       
         <IonList>
              {this.state.show_new === false?
                  <IonItem>     
                      <p className="pname">暂时无新品</p>
                    </IonItem>
           :
          <IonItem>  
           {this.state.goodLists.map((cart: any) =>
              <GoodLists key={cart.pid} uid={cart.uid} pid={cart.pid} pname={cart.pname} price={cart.price} sname={cart.sname} psum={cart.psum}  incart={true}></GoodLists>)}
           </IonItem>
            }    
           
          </IonList> 
           
            );
      case 'shopinformation':
        return  (
            <IonCard >
          
               <IonItem>
                     <IonIcon name="pin" slot="start"></IonIcon>
                     <IonLabel >地址：{this.state.address}</IonLabel>
                </IonItem>
                <IonItem>
                     <IonIcon name="pin" slot="start"></IonIcon>
                     <IonLabel >资质: {this.state.sprove}</IonLabel>
                </IonItem>

               <IonItem>
                     <IonIcon name="pin" slot="start"></IonIcon>
                     <IonLabel >用户关注量: {this.state.marked}</IonLabel>
                </IonItem>
               <IonItem>
                     <IonIcon name="pin" slot="start"></IonIcon>
                     <IonLabel >联系电话: {this.state.sphone}</IonLabel>
                </IonItem>
              <IonItem>
                     <IonIcon name="pin" slot="start"></IonIcon>
                     <IonLabel >认证情况: {this.state.sstate}</IonLabel>
                </IonItem>
           </IonCard>
          
        );
      default:
        return '';
    }
  }
 
  componentDidMount() {    
    let findSid:any;
    findSid = {
      "sid": "1"
    }
   
    fetch(CONFIG.API_ENDPOINT+"user_md/clicksup/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            //body: JSON.stringify(findSid)
           body: JSON.stringify({ "sid": this.props.match.params.sid })
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
            sphone:res[0].sphone,
            sprove:res[0].sprove,
            cert:res[0].cert,
            marked:res[0].marked,
            segment: "allProduct",
           
          });
        console.log("shopinformation!!!!!!!");
        console.log(this.state.shopinformation);
        console.log("sprove!!!!!!!");
        console.log(this.state.sprove);
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
           // body: JSON.stringify(findSid)
         body: JSON.stringify({ "sid": this.props.match.params.sid })
        })
      .then(res => res.json())
      .then(
        (res) => {
         res = JSON.parse(res);
         console.log("newshop!!!!!!!");
         console.log(res);
         //console.log(res.msg);
         if(res.msg=="该商家不存在近三日新上架商品，请查看全部产品")
             this.setState({           
                 show_new: false,
          });
          this.setState({           
                 segment: "newShop",
          });
        },
        (err) => {
            console.error(err);
       }
      )
  
  }
guanzhu = () => {
  //this.setState({segment:"newShop"})
  
      fetch(CONFIG.API_ENDPOINT+"user_md/addlikestores/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
           // body: JSON.stringify(findSid)
         body: JSON.stringify({ "sid": this.props.match.params.sid })
        })
      .then(res => res.json())
      .then(
        (res) => {
           if(res.status == 400)
             throw new Error("需要先登录");
        },
       
        (err) => {
            console.error(err);
        }
      )
      
 }
 
 quguan = () => {
  //this.setState({segment:"newShop"})
  
      fetch(CONFIG.API_ENDPOINT+"user_md/deletelikestores/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
           // body: JSON.stringify(findSid)
         body: JSON.stringify({ "sid": this.props.match.params.sid })
        })
      .then(res => res.json())
      .then(
        (res) => {
           if(res.status == 400)
             throw new Error("需要先登录");
        },
       
        (err) => {
            console.error(err);
        }
      )
      
 }
 newShop = () => {
  this.setState({segment:"newShop"})
  /*
  fetch(CONFIG.API_ENDPOINT+"pro_up/new_pro_show/")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            goodLists: res[0].pro,
            segment: "newShop"
          });
        },
       
        (err) => {
            console.error(err);
        }
      )
      */
 }
  allProduct = () => {
  this.setState({segment:"allProduct"})
   /* 
    fetch(CONFIG.API_ENDPOINT+"user_md/clicksup/")
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({           
            goodLists: res[0].pro,
            segment: "allProduct"
          });
        },
       
        (err) => {
            console.error(err);
        }
      )*/
 }
  shopinformation = () => {
  this.setState({segment:"shopinformation"})
   /*
    fetch(CONFIG.API_ENDPOINT+"user_md/clicksup/")
      .then(res => res.json())
      .then(
        (res) => {
          console.log("shopinformation res");
          console.log(res);
          this.setState({           
            goodLists: res[0].pro,
            segment: "shopinformation"
          });
        },
       
        (err) => {
            console.error(err);
        }
      )*/
 }
 
  render(){
    return(
    <IonPage>
        <Header title="店铺首页"></Header>
       
        <IonContent>
           <IonItem>
          <IonAvatar class="ion-margin-vertical">
            <img src={image} />              
          </IonAvatar>
           <p className="title">{this.state.sname}</p>
              <IonButton color="success" size="large" fill='solid' onClick={this.guanzhu}>关注店铺</IonButton>
              <IonButton color="success"  size="large" fill='solid' onClick={this.quguan}>取消关注</IonButton>
           </IonItem>
       <IonSegment color="tertiary" value="favorite">
          <IonSegmentButton value="newShop" onClick={this.newShop}>
            <IonLabel>新品</IonLabel>
            <IonIcon icon ={eye}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="allProduct" onClick={this.allProduct}>
            <IonLabel>全部宝贝</IonLabel>
            <IonIcon icon = {document}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="shopinformation" onClick={this.shopinformation}>
            <IonLabel>店铺信息</IonLabel>
            <IonIcon icon = {home}></IonIcon>
          </IonSegmentButton>
        </IonSegment>
        
          {this.renderSwitch(this.state.segment)}
        

        </IonContent>
      </IonPage>
    
    )
  }

}
export default ShopInformation