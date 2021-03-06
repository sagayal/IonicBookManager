import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Books from './components/Books';
import { AddBook } from './components/AddBook';
import { About } from './components/About';
import { Villas } from './components/Villas';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu /> 
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Books" />
            </Route>
            <Route path="/Villas" exact={true}>
                <Villas />
            </Route>
            <Route path="/Books" exact={true}>
                <Books />
            </Route>
            <Route path="/AddBook" exact={true}>
                <AddBook />
            </Route>
            <Route path="/book/edit/:recordId" exact={true}>
                <AddBook />
            </Route>
            <Route path="/About" exact={true}>
                <About />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
