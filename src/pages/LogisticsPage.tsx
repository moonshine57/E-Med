import React from 'react';
import {IonPage, IonIcon,IonListHeader, IonTitle, IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList, IonAvatar, IonSegment } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import image from '../assets/images/广东地图.png';
import business from '../assets/images/business-outline.svg';
import document from '../assets/images/document-text-outline.svg';
import home from '../assets/images/home-outline.svg';
import location from '../assets/images/location-outline.svg';
import { RouteComponentProps } from 'react-router-dom';

type Props = { props: any };
type State = {from:string,to:string,expno:string, toastState: boolean, address: string };

class LogisticsPage extends React.Component<Props & RouteComponentProps<any>, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            toastState: false,
            address: '',
            expno:'',
            from:'',
            to:'',
        };

    }

    componentDidMount(){
        let url = CONFIG.API_ENDPOINT + 'order_md/expinfo/';
        fetch(url,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "" + localStorage.getItem("token")
            },
            body:JSON.stringify({"ordno":this.props.match.params.ordno})
        }).then((res)=>res.json()).then((result)=>
        {   
            result = JSON.parse(result);
            this.setState({expno:result.expno,address:result.raddress})
        }
        )
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
                       
                        <IonAvatar slot = 'start'><img  src = {document} /></IonAvatar>
                            <IonLabel>
                                <h2>物流单号</h2>
                                <h3>{this.state.expno}</h3>
                            </IonLabel>
                            
                        </IonItem>
                        <IonItem>
                        <IonAvatar slot = 'start'><img  src = {home} /></IonAvatar>
                            <IonLabel>
                                <h2>收货地址</h2>
                                <h3>{this.state.address}</h3>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }

}

export default LogisticsPage
