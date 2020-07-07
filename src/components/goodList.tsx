import React from 'react';
import {   IonCard, IonCardContent,IonAvatar, IonItem, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonCheckbox, IonList,IonFooter,IonToolbar,IonButtons,IonContent} from '@ionic/react'
import { Link } from 'react-router-dom';
import './goodlist.css';
import { CONFIG } from '../constants';
import image from '../assets/images/商品图片.jpg';
import {remove,add} from 'ionicons/icons';


type Props = {  
  uid: number,
  pid: number,
  pname: string,
  price: number,
  sname: string,
  psum:number,
  incart:boolean
}

type State = {  
  psum:number,
  incart:boolean
}


class GoodLists extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {      
     /* favorited: this.props.favorited,
      favoritesCount: this.props.favoritesCount,*/
      psum:this.props.psum,
      incart:true
    }
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


card(){
  let purl ="article/:slug"
   return (  
        /*
        
          <IonGrid >
                <IonRow>
                  <IonCol >
                         <IonCard>
                             <IonItem>
                             <IonIcon name="pin" slot="start"></IonIcon>
                         
                           
                              <Link className="pname" to={purl} text-left>{this.props.pname}</Link>
                             <Link className="pprice" to={purl} text-left>¥{this.props.price}</Link>
                            <IonButton fill="outline" slot="end">进入商品详情</IonButton>
                           </IonItem>
                          <IonCardContent>
                           <a href={"article/:slug"}>
                            <img src={image} slot="start" width = '40%' >
                              </img>
                            </a>
                             </IonCardContent>
                          
                        </IonCard>
                   </IonCol>
                  
                 </IonRow>
          </IonGrid>
          */
               <IonItem>
          <IonButton fill="outline" slot="end">进入商品详情</IonButton>
                <img src={image} slot="start" width = '40%'/> 
                
              <IonGrid >
               <IonRow>
                <IonCol size="20">
                <Link className="pname" to={purl} text-left>{this.props.pname}</Link> 
                 </IonCol >
                </IonRow>
               
                 <IonRow> 
                  <IonCol  size="6" text-left>                  
                  <p className="price" >价格：¥{this.props.price}</p>        
                  </IonCol>
                  
                </IonRow>
              
              </IonGrid> 
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

export default GoodLists