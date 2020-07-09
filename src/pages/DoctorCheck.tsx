import React from 'react';
import { IonRadio,IonToggle,IonCardContent,IonCardTitle,IonVirtualScroll,IonCardHeader,IonCard,IonAvatar,IonList,IonItem,IonSelect,IonSelectOption,IonChip, IonIcon, IonLabel, IonContent, IonButton, IonInput, IonToast,IonCheckbox} from '@ionic/react';
import CheckListDoc from '../components/checklist_doc';
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
    orderlist: Array<any>,
    ordno:string,
    //pid:string,
    //pname:string,
   // pro: Array<any>,
  
    };

class DoctorCheck extends React.Component<Props & RouteComponentProps, State>    {
    constructor(props: any) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,                   
          orderlist:[],
          ordno:"",
          //pid:"",
         // pname:"",
         // pro:[]
         
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
  
    fetch(CONFIG.API_ENDPOINT+"order_md/showRx/", {
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
             orderlist: res
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
          
          <Header title="医生审核处方单" />     

             <IonList>
           {this.state.orderlist.map((order: any) =>
              <CheckListDoc key={order.ordno}    ordno={order.ordno}  pro={order.pro} image={order.image}></CheckListDoc>)}
              </IonList> 
          

  </>
        )
    }

}
  
export default DoctorCheck
