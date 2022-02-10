import { IonButtons, 
        IonContent, 
        IonHeader, 
        IonMenuButton, 
        IonPage, 
        IonTitle, 
        IonToolbar , 
        IonList, 
        IonItem, 
        IonLabel, 
        IonThumbnail,
        IonIcon,
        IonFabButton,
        IonFab, 
        IonSearchbar,  
        IonRefresher, 
        IonRefresherContent, 
        IonSpinner  } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { add, pencil, trash } from 'ionicons/icons';
import { useState } from 'react';
import { getBooks, deleteBook } from '../service/BooksAPI';
import React from 'react';
import { useHistory } from 'react-router';
import { loadingController } from '@ionic/core';


const Books: React.FC = () => {
    const history = useHistory();
    const [bookList,setBooks] = useState([]);

    const showLoader = () => {
        loadingController.create({
            message: 'Loading...'
        }).then((response) => {
            response.present();
        })
    }

    const dismissLoader = () => {
        loadingController.dismiss().then((response) => {
            console.log('Loader closed!', response);
        }).catch((err) => {
            console.log('Error occured : ', err);
        });
    }

    const loadBooks = async () =>{
      console.log(">> Loading books")
      showLoader();
      let tempData = await getBooks();
      setBooks(tempData);
      console.log("tempData:",tempData);
      dismissLoader();
    }

    const refreshBooks = async () =>{
        console.log(">> Loading books")
        let tempData = await getBooks();
        setBooks(tempData);
        console.log("tempData:",tempData);
      }
    
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        console.log('Begin async operation');
        refreshBooks().then(() => {
            event.detail.complete();
            console.log('Complete async operation');
        })
      }

    const doDelete = async (id:any)=>{
        await deleteBook(id);
        loadBooks();
      }
    
    React.useEffect(() => {
      let unlisten = history.listen((location, action) => {
          loadBooks();
        });
        loadBooks();
        return(unlisten);
    }, []);
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Books</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonSearchbar onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus"></IonSearchbar>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
         <IonList>
          {bookList.map((data:any)=>{
            return(
              <IonItem key={data.id}>
              <IonThumbnail slot="start">
                <img src={data.cover} />
              </IonThumbnail>
              <IonLabel>
                <h2>{data.title}</h2>
                <p>{data.author}</p>
                <h3>{data.publisher}</h3>
                <h3>ISBN: {data.isbn}</h3>
                <p>{data.year}</p>
              </IonLabel>
                <IonIcon size={'10'} onClick={()=>{history.push('/book/edit/'+data.id)}} icon={pencil} />
                <IonIcon size={'10'} onClick={()=>{doDelete(data.id)}} icon={trash} /> 
            </IonItem>
            )
          })}
          </IonList>    
            <IonFab vertical="bottom" horizontal="end"slot="fixed">   
            <a href="/AddBook" >
            <IonFabButton>
                <IonIcon icon={add}/>
              </IonFabButton>
              </a>
            </IonFab>
        </IonContent>
      </IonPage>
    );
};

export default Books;
function setSearchText(arg0: string): void {
  throw new Error('Function not implemented.');
}