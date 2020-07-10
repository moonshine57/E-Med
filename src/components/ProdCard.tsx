import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './ProdCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = {  
  pid:number,
  pname:string,
  price:number,
  p_picture:string,
  onsale: boolean
}

type State = {  
 /* favorited: boolean,
  favoritesCount: number,*/
  onsale: boolean
}


class ProdCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
     /* favorited: this.props.favorited,
      favoritesCount: this.props.favoritesCount,*/
      onsale:true
      
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
   this.setState({onsale: false})
   
  let url = CONFIG.API_ENDPOINT+"pro_up/pro_down/"
  let removepro = {"pid":this.props.pid}
  console.log(this.props.pid);
  fetch(url, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json", 
         "Authorization": ""+localStorage.getItem("token")
      },
       body: JSON.stringify(removepro)
    })
  }
 

card(){
  let purl ="article/:slug"
   return (  
   
           <IonItem>
             <img src={this.props.p_picture} slot="start" width = '40%'/> 
              <IonGrid >
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
             { this.state.onsale===true?
               <IonRow> 
                
                  <IonButton color="light" text-center onClick={this.deleteAction}>                                 <p className="delete">删除</p>        
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

export default ProdCard