import React from 'react';
import { IonCol, IonRow, IonGrid, IonPage, IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import { RouteComponentProps } from 'react-router-dom';

type Props = { props: any };
type State = {pid:string, prodData: Array<any>, comment: string,showToast:boolean,toastMessage:string };

class CommentPage extends React.Component<Props & RouteComponentProps<any>, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            comment: '',
            prodData: [],
            pid:'',
            showToast:false,
            toastMessage:''
        };

    }

    componentDidMount() {
        fetch(CONFIG.API_ENDPOINT + "order_md/clickorder/",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "" + localStorage.getItem("token")
                },
                body: JSON.stringify({ "ordno": this.props.match.params.ordno })
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
                this.setState({ prodData: res[0].pro })
            },
                (error) => {
                })
    }

    updatePid=(event:any)=>{
        this.setState({ pid: event.detail.value });
    }

    updateComment = (event: any) => {
        this.setState({ comment: event.detail.value });

    }

    addComment = () => {
        if(this.state.pid==""){
            this.setState({showToast:true,toastMessage:"请输入商品ID"});
            return;
        }
        if(this.state.comment==""){
            this.setState({showToast:true,toastMessage:"请输入评论"});
            return;
        }

        let url = CONFIG.API_ENDPOINT + "order_md/commentorder/";
        let body = {
            "ordno": this.props.match.params.ordno,
            "pro_cpm": [{"pid":this.state.pid,"comment":this.state.comment}]
        }
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "" + localStorage.getItem("token")
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
    }

    render() {
        return (
            <IonPage>
                <IonContent>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState(() => ({ showToast: false }))}
                    message={this.state.toastMessage}
                    duration={1000}
                />
                    <Header title="评价"> </Header>
                    <IonGrid>
                        <IonRow ><IonCol>{"商品名称"}</IonCol><IonCol text-left>{"商品ID"}</IonCol></IonRow>
                        {this.state.prodData.map((product: any) =>
                            <IonRow key={product.pid}><IonCol>{product.pname}</IonCol><IonCol text-left>{product.pid}</IonCol></IonRow>
                        )}</IonGrid>
                    <div>
                        <IonInput onIonChange={this.updatePid} type="text" placeholder="想要评价的商品ID"
                            value={this.state.pid}></IonInput>
                        <div className="border-green">
                            <IonTextarea onIonChange={this.updateComment} placeholder="添加评论" value={this.state.comment}>
                            </IonTextarea>
                        </div>
                        <IonButton color="success" onClick={this.addComment}>添加评论</IonButton>
                    </div>
                </IonContent>
            </IonPage>

        )
    }
}

export default CommentPage