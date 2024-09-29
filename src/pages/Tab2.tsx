import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import EmissionsTabs from "../components/EmissionsTabs";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Uzycie Co2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Uzycie Co2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EmissionsTabs />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
