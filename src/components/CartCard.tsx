import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './CartCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import {remove,add} from 'ionicons/icons';


type Props = {  
 /*title: string,
  src: string,
  slug: string,
  author: string ,
  description: string,
  favorited: boolean,
  favoritesCount: number,*/
  checkbox: boolean,
  psum:number,
  sumprice:number,
  incart: boolean
}

type State = {  
 /* favorited: boolean,
  favoritesCount: number,*/
  checkbox: boolean,
  psum:number,
  sumprice:number,
  incart: boolean
}


class CartCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
     /* favorited: this.props.favorited,
      favoritesCount: this.props.favoritesCount,*/
      checkbox:false,
      psum:1,
      sumprice:0.00,
      incart:true
      
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
 totalprice = () => {
   if(this.state.checkbox===true)
     {this.setState({sumprice:this.state.sumprice+25.86*this.state.psum})}
     else{this.setState({sumprice:this.state.sumprice-25.86*this.state.psum})}
  
  }
 toggleAction = () => {
   this.state.checkbox===false? this.setState({checkbox: true}):this.setState({checkbox: false})
  }
  deleteAction = () => {
   this.setState({incart: false})
  }
 addAction = () => {
  this.setState({psum:this.state.psum+1}) 
   
  }
 removeAction = () => {
  if(this.state.psum===1)
   {this.deleteAction()}
  else
  {this.setState({psum:this.state.psum-1})  
  }}
 totalAciton = () => {
   this.setState({checkbox: true})
}

card(){
  let url = CONFIG.API_ENDPOINT+"carts"
   return (  
   
           <IonItem>
             <img src={image} slot="start" width = '40%'/> 
              <IonGrid >
                <IonRow>
                  <IonCol size="10">
                  <Link className="sname" to={url}>
                  同仁堂药店</Link>
                  </IonCol >
                </IonRow>
                
               <IonRow>
                <IonCol size="20">
                <Link className="pname" to={url} text-left>同仁堂感冒灵颗粒</Link> 
                 </IonCol >
                </IonRow>
               
                 <IonRow> 
                  <IonCol  size="6" text-left>                  
                  <p className="price" >￥25.86</p>        
                  </IonCol>
                  
                </IonRow>
             {this.state.incart === true ?
               <IonRow> 
                  <IonButton color="white" onClick={this.removeAction}>
                     <IonIcon icon = {remove} color="danger"></IonIcon>
                   </IonButton>
                 <a className="pm">1</a>
                 <a className="psum">{this.state.psum}</a>
                  <IonButton color="white" onClick={this.addAction}>
                     <IonIcon icon = {add} color="danger"></IonIcon>
                   </IonButton>
              
                  <IonButton color="white" text-center onClick={this.deleteAction}>               
                  <p className="delete">删除</p>        
                  </IonButton> 
                 </IonRow>
                 : <><p className="delete">已删除</p></> }
               {this.state.checkbox=== true?
              <IonRow> <p className="delete">选中</p>  </IonRow> :<></>}
              </IonGrid> 
            {this.state.incart === true ?
             <IonCheckbox slot="end" value="pid" checked={this.state.checkbox} onIonChange={this.toggleAction}/> : <></> }

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

export default CartCard