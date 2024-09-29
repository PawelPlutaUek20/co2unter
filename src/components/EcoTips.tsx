import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { busOutline, bicycleOutline, peopleOutline, bulbOutline, leafOutline, businessOutline, carOutline, cashOutline, happyOutline, earthOutline } from 'ionicons/icons';
import co2EmissionsBySecotrSvg from "../assets/co-emissions-by-sector.svg"

const EcoTips: React.FC = () => {
  return (
    <IonCard>
      {/* Section for users */}
      <IonCardHeader>
        <IonCardTitle>Jak zmniejszyć swoje zużycie CO₂</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <p>Zmniejszenie śladu węglowego może być proste i satysfakcjonujące. Oto kilka kroków, które możesz podjąć, aby zmniejszyć swoje zużycie CO₂:</p>
              <IonList>
                <IonItem>
                  <IonIcon icon={busOutline} slot="start" />
                  <IonLabel><strong>Korzystaj z transportu publicznego</strong>: Autobusy, tramwaje i pociągi są bardziej ekologiczne niż jazda samochodem.</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={bicycleOutline} slot="start" />
                  <IonLabel><strong>Jeździj rowerem lub chodź pieszo</strong>: Na krótkich dystansach wybierz spacer lub jazdę na rowerze.</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={peopleOutline} slot="start" />
                  <IonLabel><strong>Korzystaj z carpoolingu</strong>: Dziel się przejazdem z przyjaciółmi lub współpracownikami.</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={bulbOutline} slot="start" />
                  <IonLabel><strong>Oszczędzaj energię</strong>: Wyłączaj światła i urządzenia, gdy ich nie używasz.</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={leafOutline} slot="start" />
                  <IonLabel><strong>Wspieraj produkty zrównoważone</strong>: Kupuj od firm dbających o zmniejszanie swojego wpływu na środowisko.</IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>

      {/* Section for companies */}
      <IonCardHeader>
        <IonCardTitle>Dla Firm: Jak zmniejszyć zużycie CO₂ poprzez carpooling</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <p>Firmy z Krakowa mogą odegrać kluczową rolę w redukcji emisji CO₂, promując zrównoważone rozwiązania transportowe. Zachęcaj pracowników do korzystania z <strong>Poola.app</strong>, lokalnej aplikacji do carpoolingu.</p>
              <IonList>
                <IonItem>
                  <IonIcon icon={earthOutline} slot="start" />
                  <IonLabel><strong>Zmniejsz ślad węglowy</strong>: Ogranicz liczbę indywidualnych podróży samochodami, by obniżyć emisję CO₂.</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={carOutline} slot="start" />
                  <IonLabel><strong>Oszczędność kosztów</strong>: Pracownicy oszczędzają na paliwie i parkingu, co może zmniejszyć zapotrzebowanie na miejsca parkingowe.</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={happyOutline} slot="start" />
                  <IonLabel><strong>Poprawa zadowolenia pracowników</strong>: Carpooling sprzyja nawiązywaniu relacji między pracownikami i redukuje stres.</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={businessOutline} slot="start" />
                  <IonLabel><strong>Odpowiedzialność korporacyjna</strong>: Promowanie carpoolingu wzmacnia wizerunek firmy jako odpowiedzialnej społecznie.</IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>

      <IonCardContent>
        <img src={co2EmissionsBySecotrSvg} />
      </IonCardContent>
    </IonCard>
  );
};

export default EcoTips;