import React from 'react';
import { IonToolbar,  IonContent,   IonButton, IonInput, IonToast, IonItem,  IonFooter } from '@ionic/react';
// import { any } from 'prop-types';
import image from '../assets/images/playstore-icon.png';
import { RouteComponentProps } from 'react-router';
import Header from '../components/Header';
import { CONFIG } from '../constants';

type Props = { props:any };
type State = {username: string, password: string, toastState: boolean, toastMessage: string, action: string, prove: string};
//定义类
class SellerLoginPage extends React.Component <Props & RouteComponentProps<any>, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     username: '',
     password: '',
     toastState: false,
     toastMessage: 'Message',
     action: "Login",
     prove: ''
    };           
    this.event = new CustomEvent('loggedIn', {
      detail: false
    });
    
 
  }
  event: Event;

  updateUserName = (event: any) => {
    this.setState({ username: event.detail.value });    
  };

  updatePassword = (event: any) => {
    this.setState({ password: event.detail.value });
  };

  updateProve = (event: any) => {
    this.setState({ prove: event.detail.value });
  };
  toggleAction = () => {
    this.state.action === 'Login' ? this.setState({action: 'SignUp'}) : this.setState({action: 'Login'})
  }
  componentDidMount(){ 
    this.clearCredentials();
    this.props.history.listen((location, action) => {
    if(location.pathname == "/sellerlogin"){
      this.clearCredentials();
    }
})
    

  }

  clearCredentials(){
    this.event = new CustomEvent('loggedIn', {
      detail: false
    });
    window.dispatchEvent(this.event);   
    localStorage.removeItem("token");       
            localStorage.removeItem("username");
            localStorage.removeItem("isLogin");
            localStorage.removeItem("prove");
  }


  login= () => {
    let url , credentials;     
    if(this.state.action  == 'Login'){
      url = CONFIG.API_ENDPOINT + 'sup_med/login/';
      credentials = {
        "sup": {
          "sname": this.state.username,
          "spassword": this.state.password
      }
      }

    } else {
      url = CONFIG.API_ENDPOINT + 'sup_med/register/';
      credentials = {
        "sup": {
          "sname": this.state.username,
          "spassword": this.state.password,
          "sprove": this.state.prove
      }
      }
    }
    fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",              
            },
            body: JSON.stringify(credentials)

        })
        .then((res) => {
          console.log(this.state.username);
          console.log(this.state.password);
          if(res.status == 200){
            return res.json();
          } else {  
            if(this.state.action == 'SignUp') {
			  if(res.status == 300){throw new Error("该用户名已被注册")}
              else{throw new Error("注册商家出错")}
           
			} else {
              if(res.status == 404)
               throw new Error("用户不存在");
              else{throw new Error("密码错误");}
			  
			  
            }                
          }
         
        } )
        .then(
          (result) => {
                localStorage.setItem("token",result.sup.token);       
                localStorage.setItem("username", result.sup.sname);
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("prove", result.sup.sprove);

                this.event = new CustomEvent('loggedIn', {
                  detail: true,
                });
                window.dispatchEvent(this.event);
                this.props.history.replace('/');
          },
    
          (error) => {
           console.error(error);           
           this.setState({toastMessage: error.toString(), toastState: true});
          }
        )
  }

  render(){
    return(
      <>
    <Header title="商家登录"></Header>    
    <IonContent >

    <div className="ion-text-center">
    <img src={image} alt="logo" width="100%" /> 
    </div>
    <h1 className="ion-text-center conduit-title">E-Med</h1>      

    <IonToast
        isOpen={this.state.toastState}
        onDidDismiss={() => this.setState(() => ({ toastState: false }))}
        message= {this.state.toastMessage}
        duration={400}
      />
      
        
    <form action="">
    
    <IonItem>
      
      <IonInput  onIonChange={this.updateUserName} type="text" placeholder="用户名"></IonInput>
    </IonItem>
    {this.state.action === 'SignUp' ?    
      <IonItem>
       
        <IonInput onIonChange={this.updateProve} type="url" placeholder="证明资料"></IonInput>
      </IonItem>
      : <></> }
    
    <IonItem>
    <IonInput onIonChange={this.updatePassword} type="password" placeholder="密码"></IonInput>      
    </IonItem>

    </form>      
    
            <IonButton onClick={this.login}>{this.state.action === 'Login'?'登录':'注册'}</IonButton>    
     <IonToolbar text-center>
          点击<a onClick={this.toggleAction}>{this.state.action === 'Login'? '开店' : '登录'}</a>
      </IonToolbar>
         
    </IonContent>
  </>
    )
  }
}
export default SellerLoginPage
