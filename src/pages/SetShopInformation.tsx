import React from 'react';
import { IonItem,IonSelect,IonSelectOption,IonChip, IonIcon, IonLabel, IonContent, IonButton, IonInput, IonToast} from '@ionic/react';
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css"; 
import * as Showdown from "showdown"; 
import './Article.css';
import { RouteComponentProps } from 'react-router';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import {image} from 'ionicons/icons';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';

type Props = { props: {
    match: any
} };
type State = { 
    error: any, 
    isLoaded: boolean, 
    value: any, 
    name:string,//店铺名
    password:string,//密码
    sname:string,
    prove:string,//资质证明
    address:string,//店铺地址
    phone:string,//电话
    sstag:string,//
    keyword:string,//
    introduction:string,//相关问题
    tab: any, 
    toastState: boolean,
    state:string, //资质审核状态
    images_logo:string,    
};

class SetShopInformation extends React.Component<Props & RouteComponentProps, State>    {
    constructor(props: any) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,                   
          value: "Write your article",
          name:'',
          password:'',
          sname:"店铺名称",
          address:'',
          prove:'',
          phone:'',
          sstag:'',
          keyword:'',
          toastState: false,
          introduction:'',
          tab: "write",
          state: "",
          images_logo:''
        };
        
        this.setEditor = (editor: any) => {
          this.editor = editor;
        };
        this.focusEditor = () => {
          if (this.editor) {
            this.editor.focus();
          }
        };
        
        this.converter = new Showdown.Converter({
          tables: true,
          simplifiedAutoLink: true,
          strikethrough: true,
          tasklists: true
        });
     
      }
      setEditor: any;
      editor:any;
      focusEditor: any;
      converter: any;
      handleBodyChange = (introduction: any) => {
        this.setState({ introduction });
      };
      nameChange = (event: CustomEvent) => {    
        this.setState({ name: event.detail.value });
      }
      proveChange = (event: CustomEvent) => {    
        this.setState({ prove: event.detail.value });
      }
      keywordChange = (event: CustomEvent) => {    
        this.setState({ keyword: event.detail.value });
      }
      sstagChange = (event: CustomEvent) => {    
        this.setState({ sstag: event.detail.value });
      }
      passwordChange = (event: CustomEvent) => {    
        this.setState({ password: event.detail.value });
      }
      addressChange = (event: CustomEvent) => { 
        this.setState({ address: event.detail.value });
      }
      phoneChange = (event: CustomEvent) => {    
        this.setState({ phone: event.detail.value });
      }
      handleTabChange = (tab: any) => {
        this.setState({ tab });
      };
      submitShop = (tag: any) =>{ 
          let ShopData = {
           
                "sname": this.state.name,
                "spassword": this.state.password,
                "saddress": this.state.address,
                "sintro": this.state.introduction,
                "sprove": this.state.prove,
                "sphone": this.state.phone,
                "stag": this.state.sstag,
                "skeyword": this.state.keyword,
                "logo":this.state.images_logo,
           
          }  
          console.log(ShopData);
        fetch(CONFIG.API_ENDPOINT+"sup_med/sinfo_edit/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": ""+localStorage.getItem("token"),
            },
            body: JSON.stringify(ShopData)

        })
        .then(res => res.json())
        .then(
          (res) => {
              this.setState({
                toastState: true,
               
                
              })       

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
       console.log(ImageURL);
       var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = (e:any)=> {
        console.log(e.target.result);
        images=e.target.result;
        console.log(images);
        this.setState({
         images_logo: e.target.result
         });
        console.log(this.state.images_logo);
       }
       var formData = new FormData();
       // 这里的 image 是字段，根据具体需求更改
       formData.append('image', file);
       console.log(formData);
       console.log(file);
 //FR将图片转为Base64 成功输出

      };
 onChange2 = (event:any) => {
       event.preventDefault();
       var file = event.target.files[0];

       var images
       var ImageURL= window.URL.createObjectURL(file);
       console.log(ImageURL);
       var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = (e:any)=> {
        console.log(e.target.result);
        images=e.target.result;
        console.log(images);
        this.setState({
         prove: e.target.result
         });
        console.log(this.state.prove);
       }
       var formData = new FormData();
       // 这里的 image 是字段，根据具体需求更改
       formData.append('image', file);
       console.log(formData);
       console.log(file);
 //FR将图片转为Base64 成功输出

      };
 
  componentDidMount() {    
  
    fetch(CONFIG.API_ENDPOINT+"sup_med/sinfo_show/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
                "Authorization": ""+localStorage.getItem("token")
            },
        })
      .then(res => res.json())
      .then(
        (res) => {
         res = JSON.parse(res);
         console.log("!!!!!!");
         console.log(res);
          this.setState({           
           
            name:res.sname,
            password:res.spassword,
            address:res.saddress,
            introduction:res.sintro,
            prove:res.sprove,
            phone:res.sphone,
            sstag:res.stag,
            keyword:res.skeyword,
            state:res.sstate
          
          });
     
       
        },
        
        (err) => {
            console.error(err);
       }
      )
  
  }
    render(){
        return(
            <>
             <IonToast
        isOpen={this.state.toastState}
        onDidDismiss={() => this.setState(() => ({ toastState: false }))}
        message= "商家账号信息管理"
        duration={400}
      ></IonToast>
    <Header title="商家账号信息修改" />     
    <IonContent>        
    <form onSubmit={this.submitShop}>
   
    <IonInput type="text" placeholder={this.state.name} onIonChange={this.nameChange} class="border-input">店铺名称</IonInput>
     <IonInput type="password" placeholder={this.state.password} onIonChange={this.passwordChange} class="border-input">账户密码</IonInput>
    
       <IonInput type="text" placeholder={this.state.phone} onIonChange={this.phoneChange} class="border-input">商家电话</IonInput>
    <IonInput type="text" placeholder={this.state.address} onIonChange={this.addressChange} class="border-input">商家地址</IonInput>
      <IonInput type="text" placeholder={this.state.keyword} onIonChange={this.keywordChange} class="border-input">检索推荐词</IonInput>
      <IonInput type="text" placeholder={this.state.sstag} onIonChange={this.sstagChange} class="border-input">店铺标签</IonInput>
     
         <IonLabel>审核状态：    {this.state.state} </IonLabel>
     <p>请输入店铺介绍:</p>
          <ReactMde
          onChange={this.handleBodyChange}
          onTabChange={this.handleTabChange}
          value={this.state.introduction}
          selectedTab={this.state.tab}
          generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
          }
        />

    
      <IonLabel>上传店铺logo</IonLabel>
     <IonChip class='upload-container'>
     
        <input type="file" name="image" onChange={this.onChange} />
    </IonChip>
          <IonLabel>资质材料</IonLabel>
     
     <IonChip class='upload-container'>

        <input  type="file" name="image" onChange={this.onChange2} />
    </IonChip>
    
         <IonButton color="success" expand="block" onClick={this.submitShop}>提交修改</IonButton>        
      </form>
    </IonContent>
  </>
        )
    }

}
  
export default SetShopInformation
