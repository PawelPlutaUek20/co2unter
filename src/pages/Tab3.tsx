import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EcoTips from "../components/EcoTips";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dbaj o nasze miasto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dbaj o nasze miasto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EcoTips />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
