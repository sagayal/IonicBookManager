import { IonButtons, 
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonItem, 
    IonButton,
    IonLabel, 
    IonIcon,
    IonRefresher,
    IonRefresherContent} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { location } from 'ionicons/icons';

import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { getVillas } from '../service/VillaAPI';


export const Villas: React.FC = () => {

const history = useHistory();
const [villasList, setVillas] = useState([]);

const loadVillas = async () =>{
    console.log(">> Loading villas")
    let tempData = await getVillas();
    setVillas(tempData);
    console.log("tempData:",tempData);
  }

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log('Begin async operation');
    loadVillas().then(() => {
        event.detail.complete();
        console.log('Complete async operation');
    })
  }

  React.useEffect(() => {
    let unlisten = history.listen((location, action) => {
        loadVillas();
      });
      loadVillas();
      return(unlisten);
  }, []);

return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Villas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonList>
      {villasList.map((data:any)=>{
            return(
                <IonCard key={data.id}>
                    <img src={data.image} />
                    <IonCardContent>
                    <IonLabel>{data.title}</IonLabel>
                    <br/>
                    <IonLabel>{data.price}</IonLabel>
                    </IonCardContent>
                    <IonItem>
                        <IonIcon icon={location} />
                        <IonLabel>{data.Location}</IonLabel>
                        <IonButton shape="round" slot="end">More</IonButton>
                        <IonButton shape="round" slot="end">Book Villa</IonButton>
                    </IonItem>
               </IonCard>
            )
          })}
      </IonList> 
      </IonContent>
    </IonPage>
  );
}