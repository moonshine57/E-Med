import React from 'react';
import { IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';


type Props = { props:any };
type State = {username: string, password: string, bio: string, image: string, email: string, toastState: boolean};

class SettingsPage extends React.Component <Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     username: '',
     password: '',     
     bio: '',
     image: '',
     email: '',
     toastState: false
    };       
 
  }

  updateUserName = (event: any) => {
    this.setState({ username: event.detail.value});   
    console.log('*******************');
    console.log(event.detail.value);
    console.log(typeof event.detail.value);
  };


  updatePassword = (event: any) => {
    this.setState({ password: event.detail.value});
  };

  updateImage = (event: any) => {
    this.setState({ image: event.detail.value });
  };

  updateBio = (event: any) => {
    this.setState({ bio: event.detail.value});
  };
  

  componentDidMount() {
    let url = CONFIG.API_ENDPOINT+"user";
    
}  

update= () => {


    let credentials = {
          "uname": this.state.username,
          "upassword": this.state.password
          
        }    

    fetch(CONFIG.API_ENDPOINT+"user_md/changeinfo/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
                "Authorization": ""+ localStorage.getItem("token")             
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(
          (result) => {                      
              this.setState({
                toastState: true
              }) 
          },    
          (error) => {
           console.error(error);
          }
        )
  }
   
 render(){
    return(
      <>
        <Header title="修改账号信息"> </Header>
        <IonToast
        isOpen={this.state.toastState}
        onDidDismiss={() => this.setState(() => ({ toastState: false }))}
        message= "修改成功"
        duration={1000}
      ></IonToast>
        <IonContent>
          <form action="">
            <IonItem>
              <IonLabel position="fixed">用户名</IonLabel>
              <IonInput onIonChange={this.updateUserName} type="text" placeholder="用户名"
                value={this.state.username}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">密码</IonLabel>
              <IonInput onIonChange={this.updatePassword} type="password" placeholder="密码"
                value={this.state.password}></IonInput>
            </IonItem>
           
            <IonButton color="success" expand="block" onClick={this.update}>确认修改</IonButton>
          </form>
        </IonContent>
      </>
    )
  }
}
export default SettingsPage