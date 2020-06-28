import React from 'react';
import {IonAlert,IonPage,IonFooter,IonToolbar,IonButtons, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonLabel, IonItem, IonContent, IonButton } from '@ionic/react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import image from '../assets/images/商品图片.jpg';

type Props = { props: any };
type State = {username: string, password: string, bio: string, image: string, email: string, toastState: boolean,showAlert:boolean };

class PayPage extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            bio: '',
            image: '',
            email: '',
            toastState:false,
            showAlert: false,
            
        };

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
                                <p className="name" text-left>同仁堂感冒灵颗粒</p>
                            </IonRow>
                            <IonRow>

                            </IonRow>
                            <IonRow>
                                <IonCol size="6" text-left>
                                    <p className="price" >￥25.86*1</p>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </IonItem>
                    <IonItem>
                        <IonLabel>选择收货地址</IonLabel>
                        <IonSelect interface="action-sheet">
                            <IonSelectOption >广东省广州市大学城中山大学至善园八号306宿舍</IonSelectOption>
                            <IonSelectOption>Brown</IonSelectOption>
                            <IonSelectOption>Dark</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <section>
                        <IonButton slot = "end">添加收货地址</IonButton>
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
          inputs={[
          
            {
              name: 'name8',
              type: 'password',
              placeholder: '输入六位支付密码',
              cssClass: 'specialClass',
              attributes: {
                maxlength: 6,
                inputmode: 'decimal'
              }
            }
          ]}
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