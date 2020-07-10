import React from 'react';
import {IonToast, IonModal,IonList,IonAlert, IonButton, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonContent } from '@ionic/react'
import { Link } from 'react-router-dom';
import './ArticleCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import { Function } from '../../node_modules/@babel/types';


type Props = {
  sname: string,
  ordstatus: string,
  pro: Array<any>,
  ordno: string,
  ordprice:number
    
  }


type State = {
  showAlert: boolean,
  showModal: boolean,
  showToast: boolean
}


class OrderCard extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showAlert: false,
      showModal: false,
      showToast:false
    }

  }

  card() {
    return (
      this.props.pro!=undefined?
      <IonItem>
        <img src={this.props.pro[0].p_picture} slot="start" width='30%' />
        <IonGrid >
          <IonRow>
            <IonCol size="8">
                <span>{this.props.sname}</span>
            </IonCol >
            <IonCol size="4" text-right>
              <span className="status">{this.props.ordstatus}</span>
            </IonCol>
          </IonRow>

          <IonRow>
            <p className="name" >共{this.props.pro.length}件商品</p>
          </IonRow>
          {this.renderButton(this.props.ordstatus,this.props.ordno)}
        </IonGrid>

      </IonItem>:''
    )
  }

  confirmOrder(ordno:string){
    let url = CONFIG.API_ENDPOINT + 'order_md/confirmorder/';
    let body = {"ordno":ordno};
    fetch(url,{
      method : "POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token")
      },
      body:JSON.stringify(body)

      }).then((res)=>{if(res.status == 200){
        return res.json();
      }
        else{throw new Error();}
    }).then((res)=>{
        this.setState({"showToast":true});
    })
  }

  renderButton(props: string,ordno:string) {

    switch (props) {
      case '未发货':
        return (<IonRow>
          <IonButton  onClick={() => {this.setState({showModal:true}) }}>
              详情</IonButton>
              <IonButton  onClick={() => { this.setState({ showAlert: true }) }}>
              取消</IonButton>
        </IonRow>);
      case '商家已发货':
      return (<><Link to={'logistics/'+this.props.ordno}><IonButton>物流</IonButton></Link>
      <IonButton onClick = {()=>this.confirmOrder(this.props.ordno)}>确认收货</IonButton></>);
      case '交易成功':
      return (<Link to = {'comment/'+this.props.ordno}><IonButton>评价</IonButton></Link>);
        return;
    }
  }

  deleteOrder() {
    let url = CONFIG.API_ENDPOINT + 'order_md/deleteorder';
    let headers = {
      "Content-Type": "application/json",
      "Authorization": "" + localStorage.getItem("token")
    };
    let body = { "ordno":this.props.ordno}

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
  }

  render() {
    return (
      <>
      {this.props.pro!=undefined?
       <IonModal isOpen={this.state.showModal}>
       <IonContent>
       <IonGrid>   
         
          {this.props.pro.map((product: any) =>
          <IonRow key = {product.pid}><IonCol>{product.pname}</IonCol><IonCol text-left>￥{product.price}*{product.psum}</IonCol></IonRow>
          )}
         
          <IonRow><IonCol>合计</IonCol><IonCol text-left>￥{this.props.ordprice}</IonCol></IonRow>
          </IonGrid>
          <div>
                <IonButton onClick={() => this.setState({ showModal: false })}>确认</IonButton>
               
              </div>
          </IonContent>
          </IonModal>:''}
          <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState(() => ({ showToast: false }))}
                    message={"已确认收货"}
                    duration={1000}
                />
        {this.card()}
        <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => this.setState({ showAlert: false })}
          cssClass='my-custom-class'
          message={"确认取消该订单？"}
          buttons={[
            {
              text: '取消',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: '确认',
              handler: () => {
                let url = CONFIG.API_ENDPOINT + 'order_md/deleteorder/';
                let headers = {
                  "Content-Type": "application/json",
                  "Authorization": "" + localStorage.getItem("token")
                };
                let body = { "ordno":this.props.ordno}
            
                fetch(url, {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(body),
                })

              
            }
            }
            ]}
        />
        
      </>
    );
  }
}

export default OrderCard
