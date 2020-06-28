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
    tab: any, 
    price: string, //价格
    category: string,//分类
    name:string,//药品名
    size:string,//规范
    symptoms: string,//适用症状
    usage:string,//适用方法
    para:string,//成分
    class: string,//处方药
    problems:string,//相关问题
    address: string,//发货地
    stock: string,//库存
    tags: Array<string>,//标签
    toastState: boolean,
    };

class NewArticlePage extends React.Component<Props & RouteComponentProps, State>    {
    constructor(props: any) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,                   
          value: "Write your article",
          tab: "write",
          price: '',
	  category:'',
          name:'',
          size:'',
          symptoms:'',
          usage:'',
          para:'',
          class: '',
          problems:'',
          tags: [],
          stock:'',
          address:'',
          toastState: false,
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
      handleBodyChange = (problems: any) => {
        this.setState({ problems });
      };
      handleTabChange = (tab: any) => {
        this.setState({ tab });
      };
      nameChange = (event: CustomEvent) => {    
        this.setState({ name: event.detail.value });
      }
      priceChange = (event: CustomEvent) => {
        this.setState({ price : event.detail.value });
      }
      categoryChange = (event: CustomEvent) => { 
        this.setState({ category: event.detail.value });
      }
      sizeChange = (event: CustomEvent) => { 
        this.setState({ size: event.detail.value });
      }
      symChange = (event: CustomEvent) => { 
        this.setState({ symptoms: event.detail.value });
      }
      useChange = (event: CustomEvent) => { 
        this.setState({ usage: event.detail.value });
      }
      paraChange = (event: CustomEvent) => { 
        this.setState({ para: event.detail.value });
      }
      addressChange = (event: CustomEvent) => {
        this.setState({address: event.detail.value});
      }
      stockChange = (event: CustomEvent) => {
        this.setState({stock: event.detail.value});
      }
      classchange = (event: CustomEvent) => {
        this.setState({class: event.detail.value});
        console.log(this.state.class);
      }
      tagsChange = (event: any) => {
        let tags =  (event.target as HTMLInputElement).value.split(',');
        this.setState({ tags: tags });
      } 
      submitProduct = (tag: any) =>{ 
          let productData = {
            "pro": {
                "category":this.state.category,
                "pname": this.state.name,
                "class": this.state.class,
                "price": this.state.price,
                "psize": this.state.size,
                "symptoms": this.state.symptoms,
                "usage": this.state.usage,
                "para": this.state.para,
                "problems": this.state.problems,
                "pkeyword": this.state.tags,
                "address": this.state.address,
                "stock": this.state.stock,
            }
          }        
        fetch(CONFIG.API_ENDPOINT+"pro_up/up/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+ localStorage.getItem("token") ,
            },
            body: JSON.stringify(productData)

        })
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({
                toastState: true,
                name: "",
                category:"",
                ptype:"",
                price: "",
                size:"",
                para:"",
                pusage:"",
                symptoms:"",
                address:"",
                stock:"",
                problems: "",
                tags: []
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
             <IonToast
        isOpen={this.state.toastState}
        onDidDismiss={() => this.setState(() => ({ toastState: false }))}
        message= "上架商品"
        duration={400}
      ></IonToast>
    <Header title="上架商品" />     
    <IonContent>        
    <form onSubmit={this.submitProduct}>
    <IonInput type="text" placeholder="药品名" onIonChange={this.nameChange} class="border-input"></IonInput>
    <IonInput type="text" placeholder="所属分类" onIonChange={this.categoryChange} class="border-input"></IonInput>
    <IonInput type="number" placeholder="库存量" onIonChange={this.stockChange} class="border-input"></IonInput>
    <IonItem>
        <IonLabel>处方药/非处方药</IonLabel>
        <IonSelect placeholder="选择是否为处方药" onIonChange={this.classchange}>
           <IonSelectOption value="处方药">处方药</IonSelectOption>
           <IonSelectOption value="非处方药">非处方药</IonSelectOption>
        </IonSelect>
    </IonItem>
    <IonInput type="text" placeholder="药品价格" onIonChange={this.priceChange} class="border-input"></IonInput>
    <IonInput type="text" placeholder="药品规格" onIonChange={this.sizeChange} class="border-input"></IonInput>
    <IonInput type="text" placeholder="适用症状" onIonChange={this.symChange} class="border-input"></IonInput>
    <IonInput type="text" placeholder="使用方法" onIonChange={this.useChange} class="border-input"></IonInput>
    <IonInput type="text" placeholder="主要成分" onIonChange={this.paraChange} class="border-input"></IonInput>
    <IonInput type="text" placeholder="发货地" onIonChange={this.addressChange} class="border-input"></IonInput>
    <IonInput type="number" placeholder="库存量" onIonChange={this.stockChange} class="border-input"></IonInput>
    <IonChip>
        <IonIcon icon={image} />
    	<IonLabel>上传药品照片</IonLabel>
    </IonChip>
    <p>请输入商品常见问题:</p>
          <ReactMde
          onChange={this.handleBodyChange}
          onTabChange={this.handleTabChange}
          value={this.state.problems}
          selectedTab={this.state.tab}
          generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
         <IonInput type="text"  placeholder="输入标签" class="border-input"  onIonChange={this.tagsChange}></IonInput>
         <IonButton expand="block" onClick={this.submitProduct}>提交商品</IonButton>        
      </form>
    </IonContent>
  </>
        )
    }

}
  
export default NewArticlePage
