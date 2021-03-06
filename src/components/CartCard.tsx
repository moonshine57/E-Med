import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './CartCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import {remove,add} from 'ionicons/icons';


type Props = {  
  uid: number,
  sid: number,
  pid: number,
  pname: string,
  price: number,
  sname: string,
  psum:number,
  p_picture: string,
  incart:boolean
}

type State = {  
  psum:number,
  incart:boolean
}


class CartCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
     /* favorited: this.props.favorited,
      favoritesCount: this.props.favoritesCount,*/
      psum:this.props.psum,
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

 /*toggleAction = () => {
   this.state.checkbox===false? this.setState({checkbox: true}):this.setState({checkbox: false})
  }*/
  deleteAction = () => {
   this.setState({incart: false})
   let url = CONFIG.API_ENDPOINT+"user_md/deletecart/"
  let deletecart = {"pid":this.props.pid}
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(deletecart)
    })
  }
 addAction = () => {
  this.setState({psum:this.state.psum+1}) 
  
  let url = CONFIG.API_ENDPOINT+"user_md/addcart/"
  let addcart = {"pid":this.props.pid,"psum":1}
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(addcart)
    })
  
  }
 removeAction = () => {
  if(this.state.psum===1)
   {this.deleteAction()}
  else
  {this.setState({psum:this.state.psum-1}) 
   
  let url = CONFIG.API_ENDPOINT+"user_md/reducecart/"
  let removecart = {"pid":this.props.pid}
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(removecart)
    })
  }}
 /*totalAciton = () => {
   this.setState({checkbox: true})
}*/

card(){
  let surl ="ShopInformation/"+this.props.sid
  let purl ="product/"+this.props.pid
   return (  
   
           <IonItem>
             <img src={this.props.p_picture} slot="start" width = '40%'/> 
              <IonGrid >
                <IonRow>
                  <IonCol size="10">
                  <Link className="sname" to={surl}>
                  {this.props.sname}</Link>
                  </IonCol >
                </IonRow>
                
               <IonRow>
                <IonCol size="20">
                <Link className="pname" to={purl} text-left>{this.props.pname}</Link> 
                 </IonCol >
                </IonRow>
               
                 <IonRow> 
                  <IonCol  size="10" text-left>                  
                  <p className="price" >价格：¥{this.props.price}</p>        
                  </IonCol>
                  
                </IonRow>
            {this.state.incart === true ? 
               <IonRow> 
                  <IonButton color="white" onClick={this.removeAction} size="small">
                     <IonIcon icon = {remove} color="danger"></IonIcon>
                   </IonButton>
                 <a className="pm">1</a>
                 <a className="psum">{this.state.psum}</a>
                  <IonButton color="white" onClick={this.addAction} size="small">
                     <IonIcon icon = {add} color="danger"></IonIcon>
                   </IonButton>
              
                  <IonButton color="white" text-center onClick={this.deleteAction}>                                 <p className="delete">删除</p>        
                  </IonButton> 
                 </IonRow>
                : <><p className="delete">已删除</p></> }
              
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

export default CartCard