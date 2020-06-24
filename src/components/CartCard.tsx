import React from 'react';
import {  IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox} from '@ionic/react'
import { Link } from 'react-router-dom';
import './CartCard.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';


type Props = {  
  title: string,
  src: string,
  description: string,
  favorited: boolean,
  favoritesCount: number,
  slug: string,
  checkbox: boolean,
  incart: boolean,
  author: string  
}

type State = {  
  favorited: boolean,
  checkbox: boolean,
  incart: boolean,
  favoritesCount: number
}

class CartCard extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
      favorited: this.props.favorited,
      checkbox:false,
      incart:true,
      favoritesCount: this.props.favoritesCount
    }
    this.routeLink = '/article/'+this.props.slug;
    this.profileLink = '/profile/'+this.props.author;
    

  }
  routeLink: string;
  profileLink: string;
 favoriteArticle = (params: any) => {
 
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
}

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
}  
 totalprice = () => {
    let sum="0";
    if(this.state.checkbox==true)
     {sum+="25.86"}
     else{sum+="-25.86"}
   return {sum}
  }
 toggleAction = () => {
    this.state.checkbox === false ? this.setState({checkbox: true}) : this.setState({checkbox: false})
  }
  deleteAction = () => {
     this.state.incart === true ? this.setState({incart: false}) : this.setState({incart: true})
  }

card() {
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
                   <IonCheckbox slot="end" value="pid" checked={false}/>
                </IonRow>
             {this.state.incart === true ?
               <IonRow> 
                <IonCol size="8" text-right>
                 <span className="psum">数量：1</span>
                </IonCol>
              
                  <IonButton color="white" text-center onClick={this.deleteAction}>               
                  <p className="delete">删除</p>        
                  </IonButton> 
                 </IonRow>
                 : <><p className="delete">已删除</p></> }
              </IonGrid> 
            {this.state.incart === true ?
             <IonCheckbox slot="end" value="pid" checked={false}/> : <></> }

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