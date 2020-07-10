import React from 'react';
import {IonGrid,IonCol,IonToast, IonModal, IonFooter, IonToolbar, IonButtons,IonList, IonPage, IonAvatar, IonLabel, IonButton, IonContent, IonChip, IonTextarea, IonFab, IonFabButton, IonIcon, IonRow } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import * as Showdown from "showdown";
import Comment from '../components/Comment';
import "./Article.css";
import Header from '../components/Header';
import { CONFIG } from '../constants';
import { Link } from 'react-router-dom';
import image from '../assets/images/商品图片.jpg';
import { location, removeCircle, addCircle } from 'ionicons/icons';

type Props = {

}

type State = {
  product:any,
  showModal: boolean,
  showToast: boolean,
  article: any,
  author: any,
  comments: any,
  comment: string,
  num: number,

}

class ProdPage extends React.Component<Props & RouteComponentProps<any>, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      product:{"pid": 5, "sid": 1, "category": "", "pname": "", "ptype": "", "price": 10.0, "psize": "", "symptoms": "", "pusage": "", "para": "", "problems": "", "pkeyword": "", "address": "", "stock": "", "sname": ""},
      num: 1,
      showModal: false,
      showToast: false,
      article: '',
      author: '',
      comments: [],
      comment: '',
  
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
      requireSpaceBeforeHeadingText: true
    });


  }
  converter: any;
  fetchProd(url: string) {
    let headers;
    if (localStorage.getItem("isLogin") && localStorage.getItem("isLogin") == "true") {
      headers = {
        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token")
      }
    } else {
      headers = {
        "Content-Type": "application/json",
      }
    }

    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ "pid": this.props.match.params.pid })
    }).then((res) => {
      if(res.status == 404) return [];
      else return res.json();
    })
  }
  componentDidMount() {
    let prodUrl = CONFIG.API_ENDPOINT + "user_md/clickpro/";
    let commentsUrl = CONFIG.API_ENDPOINT + 'order_md/getcomment/';

    Promise.all([this.fetchProd(prodUrl), this.fetchProd(commentsUrl)]).then(
      (result) => {
        let product = JSON.parse(result[0]);
        this.setState({
          product: product[0],
          comments: JSON.parse(result[1]),

        });
       
        console.log(this.state.comments)
        localStorage.setItem("sname",this.state.product.sname);
      }
    )

  }

  increment = () => {
    this.setState({ num: this.state.num + 1 });
  }

  decrement = () => {
    if (this.state.num > 1) {
      this.setState({ num: this.state.num - 1 });
    }
  }

  addCart = () => {
    let url = CONFIG.API_ENDPOINT + 'user_md/addcart/';
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + localStorage.getItem("token")
      },
      body: JSON.stringify({ "pid": this.props.match.params.pid, "psum": this.state.num })

    }).then((res) => {
      if (res.status == 200) {
        this.setState({ showToast: true })
      }
    })
    this.setState({ 
      showModal: false,
      showToast:true,            
    });
  }

  updateComment = (event: any) => {
    this.setState({ comment: event.detail.value });

  }

  deleteComment = (e: any) => {
    this.setState({
      comments: this.state.comments.filter((com: any) => com.id !== e)
    })

  }
  addComment = () => {
    let url = CONFIG.API_ENDPOINT + "articles/" + this.props.match.params.slug;
    let commentsUrl = url + '/comments';
    let body = {
      "comment": {
        "body": this.state.comment
      }
    }
    fetch(commentsUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage.getItem("token")
      },
      body: JSON.stringify(body)

    }).then(res => res.json())
      .then((com) => {
        let newComments = this.state.comments;
        newComments.push(com.comment);
        this.setState({ comments: newComments, comment: '' })
      })

  }
  viewAuthor = () => {

    this.props.history.replace('/profile/' + this.state.author.username)
  }





  render() {
    let article = this.state.article;
    let author = this.state.author;

    return (
      <IonPage>
        <Header title="商品详情"></Header>
        <IonContent>
          <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState(() => ({ showToast: false }))}
            message={"添加成功"}
            duration={1000}
          />
          <div className="ion-text-center">
            <img src={this.state.product.p_picture} alt="img" width="100%" />
          </div>
          <div className="ion-padding-left ion-padding-right">
            <div className="article-title" >￥{this.state.product.price}</div>
            <div className="shop-name" >{this.state.product.sname}</div>
            <div className="product-name" >{this.state.product.pname}</div>
            
            <IonChip onClick={this.viewAuthor}>
              <IonAvatar>
                <IonIcon icon={location} color='medium' />
              </IonAvatar>
              <IonLabel>{this.state.product.address}</IonLabel>

            </IonChip>

            <IonChip>
              库存{this.state.product.stock}
              </IonChip>
         
          </div>
          <hr className="horizontal-line" />

          {this.state.comments.length > 0 ?
            <div>
              {this.state.comments.map((art: any, index:any) =>
                <Comment key={index} body={art.comment} slug={this.state.article.slug} 
                  commentId={index} username={art.uname} onDeleteComment={this.deleteComment}></Comment>
              )}
            </div> : <p className="ion-text-center">
              暂时没有评论
            </p>}

          <hr className="horizontal-line" />

          {localStorage.getItem("isLogin") === "false" ?
            <div>
              <div className="border-green">
                <IonTextarea onIonChange={this.updateComment} placeholder="添加评论" value={this.state.comment}>
                </IonTextarea>
              </div>
              <IonButton color="success" onClick={this.addComment}>添加评论</IonButton>
            </div> : ''}
         <IonGrid>
            <IonRow><IonCol>类别:</IonCol><IonCol text-left>{this.state.product.category}</IonCol></IonRow>
            <IonRow><IonCol>是否处方药:</IonCol><IonCol text-left>{this.state.product.ptype}</IonCol></IonRow>
            <IonRow><IonCol>适应症状:</IonCol><IonCol text-left>{this.state.product.symptoms}</IonCol></IonRow>
            <IonRow><IonCol>用法:</IonCol><IonCol text-left>{this.state.product.pusage}</IonCol></IonRow>
            <IonRow><IonCol>规格:</IonCol><IonCol text-left>{this.state.product.psize}</IonCol></IonRow>
            <IonRow><IonCol>单位:</IonCol><IonCol text-left>{this.state.product.para}</IonCol></IonRow>
            <IonRow><IonCol>注意事项:</IonCol><IonCol text-left>{this.state.product.problems}</IonCol></IonRow>
           </IonGrid>
          <IonModal isOpen={this.state.showModal}>
            <IonContent>
              <h3>选择数量</h3>
              <IonRow>
                <IonIcon icon={removeCircle} onClick={this.decrement} />
                {this.state.num}
                <IonIcon icon={addCircle} onClick={this.increment} />
              </IonRow>
              <div>
                <IonButton onClick={() => this.setState({ showModal: false })}>取消</IonButton>
                <IonButton onClick={this.addCart}>确认</IonButton>
              </div>
            </IonContent>
          </IonModal>
        </IonContent>
       
        <IonFooter>
        {localStorage.getItem("isLogin") == "true"?
          <IonToolbar>
            <IonButtons slot="start">
            <Link className="link" to={{
                            pathname: '/chat/'}}>
              <IonButton color="dark" fill='clear'>客服</IonButton>
              </Link>
              <Link className="link" to={{
                            pathname: '/ShopInformation/'+this.state.product.sid}}>
              <IonButton color="dark" fill='clear'>店铺</IonButton></Link>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton color="warning" fill='solid' onClick={() => this.setState({ showModal: true })}>添加购物车</IonButton>
              <Link className="link" to={{
                            pathname: '/pay/'+this.state.product.pid
                        }}><IonButton color="danger" fill='solid'>立即购买</IonButton></Link>
            </IonButtons>
          </IonToolbar>
           : <IonButton color="dark" fill='clear' slot = "start">店铺</IonButton>}
        </IonFooter>
       
      </IonPage>
    );

  }
}

export default ProdPage
