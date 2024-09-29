import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EcoTips from "../components/EcoTrips";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ulepsz swiat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ulepsz swiat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EcoTips />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
