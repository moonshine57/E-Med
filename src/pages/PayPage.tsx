import React from 'react';
import {IonAlert,IonPage,IonFooter,IonToolbar,IonButtons, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonLabel, IonItem, IonContent, IonButton } from '@ionic/react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import image from '../assets/images/商品图片.jpg';
import { CONFIG } from '../constants';

type Props = { props: any };
type State = {receiveInfo:Array<any>,username: string, password: string,toastState: boolean,showAlert:boolean };

class PayPage extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            receiveInfo:[],
            toastState:false,
            showAlert: false,
            
        };

    }

    componentWillMount() {
        let url = CONFIG.API_ENDPOINT + 'user_md/getreceiveinfo/';
        fetch(url, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "" + localStorage.getItem("token")
          }
        })
          .then((res) => {
            if(res.status == 200){
              return res.json();
           }
           else{
             throw new Error();
           }
          }
          ).then((res)=>{
            res = JSON.parse(res);
            this.setState({receiveInfo:res})
          },
            (error) => {
              this.setState({receiveInfo:[]})
            })
      }

    render() {
        let url = "http"
        return (
            <IonPage>
                <Header title="付款"> </Header>
                <IonContent>
                    <IonItem>
                        <img src={image} slot="start" width='40%' />
                        <IonGrid >
                            <IonRow>
                                <IonCol size="8">
                                    <Link className="link" to={url}>
                                        同仁堂药店</Link>
                                </IonCol >
                            </IonRow>

                            <IonRow>
                                <p className="name" >同仁堂感冒灵颗粒</p>
                            </IonRow>
                            <IonRow>

                            </IonRow>
                            <IonRow>
                                <IonCol size="6" >
                                    <p className="price" >￥25.86*1</p>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </IonItem>
                    <IonItem>
                        <IonLabel>选择收货地址</IonLabel>
                        <IonSelect interface="action-sheet">
                        {this.state.receiveInfo.map((info: any,index) => 
                            <IonSelectOption key = {index}>
                                {info.raddress}{" \n "}
                                {info.rname}{" \n "}
                                {info.rphone}
                            </IonSelectOption>)}
                        </IonSelect>
                    </IonItem>
                    <section>
                    <Link className="link" to={{
                        pathname:'/address',
                        }}><IonButton slot="end">添加收货地址</IonButton></Link> 
                    </section>
                    <IonItem>
                        <IonLabel>选择支付方式</IonLabel>
                        <IonSelect >
                            <IonSelectOption >微信支付</IonSelectOption>
                            <IonSelectOption>支付宝</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => this.setState({showAlert:false})}
          cssClass='my-custom-class'
          header={'输入支付密码'}
          inputs=
            {[{
              name: 'name8',
              placeholder: '输入六位支付密码',
              type:'password',
            }]}
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
                console.log('Confirm Ok');
              }
            }
          ]}
        />
                </IonContent>
                <IonFooter>
                    <IonToolbar>
                        <IonLabel slot = "end">总计100元</IonLabel>
                        <IonButtons slot="end">
                            <IonButton color="danger" fill='solid' onClick={() => this.setState({showAlert:true})}>结算</IonButton>
                        </IonButtons>
                    </IonToolbar>
                    </IonFooter>
                    </IonPage>
            
        )
    }
}

export default PayPage
