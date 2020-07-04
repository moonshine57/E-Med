import React from 'react';
import { IonPage,IonSearchbar,IonToast,IonIcon,IonButton, IonContent,  IonSegment, IonSegmentButton, IonLabel,  IonList} from '@ionic/react'
import ArticleCard from '../components/ArticleCard';
import { TagCloud } from '../components/TagCloud';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import {search} from 'ionicons/icons';
import HotProdCard from '../components/HotProdCard';
type Props = { props:any };
type State = { segment: string, searchWord: string, SP:boolean,SS:boolean, products: Array<any>,suppliers:Array<any>,toastState: boolean,toastMessage:string};

class HomePage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {               
      segment: "Global",
      searchWord:"",//检索词
      SP:false,//判断是否完成商品检索
      SS:false,//判断是否完成商家检索
      products: [],
      suppliers:[],
      toastState: false,
      toastMessage: 'Message',
    };    
  }  
 //点击Tag
  handleTagClick = (tag: any) =>{ 
   
    fetch(CONFIG.API_ENDPOINT+"pro_up/search/?search="+tag)
    .then(res => res.json())
    .then(
      (res) => {
        this.setState({          
            products: res,     
            SP:true
        });
      },

      (err) => {
        console.error(err);
      }
    )
  }
 
  SearchTextChange = (e: any) => {
    this.setState({
      searchWord:e.detail.value
      });
    console.log(e.detail.value);
    }
 
    searchPro = (e: any) => {
    let url = CONFIG.API_ENDPOINT+"pro_up/search/?search="+this.state.searchWord;
     fetch(url, {
        method: 'GET'
      })
     .then((res)=> {
          console.log(url);
          console.log(this.state.searchWord);
          console.log(res.status);
          if(res.status == 200){
            return res.json();
          } else 
            { 
              if(res.status == 404) {throw new Error("不存在该商品");
                                    console.log("hellwold");}
              else{throw new Error("检索出现错误")}
             }
     })                
     .then(
        (result) => {
          this.setState({           
            products: result,
            SP: true,
            searchWord:''
          });
         console.log(this.state.products);
        },
        (error) => {
           console.log(error);           
           this.setState({toastMessage: error.toString(), toastState: true});
        }
     )
     }
    searchSup = (e: any) => {
    let url = CONFIG.API_ENDPOINT+"sup_med/search/?search="+this.state.searchWord;
     fetch(url, {
        method: 'GET'
      })
     .then((res)=> {
          console.log(url);
          console.log(this.state.searchWord);
          console.log(res.status);
          if(res.status == 200){
            return res.json();
          } else 
            { 
              if(res.status == 404) {throw new Error("不存在该商家");
                                    console.log("hellwold");}
              else{throw new Error("检索出现错误")}
             }
     })                
     .then(
        (result) => {
          this.setState({           
            suppliers: result,
            SS: true,
            searchWord:''
          });
         console.log(this.state.suppliers);
        },
        (error) => {
           console.log(error);           
           this.setState({toastMessage: error.toString(), toastState: true});
        }
     )
     }

  render() {      
      return (
        <>   
        <Header title="Home"></Header>
        <IonContent> 
        <IonSearchbar onIonChange={this.SearchTextChange} placeholder="请输入您想要购买的商品/商家" color="success"></IonSearchbar>
          <IonButton size="small" onClick={this.searchSup} fill="outline" color="success">
           搜索商家
           <IonIcon slot="end" icon={search} />
          </IonButton>
          <IonButton size="small" onClick={this.searchPro} fill="outline" color="success">
           搜索商品
         <IonIcon slot="end" icon={search} />
         </IonButton>
       <IonToast
        isOpen={this.state.toastState}
        onDidDismiss={() => this.setState(() => ({ toastState: false }))}
        message= {this.state.toastMessage}
        duration={400}
      />
          <IonSegment color="success">
              <IonSegmentButton value="Global" color="success" >
                  <IonLabel>检索结果</IonLabel>
              </IonSegmentButton>
          </IonSegment>
          <IonSegment color="success">
              <IonSegmentButton value="Global" color="success" >
                  <IonLabel>热销商品</IonLabel>
              </IonSegmentButton>
          </IonSegment>
        <HotProdCard></HotProdCard>
        <HotProdCard></HotProdCard>
        <IonList>
        </IonList>
        <TagCloud onTagClick={(e: any) => this.handleTagClick(e)} ></TagCloud>   
        </IonContent>
      </>
      );
    }
  
}

export default HomePage
