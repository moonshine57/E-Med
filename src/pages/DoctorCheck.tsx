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
    doctorlist: Array<any>,
    dname:string,
    dprove:string
  
    };

class DoctorCheck extends React.Component<Props & RouteComponentProps, State>    {
    constructor(props: any) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,                   
          doctorlist: [{did:123,dname:"gfy",dprove:"asdklfjlasdf"}],
          dname:"",
          dprove:""
         
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
           
            dname:res.dname,
            dprove:res.dprove
          
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
          
          <Header title="医生资格审核" />     
          
    
   

     <IonList>
      <IonItem>
        <IonLabel>Checkbox</IonLabel>
        <IonCheckbox slot="start" ></IonCheckbox >
      </IonItem>
    </IonList>
             <IonList>
           {this.state.doctorlist.map((cart: any) =>
              <CheckListDoc     dtitle={cart.ditle} did={cart.did} dname={cart.dname} dprove={cart.dprove}></CheckListDoc>)}
              </IonList> 
          

  </>
        )
    }

}
  
export default DoctorCheck
