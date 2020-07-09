import React from 'react';
import { IonRadio,IonToggle,IonCardContent,IonCardTitle,IonVirtualScroll,IonCardHeader,IonCard,IonAvatar,IonList,IonItem,IonSelect,IonSelectOption,IonChip, IonIcon, IonLabel, IonContent, IonButton, IonInput, IonToast,IonCheckbox} from '@ionic/react';
import CheckListMan from '../components/CheckListMan';
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
    shoplist: Array<any>,
    sid:string,
    sname:string,
    sprove:string,
   
  
    };

class ManagerCheck extends React.Component<Props & RouteComponentProps, State>    {
    constructor(props: any) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,                   
          shoplist:[],
          sid:"",
          sname:"",
          sprove:"",
         
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

     
 
  componentDidMount() {    
  
    fetch(CONFIG.API_ENDPOINT+"pl_rev/showSupAuth/", {
            method: 'GET',
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
             shoplist: res
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
          
          <Header title="管理员审核商家" />     

             <IonList>
           {this.state.shoplist.map((shop: any) =>
              <CheckListMan key={shop.sid}    sid={shop.sid}  sname={shop.sname} sprove={shop.sprove}
             
               ></CheckListMan>)}
              </IonList> 
          

  </>
        )
    }

}
  
export default ManagerCheck
