import React, { Component } from 'react';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './App.css';
import {
  IonApp, 
  IonPage,
  IonRouterOutlet,
  IonSplitPane
} from '@ionic/react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SellerLoginPage from './pages/SellerLogin';
import ProfilePage from './pages/ProfilePage';
import SideMenu from './components/SideMenu';
import HomePage from './pages/HomePage';
import ProdPage from './pages/ProdPage';
import SettingsPage from './pages/Settings';
import NewArticlePage from './pages/NewArticle';
import BuyerProfilePage from './pages/BuyerProfilePage';
import ShoppingCartPage from './pages/ShoppingCart';
import PayPage from './pages/PayPage';
import AddressPage from './pages/AddressPage';
import ProdManagePage from './pages/ProdManage';
import SellerOrderPage from './pages/SellerOrder';
import LogisticsPage from './pages/LogisticsPage';
import CommentPage from './pages/CommentPage';
import SetShopInformation from './pages/SetShopInformation';
import DoctorLogin from './pages/DoctorLogin';
import ManagerLogin from './pages/ManagerLogin';
import ChatPage from './pages/ChatPage';
import SellerChatPage from './pages/sellerChatPage';
//
//
import ShopInformation from './pages/ShopInformation';
//
class App extends Component {
  constructor(props: any){
        super(props);
        }
  render() {
    return (
      <Router>
        <div className="App">        
          <IonApp>
          <IonSplitPane contentId="main">         
            <SideMenu></SideMenu>
            <IonPage id="main">        
              <IonRouterOutlet>
                <Route exact path="/" component={HomePage} />
                <Route path="/product/:pid" component={ProdPage} />
                <Route path="/profile/:authorname" component={ProfilePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/sellerlogin" component={SellerLoginPage} />   
                <Route path="/settings" component={SettingsPage} />
                <Route path="/newarticle" component={NewArticlePage} />
                <Route path="/buyerprofile" component={BuyerProfilePage} />
                <Route path="/shoppingcart" component={ShoppingCartPage} />
                <Route path="/pay" component={PayPage} />
                <Route path="/address" component={AddressPage} />
                <Route path="/prodmanage" component={ProdManagePage} />
                <Route path="/sellerorder" component={SellerOrderPage} />
                <Route path="/logistics" component={LogisticsPage} />
                <Route path="/comment" component={CommentPage} />
                <Route path="/SetShopInformation" component={SetShopInformation} />
                <Route path="/DoctorLogin" component={DoctorLogin} />
                <Route path="/ManagerLogin" component={ManagerLogin} />
                <Route path="/ShopInformation" component={ShopInformation} />
                <Route path="/chat" component={ChatPage} />
                <Route path="/sellerchat" component={SellerChatPage} />

              </IonRouterOutlet>
            </IonPage>
            </IonSplitPane>
          </IonApp>
        </div>
      </Router>
    );
  }
}

export default App;
