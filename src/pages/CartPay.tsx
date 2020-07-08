import React from 'react';
import { IonToast, IonIcon, IonAlert, IonPage, IonFooter, IonToolbar, IonButtons, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonLabel, IonItem, IonContent, IonButton, IonList } from '@ionic/react';
import Header from '../components/Header';
import { Link,RouteComponentProps } from 'react-router-dom';
import { CONFIG } from '../constants';
import { location, removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import { SuggestionsDropdown } from '../../node_modules/react-mde';
import PayCard from '../components/PayCard';



type Props = { props: any };
type State = {prodData:Array<any>, toastMessage:string,showToast: boolean, rid: string, sum: number, num: number, receiveInfo: Array<any>, username: string, password: string, toastState: boolean, showAlert: boolean,order:Array<any>,sid:Array<any>,price:Array<any>,mid:Array<any> };


class CartPayPage extends React.Component<Props & RouteComponentProps<any>, State> {
 
    constructor(props: any) {
        super(props);
        
        this.state = {
            prodData:[],
            order:[],
            sid:[],
            price:[],
            mid:[],
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
          let i;
          let len;let slen;
          let j;let onum=0;let count=0;let ocount=0;
          /* console.log(this.state.prodData.length);*/
          for(i=0,len=this.state.prodData.length; i< len;i++,count++)
           { 
            for(j=0,slen=this.state.sid.length;j< slen;j++)
             {if(JSON.stringify(this.state.prodData[i].sid)===this.state.sid[j])
            { this.state.mid[0]={"pid":this.state.prodData[i].pid,"psum":this.state.prodData[i].psum}
             
             console.log(this.state.order[j]);
             console.log(this.state.mid[0]);
             this.state.order[j].push(this.state.mid[0]);              
             console.log(this.state.order[j]);
             this.state.price[j]=this.state.price[j]+this.state.prodData[i].psum*this.state.prodData[i].price
              ocount++;}
             }
             if(count===ocount)
              {this.setState({sid:this.state.sid+this.state.prodData[i].sid})
               this.state.order[this.state.sid.length-1]={"pid":this.state.prodData[i].pid,"psum":this.state.prodData[i].psum}
               this.state.price[this.state.sid.length-1]=this.state.prodData[i].psum*this.state.prodData[i].price
               this.state.order[this.state.sid.length-1]=[this.state.order[this.state.sid.length-1]]
               console.log(this.state.order[this.state.sid.length-1]);
                
              ocount++;}
          }
     let oi;let olen;
      for(oi=0,olen=this.state.order.length; oi< olen;oi++)
       {
       let url = CONFIG.API_ENDPOINT + "order_md/addorder/";
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "" + localStorage.getItem("token")
          };
        console.log(this.state.order[oi]);
       let body = {
            "pro":this.state.order[oi],
            "rid":this.state.rid,
            "unotes":"",
            "sid":this.state.sid[oi],
            "ordprice":this.state.price[oi]
        };
          fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          }).then((res) => {
            if (res.status == 200) {
                this.setState({showToast:true,toastMessage:"支付成功"})
              let i;let len;
              for(i=0,len=this.state.prodData.length; i< len;i++)
               { let url = CONFIG.API_ENDPOINT+"user_md/deletecart/"
                 let deletecart = {"pid":this.state.prodData[i].pid}
                 fetch(url, {
                        method: 'POST',
                        headers: {
                        "Content-Type": "application/json", 
                        "Authorization": ""+localStorage.getItem("token")
                          },
                       body: JSON.stringify(deletecart)
                   })
               }
              }
            else{
                console.log(body);
            }
          })
       }
    }


componentDidMount() {
     fetch(CONFIG.API_ENDPOINT+"user_md/getcart/", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", 
                "Authorization": ""+localStorage.getItem("token")
            },
         
        })
      .then(res => res.json())
      .then(
        (res) => {
         res = JSON.parse(res);
          this.setState({           
            prodData: res ,
            sum:0.00
          });
          
        console.log(res);
        console.log(this.state.prodData[0]);
        console.log(typeof this.state.prodData);
          let i;
          let len;
          for(i=0,len=this.state.prodData.length; i< len;i++){
          this.setState({sum:this.state.sum+this.state.prodData[i].price*this.state.prodData[i].psum})
          }
        },
        
        (err) => {
            console.error(err);
       }
      )
  

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
            <Header title="支付"> </Header>
            <IonContent>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState(() => ({ showToast: false }))}
                    message={this.state.toastMessage}
                    duration={1000}
                />
               
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
              <IonList>
       {this.state.prodData.map((product: any) =>
          <PayCard pname={product.pname} price={product.price} sname={product.sname} psum={product.psum}></PayCard>)}
              </IonList>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonLabel slot="end">总计￥{this.state.sum}</IonLabel>
                    <IonButtons slot="end">
                        <IonButton color="danger" fill='solid' onClick={this.submit}>支付</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    )
}
}

export default CartPayPage
