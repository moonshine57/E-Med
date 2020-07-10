import React from 'react';
import { IonIcon, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,  IonMenuToggle } from '@ionic/react';
import { Link } from 'react-router-dom';


class SideMenu extends React.Component<any, any> {
  constructor(props: any){
    super(props);
      console.log(localStorage.getItem("isLogin"));
   console.log(localStorage.getItem("SellerisLogin"));
    this.state = {      
      isLoggedIn: localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") :"false",
      SellerisLoggedIn: localStorage.getItem("SellerisLogin") ? localStorage.getItem("SellerisLogin") :"false",
	  routes:  {
        appPages: [
          { title: '首页', path: '/', icon: 'home' },         
        ],
        loggedInPages: [
          { title: '个人中心', path: '/buyerprofile', icon: 'person'},            
          { title: '购物车', path: '/shoppingcart', icon: 'cart' },
          { title: '设置', path: '/settings', icon: 'settings' },
          { title: '退出登录', path: '/login', icon: 'log-out' }
        ],
        loggedOutPages: [
          { title: '登录', path: '/login', icon: 'log-in' },
          { title: '药店登录', path: '/sellerlogin', icon: 'log-in' },
          { title: '医师登录', path: '/DoctorLogin', icon: 'log-in' },
          { title: '管理员登录', path: '/ManagerLogin', icon: 'log-in' }
        ] ,
      }
    }
   console.log(this.state.isLoggedIn);
   console.log(this.state.SellerisLoggedIn);
   
   
    window.addEventListener('loggedIn', (e: any) => {
      this.setState({isLoggedIn: localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") :"false",
                     SellerisLoggedIn: localStorage.getItem("SellerisLogin") ? localStorage.getItem("SellerisLogin") :"false"})
     if(this.state.isLoggedIn==="true")
      {
      this.setState({
        isLoggedIn :e['detail'].toString(), 
        SellerisLoggedIn : false,
        routes : {
          appPages: [
            { title: '首页', path: '/', icon: 'home' },         
          ],
          loggedInPages: [
            { title: '个人中心', path: '/buyerprofile', icon: 'person'},             
            { title: '购物车', path: '/shoppingcart', icon: 'cart' },
            { title: '设置', path: '/settings', icon: 'settings' },
            { title: '退出登录', path: '/login', icon: 'log-out' }
          ],
          loggedOutPages: [
            { title: '登录', path: '/login', icon: 'log-in' },
            { title: '药店登录', path: '/sellerlogin', icon: 'log-in' },
            { title: '医师登录', path: '/DoctorLogin', icon: 'log-in' },
            { title: '管理员登录', path: '/ManagerLogin', icon: 'log-in' }
          ],}        
      })};
     
      if(this.state.SellerisLoggedIn==="true")
      {
      this.setState({
        isLoggedIn :false,
        SellerisLoggedIn : e['detail'].toString(),
        routes : {
          appPages: [
            { title: '首页', path: '/', icon: 'home' },         
          ],
          loggedInPages: [
            { title: '帐号管理', path: '/SetShopInformation', icon: 'person'},  
            { title: '商品管理', path: '/prodmanage', icon: 'person'},             
            { title: '消息', path: '/sellerchat', icon: 'cart' },
            { title: '订单管理', path: '/sellerorder', icon: 'settings' },
            { title: '退出登录', path: '/sellerlogin', icon: 'log-out' }
          ],
          loggedOutPages: [
            { title: '登录', path: '/login', icon: 'log-in' },
            { title: '药店登录', path: '/sellerlogin', icon: 'log-in' },
            { title: '医师登录', path: '/DoctorLogin', icon: 'log-in' },
            { title: '管理员登录', path: '/ManagerLogin', icon: 'log-in' }
          ],}        
      })}  
     console.log(typeof this.state.isLoggedIn);
      console.log(this.state.isLoggedIn);
     console.log(typeof this.state.SellerisLoggedIn);
      console.log(this.state.SellerisLoggedIn);
      console.log(this.state.routes.loggedInPages);
    });  
  } 
    
   renderMenuItem(menu: any) {
    return (
         <IonMenuToggle key={menu.title} auto-hide="false">
                   <IonItem>
                     <IonIcon name={menu.icon} ></IonIcon>
                     <Link replace className="sidemenu-link" to={menu.path} >{menu.title}</Link> 
                   </IonItem>
                   </IonMenuToggle>
      )
  }
  
  render() {
      return (  
        <IonMenu side="start" menuId="first" contentId="main">
          <IonHeader>
            <IonToolbar color="success">
              <IonTitle>菜单</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {this.state.routes.appPages.map((art: any) => this.renderMenuItem(art))}
              {this.state.isLoggedIn === "true" ? 
              <> {this.state.routes.loggedInPages.map((art: any) =>
                this.renderMenuItem(art))} </> :
              <> {this.state.SellerisLoggedIn === "true" ? 
               <> {this.state.routes.loggedInPages.map((art: any) =>
                this.renderMenuItem(art))} </> :
               <> {this.state.routes.loggedOutPages.map((art: any) =>
                this.renderMenuItem(art))}</> }</> }
             
            </IonList>
          </IonContent>
        </IonMenu>
      )
  }
}
export default SideMenu
