import React from 'react';
import { IonPage, IonContent, IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonToast, IonList } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';

type Props = { props: any };
type State = { comment: string };

class CommentPage extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            comment: '',
        };

    }

    updateComment = (event: any) => {
        this.setState({ comment: event.detail.value });

    }

    addComment = () => {
        let url = CONFIG.API_ENDPOINT+"articles/";
        let commentsUrl = url + '/comments';
        let body = {
          "comment": {
            "body": this.state.comment
          }
        }
        fetch(commentsUrl, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json", 
              "Authorization": "Token " + localStorage.getItem("token")
          },
          body: JSON.stringify(body)
    
      }).then(res => res.json())
    
      }

    render() {
        return (
            <IonPage>
                <IonContent>
                    <Header title="评价"> </Header>
                    
                        <div>
                            <div className="border-green">
                                <IonTextarea onIonChange={this.updateComment} placeholder="添加评论" value={this.state.comment}>
                                </IonTextarea>
                            </div>
                            <IonButton color="success" onClick={this.addComment}>添加评论</IonButton>
                        </div> 
                </IonContent>
            </IonPage>

        )
    }
}

export default CommentPage