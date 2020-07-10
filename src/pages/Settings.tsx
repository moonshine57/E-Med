import React from 'react';
import {IonChip, IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';


type Props = { props:any };
type State = {images:string,username: string, password: string, bio: string, image: string, email: string, toastState: boolean};

class SettingsPage extends React.Component <Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     username: '',
     password: '',     
     bio: '',
     image: '',
     email: '',
     toastState: false,
     images:''
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
          "upassword": this.state.password,
          "uimage":this.state.images
          
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
              }) ;
              localStorage.setItem("uimage",this.state.images)
          },    
          (error) => {
           console.error(error);
          }
        )
  }

  onChange = (event:any) => {
    event.preventDefault();
    var file = event.target.files[0];

    
    var images
    var ImageURL= window.URL.createObjectURL(file);
    //console.log(ImageURL);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e:any)=> {
     //console.log(e.target.result);
     images=e.target.result;
     //console.log(images);
     this.setState({
      images: e.target.result
      });
     //console.log(this.state.images);
    }
    var formData = new FormData();
    // 这里的 image 是字段，根据具体需求更改
    formData.append('image', file);
    //console.log(formData);
    //console.log(file);
//FR将图片转为Base64 成功输出

   };

   
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
           
            <IonChip class='upload-container'>
                <p>头像</p>
                 <input type="file" name="image" onChange={this.onChange} />
             </IonChip>
         
           
            <IonButton color="success" expand="block" onClick={this.update}>确认修改</IonButton>
          </form>
        </IonContent>
      </>
    )
  }
}
export default SettingsPage