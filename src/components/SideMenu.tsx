import React from 'react';
import { IonIcon, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,  IonMenuToggle } from '@ionic/react';
import { Link } from 'react-router-dom';


class SideMenu extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {      
      isLoggedIn: localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") :"false",   
	  routes:  {
        appPages: [
          { title: '首页', path: '/', icon: 'home' },         
        ],
        loggedInPages: [
          { title: '个人中心', path: '/buyerprofile/', icon: 'person'},            
          { title: '购物车', path: '/shoppingcart', icon: 'cart' },
          { title: '设置', path: '/settings', icon: 'settings' },
          { title: '退出登录', path: '/login', icon: 'log-out' }
        ],
        loggedOutPages: [
          { title: '登录', path: '/login', icon: 'log-in' },
          { title: '药店登录', path: '/sellerlogin', icon: 'log-in' }
        ] ,
      }
    }
    window.addEventListener('loggedIn', (e: any) => {            
      this.setState({
        isLoggedIn : e['detail'].toString(),
        routes : {
          appPages: [
            { title: '首页', path: '/', icon: 'home' },         
          ],
          loggedInPages: [
            { title: '个人中心', path: '/buyerprofile/', icon: 'person'},             
           { title: '购物车', path: '/shoppingcart', icon: 'cart' },
            { title: '修改账号信息', path: '/settings', icon: 'settings' },
            { title: '退出登录', path: '/login', icon: 'log-out' }
          ],
          loggedOutPages: [
            { title: '登录', path: '/login', icon: 'log-in' },
            { title: '药店登录', path: '/sellerlogin', icon: 'log-in' },
            { title: '医师登录', path: '/DoctorLogin', icon: 'log-in' },
            { title: '管理员登录', path: '/ManagerLogin', icon: 'log-in' }
          ],
       
        }        
      })      
 
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
              {this.state.isLoggedIn === "true" ? <> {this.state.routes.loggedInPages.map((art: any) =>
                this.renderMenuItem(art))} </> :<> {this.state.routes.loggedOutPages.map((art: any) =>
                this.renderMenuItem(art))} </> }
            </IonList>
          </IonContent>
        </IonMenu>
      )
  }
}
export default SideMenu
