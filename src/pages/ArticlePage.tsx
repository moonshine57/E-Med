import React from 'react';
import {  IonFooter,IonToolbar,IonButtons,IonBackButton,IonTitle,IonPage,IonAvatar, IonLabel, IonButton, IonContent, IonChip,  IonTextarea,IonFab,IonFabButton,IonIcon} from '@ionic/react'
import {  RouteComponentProps } from 'react-router-dom';
import * as Showdown from "showdown";
import Comment from '../components/Comment';
import "./Article.css"
import Header from '../components/Header';
import { CONFIG } from '../constants';

import image from '../assets/images/商品图片.jpg';
import {location } from 'ionicons/icons';

type Props = {  
 
}

type State = {  
  article: any,
  author: any,
  comments: any,
  comment: string
}

class ArticlePage extends React.Component<Props & RouteComponentProps<any>, State> {

  constructor(props: any){
    super(props);

    this.state = {     
        article: '',   
        author: '',
        comments: [],
        comment: ''           
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
  fetchArticle(url: string){
    let headers;
    if(localStorage.getItem("isLogin") && localStorage.getItem("isLogin") == "true"){ 
      headers =  {
        "Content-Type": "application/json",  
        "Authorization": "Token "+ localStorage.getItem("token")           
    }
    } else {
      headers =  {
        "Content-Type": "application/json",                      
    }

    }
    return fetch(url, {
      method: 'GET',
            headers: headers, 
    }).then((res) => res.json())
  }
  componentDidMount() {
      let url = CONFIG.API_ENDPOINT+"articles/"+ this.props.match.params.slug;
      let commentsUrl = url + '/comments';
      let headers:any;
     

      Promise.all([this.fetchArticle(url),this.fetchArticle(commentsUrl)]).then(
        (result) => {
          this.setState({
            article: result[0].article,
            author: result[0].article.author,
            comments: result[1].comments

          })
        }
      ) 

  }  

  updateComment = (event: any) => {
    this.setState({ comment: event.detail.value });
   
  }

  deleteComment = (e: any) => {
    this.setState({
      comments: this.state.comments.filter((com: any) => com.id !== e )
    })
    
  }
  addComment = () => {
    let url = CONFIG.API_ENDPOINT+"articles/"+ this.props.match.params.slug;
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
 this.setState({comments: newComments, comment: ''})
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

             <div className="ion-text-center">
             <img src={image} alt="img" width="100%" /> 
             </div>
            <div className="ion-padding-left ion-padding-right">
              <div className="article-title" >￥16.4</div>
              <div className="product-name" >同仁堂感冒清热颗粒10袋退烧药止咳清肺感冒药感冒灵</div>

              <IonChip onClick={this.viewAuthor}>
                <IonAvatar>
                  <IonIcon icon={location} color = 'medium'/>
                </IonAvatar>
                <IonLabel>广东广州 </IonLabel>

              </IonChip>

              <IonChip>
                月销102
              </IonChip>

              <hr />
              

            </div>
            <hr className="horizontal-line" />

            {this.state.comments.length > 0 ?
            <div>
              {this.state.comments.map((art: any, index: number) =>
              <Comment key={art.id} body={art.body} slug={this.state.article.slug} createdAt={art.createdAt}
                commentId={art.id} username={art.author.username} onDeleteComment={this.deleteComment}></Comment>
              )}
            </div>: <p className="ion-text-center">
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
            </div>: '' }
           <div dangerouslySetInnerHTML={ { __html: this.converter.makeHtml("在这里放商品详情")}}></div>
          </IonContent>
        <IonFooter>
          <IonToolbar>
    <IonButtons slot="start">
       <IonButton color="dark" fill = 'clear'>客服</IonButton>
     <IonButton color="dark" fill = 'clear'>店铺</IonButton>
    </IonButtons>
    <IonButtons slot="end">
       <IonButton color="warning" fill = 'solid'>添加购物车</IonButton>
     <IonButton color="danger" fill = 'solid'>立即购买</IonButton>
    </IonButtons>
  </IonToolbar>
         </IonFooter>
        </IonPage>
      );
    
  }
}

export default ArticlePage