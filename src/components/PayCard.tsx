import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './CartCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import {remove,add} from 'ionicons/icons';


type Props = {  
  pname: string,
  price: number,
  sname: string,
  psum:number
}

type State = {  
  psum:number
}


class PayCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
     
      psum:this.props.psum
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
 
card(){
   return (  
   
           <IonItem>
             <img src={image} slot="start" width = '40%'/> 
              <IonGrid >
                <IonRow>
                  <IonCol size="10">
                  <a className="sname" >{this.props.sname}</a>
                  </IonCol >
                </IonRow>
                
               <IonRow>
                <IonCol size="20">
                <a className="pname">{this.props.pname}</a> 
                 </IonCol >
                </IonRow>
               
                 <IonRow> 
                  <IonCol  size="6" text-left>                  
                  <p className="price" >价格：¥{this.props.price}</p>        
                  </IonCol>
                  
                </IonRow>
           
               <IonRow> 
                <a className="psum">数量：{this.state.psum}</a>
                 </IonRow>
               
              
              </IonGrid> 
            {/*this.state.incart === true ?
             <IonCheckbox slot="end" value="pid" checked={this.state.checkbox} onIonChange={this.toggleAction}/> : <></> */}

          </IonItem> 
        
  )
}  

  render() {   
      return (
        <>
        {this.card()} <IonItem><p>  </p></IonItem>
        {/*localStorage.getItem("isLogin") === "true" ? this.loggedInCard() : this.loggedOutCard()*/} 
      </>               
      );    
  }
}

export default PayCard