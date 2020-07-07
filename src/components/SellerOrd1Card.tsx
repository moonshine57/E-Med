import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent,IonInput} from '@ionic/react'
import { Link } from 'react-router-dom';
import './SellerOrder.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';

type Props = {  
 /*title: string,
  src: string,
  slug: string,
  author: string ,
  description: string,
  favorited: boolean,
  favoritesCount: number,*/
  psum:number,
  expno:number,
  inexpno: boolean
}

type State = {  
 /* favorited: boolean,
  favoritesCount: number,*/
  psum:number,
  expno:number,
  inexpno: boolean
}


class SellerOrd1Card extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
     /* favorited: this.props.favorited,
      favoritesCount: this.props.favoritesCount,*/
      psum:1,
      expno:0,
      inexpno:false
      
    }
   /* this.routeLink = '/article/'+this.props.slug;
    this.profileLink = '/profile/'+this.props.author;*/
   

  }

/*  routeLink: string;
  profileLink: string;*/
/* favoriteArticle = (params: any) => {
 
  let url = CONFIG.API_ENDPOINT+"articles/" + this.props.slug + '/favorite';
  let method;
  if (!this.state.favorited) {
    method = 'POST'
  } else {
    method = "DELETE"
  }
  fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage.getItem("token"),
      }
    })
    .then(res => res.json())
    .then(
      (res) => {       
        this.setState({
          favorited: res.article.favorited,
          checkbox:false,
          incart:true,
          favoritesCount: res.article.favoritesCount,
        })
      },
      (err) => {
        console.error(err);
      }
    )
}*/
/*
loggedInCard(){
  return (        
           <IonItemSliding>
          {this.loggedOutCard()}
        <IonItemOptions side="end">
          <IonItemOption  color={this.state.favorited ? "success": "light"} onClick={this.favoriteArticle}>
          <IonIcon color={this.state.favorited ? "light": "success"} class="icon-blog-card" name="heart" />{this.state.favoritesCount}</IonItemOption>
        </IonItemOptions>
      </IonItemSliding>           
  )
}

loggedOutCard() {
  return (                 
           <IonItem >
          <IonAvatar slot="start">
              <img src={this.props.src} />              
            </IonAvatar>
            <IonLabel>
              <p className="title">{this.props.title}</p>              
              <IonGrid >
                <IonRow>
                  <IonCol class="author" size="6">
                  <Link className="link" to={this.profileLink}>
                  {this.props.author}</Link>                     
                 </IonCol>
                  <IonCol  size="6" text-right>                  
                  <Link className="link" to={this.routeLink}>Read More</Link>        
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>      
  )
}  */

 /*toggleAction = () => {
   this.state.checkbox===false? this.setState({checkbox: true}):this.setState({checkbox: false})
  }*/
  expnoAction = () => {
   this.setState({inexpno: true})
  }
  expnoChange = (event: CustomEvent) => {    
        this.setState({ expno: event.detail.value });
   console.log(this.state.expno);
      }
 
 /*totalAciton = () => {
   this.setState({checkbox: true})
}*/
 deleteAction = () => {
   this.setState({inexpno: false})
  }
 submitAction= () => {
   this.setState({inexpno: false})
   let expData = {
            "ordno":this.state.psum,
            "expno":this.state.expno
          }        
        fetch(CONFIG.API_ENDPOINT+"order_md/changestatus/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": ""+ localStorage.getItem("token") ,
            },
            body: JSON.stringify(expData)

        })
        
  }

card(){
  let url ="newarticle"
   return ( 
         <IonItem>
              <IonGrid >
                <IonRow>
                  <IonCol size="10">
                  <Link className="ordno" to={url}>
                  订单编号:</Link>
                  </IonCol >
                </IonRow>
                
               <IonRow>
                <IonCol size="20">
                <p className="pname" text-left>同仁堂感冒灵颗粒*1 急支糖浆*2</p> 
                 </IonCol >
                </IonRow>
               
                 <IonRow> 
                  <IonCol  size="6" text-left>                  
                  <p className="receive" >收货信息：</p>        
                  </IonCol>
                </IonRow>
               { this.state.inexpno === false ?
               <IonRow> 
                <IonButton color="secondary" text-center onClick={this.expnoAction}>                                        上传快递单号       
                  </IonButton>  </IonRow>
                 : <><IonRow>
                 <IonInput type="text" placeholder="快递单号" onIonChange={this.expnoChange} class="border-input"></IonInput></IonRow>
                  <IonRow> 
                <IonButton color="secondary" text-center onClick={this.submitAction}>确认</IonButton>
                   <IonButton color="danger" text-center onClick={this.deleteAction}>取消</IonButton>
                 </IonRow></>}
              </IonGrid> 
            {/*this.state.incart === true ?
             <IonCheckbox slot="end" value="pid" checked={this.state.checkbox} onIonChange={this.toggleAction}/> : <></> */}

          </IonItem> 
        
  )
}  

  render() {   
      return (
        <>
         <IonItem><p>  </p></IonItem>
        {this.card()}
        {/*localStorage.getItem("isLogin") === "true" ? this.loggedInCard() : this.loggedOutCard()*/} 
      </>               
      );    
  }
}

export default SellerOrd1Card