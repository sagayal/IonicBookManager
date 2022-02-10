import { IonButtons, 
        IonContent, 
        IonHeader, 
        IonMenuButton, 
        IonPage, 
        IonTitle, 
        IonToolbar,
        IonItem, 
        IonLabel } from '@ionic/react';

import React from 'react';

export const About: React.FC = () => {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>About</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          <IonItem>
            <IonLabel>
                <h3>About Book Manager</h3>
                <br/>
                <br/>
                <p>Book manger has best selling books.</p>
              </IonLabel>
          </IonItem>
          </IonContent>
        </IonPage>
      );
}