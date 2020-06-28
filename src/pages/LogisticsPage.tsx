import React from 'react';
import {IonPage, IonIcon,IonListHeader, IonTitle, IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList, IonAvatar, IonSegment } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/广东地图.png';
import business from '../assets/images/business-outline.svg';
import document from '../assets/images/document-text-outline.svg';
import home from '../assets/images/home-outline.svg';
import location from '../assets/images/location-outline.svg';

type Props = { props: any };
type State = { username: string, password: string, bio: string, image: string, email: string, toastState: boolean, address: string };

class LogisticsPage extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            bio: '',
            image: '',
            email: '',
            toastState: false,
            address: ''
        };

    }

    render() {
        return (
            <IonPage>
                <Header title="物流信息"> </Header>
                <IonContent>
                    <div className="ion-text-center">
                        <img src={image} alt="logo" width="100%" />
                    </div>
                    <IonList>
                        <IonItem>
                            <IonAvatar slot = 'start'><img  src = {business} /></IonAvatar>
                            <IonLabel item-right>
                                <h2>物流公司</h2>
                                <h3>中通快递</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                       
                        <IonAvatar slot = 'start'><img  src = {document} /></IonAvatar>
                            <IonLabel>
                                <h2>物流单号</h2>
                                <h3>78566628899</h3>
                            </IonLabel>
                            
                        </IonItem>
                        <IonItem>
                        <IonAvatar slot = 'start'><img  src = {location} /></IonAvatar>
                            <IonLabel>
                                <h2>发货地址</h2>
                                <h3>广东省广州市</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                        <IonAvatar slot = 'start'><img  src = {home} /></IonAvatar>
                            <IonLabel>
                                <h2>收货地址</h2>
                                <h3>广东省湛江市霞山区海滨公园</h3>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }

}

export default LogisticsPage
