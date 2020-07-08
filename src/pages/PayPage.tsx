import React from 'react';
import { IonToast, IonIcon, IonAlert, IonPage, IonFooter, IonToolbar, IonButtons, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonLabel, IonItem, IonContent, IonButton } from '@ionic/react';
import Header from '../components/Header';
import { Link,RouteComponentProps } from 'react-router-dom';
import image from '../assets/images/商品图片.jpg';
import { CONFIG } from '../constants';
import { location, removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import { SuggestionsDropdown } from '../../node_modules/react-mde';
import ProdCard from '../components/ProdCard';



type Props = { props: any };
type State = {prodData:any, toastMessage:string,showToast: boolean, rid: string, sum: number, num: number, receiveInfo: Array<any>, username: string, password: string, toastState: boolean, showAlert: boolean };


class PayPage extends React.Component<Props & RouteComponentProps<any>, State> {
    pid = JSON.parse(this.props.match.params.pid);

    constructor(props: any) {
        super(props);
        
        this.state = {
            prodData:{"pid": 5, "sid": 1, "category": "", "pname": "", "ptype": "", "price": 10.0, "psize": "", "symptoms": "", "pusage": "", "para": "", "problems": "", "pkeyword": "", "address": "", "stock": "", "sname": ""},
            username: '',
            password: '',
            receiveInfo: [],
            toastState: false,
            showAlert: false,
            showToast: false,
            num: 1,
            sum: 0,
            rid: "-1",
            toastMessage:""
        };

    }

    increment = () => {
        this.setState({
            num: this.state.num + 1,
            sum: (this.state.num + 1) * this.state.prodData.price
        });
    }

    decrement = () => {
        if (this.state.num > 1) {
            this.setState({
                num: this.state.num - 1,
                sum: (this.state.num - 1) * this.state.prodData.price
            });
        }
    }

    setRid = (rid: string) => {
        this.setState({ rid: rid })
    }

    submit = () => {
        if (this.state.rid == "-1") {
            this.setState({ showToast: true,toastMessage:"请选择收货地址" });
            return;
        }
        else {
            this.setState({ showAlert: true });
        }
    }

    addOrder = () => {
        let url = CONFIG.API_ENDPOINT + "order_md/addorder/";
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "" + localStorage.getItem("token")
          };
        let body = {
            "pro":[{"pid":this.state.prodData.pid,"psum":this.state.num}],
            "rid":this.state.rid,
            "unotes":"",
            "sid":this.state.prodData.sid,
            "ordprice":this.state.sum
        };
          fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          }).then((res) => {
            if (res.status == 200) {
                this.setState({showToast:true,toastMessage:"支付成功"})
              }
            else{
                console.log(body);
            }
          })
    }

componentDidMount() {
    let prodUrl = CONFIG.API_ENDPOINT + 'user_md/clickpro/';
    let headers =  {
        "Content-Type": "application/json",
      };
    fetch(prodUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "pid": this.props.match.params.pid })
      }).then((res) => {
        
        return res.json()
      }).then((result:any) => {
          result = JSON.parse(result);
          this.setState({
          prodData:result[0],
          sum:result[0].price
        })});

    let url = CONFIG.API_ENDPOINT + 'user_md/getreceiveinfo/';
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "" + localStorage.getItem("token")
        }
    })
        .then((res) => {
            if (res.status == 200) {
                return res.json();
            }
            else {
                throw new Error();
            }
        }
        ).then((res) => {
            res = JSON.parse(res);
            this.setState({ receiveInfo: res })
        },
            (error) => {
                this.setState({ receiveInfo: [] })
            })
}

render() {
    let url = "http"
    return (
        <IonPage>
            <Header title="付款"> </Header>
            <IonContent>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState(() => ({ showToast: false }))}
                    message={this.state.toastMessage}
                    duration={1000}
                />
                <IonItem>
                    <img src={image} slot="start" width='40%' />
                    <IonGrid >
                        <IonRow>
                            <IonCol size="8">
                                <Link className="link" to={url}>
                                    {this.state.prodData.sname}</Link>
                            </IonCol >
                        </IonRow>

                        <IonRow>
                            <p className="name" >{this.state.prodData.pname}</p>
                        </IonRow>
                        <IonRow>

                        </IonRow>
                        <IonRow>
                            <IonCol size="6" >
                                <p className="price" >￥{this.state.prodData.price}</p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </IonItem>
                <IonItem>
                    <IonLabel>选择收货地址</IonLabel>
                    <IonSelect interface="action-sheet" onIonChange={e => this.setRid(e.detail.value)}>
                        {this.state.receiveInfo.map((info: any) =>
                            <IonSelectOption key={info.rid} value={info.rid}>
                                {info.raddress}{" \n "}
                                {info.rname}{" \n "}
                                {info.rphone}
                            </IonSelectOption>)}
                    </IonSelect>
                </IonItem>
                <section>
                    <Link className="link" to={{
                        pathname: '/address',
                    }}><IonButton slot="end">添加收货地址</IonButton></Link>
                </section>
                <IonItem>
                    <IonLabel>选择购买数量</IonLabel>
                    <IonRow>
                        <IonIcon icon={removeCircleOutline} onClick={this.decrement} />
                        {this.state.num}
                        <IonIcon icon={addCircleOutline} onClick={this.increment} />
                    </IonRow>
                </IonItem>
                <IonItem>
                    <IonLabel>选择支付方式</IonLabel>
                    <IonSelect value="wechatpay">
                        <IonSelectOption value="wechatpay">微信支付</IonSelectOption>
                        <IonSelectOption value="alipay">支付宝</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonAlert
                    isOpen={this.state.showAlert}
                    onDidDismiss={() => this.setState({ showAlert: false })}
                    cssClass='my-custom-class'
                    header={'输入支付密码'}
                    inputs=
                    {[{
                        name: 'name8',
                        placeholder: '输入六位支付密码',
                        type: 'password',
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
                            handler: this.addOrder
                        }
                    ]}
                />
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonLabel slot="end">总计￥{this.state.sum}</IonLabel>
                    <IonButtons slot="end">
                        <IonButton color="danger" fill='solid' onClick={this.submit}>结算</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    )
}
}

export default PayPage
