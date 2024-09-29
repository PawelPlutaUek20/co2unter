import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { leafOutline, cloudOutline } from "ionicons/icons";

type ParkDataI = {
  id: number;
  name: string;
  class: string | null;
  desc: string | null;
  id_photo: number | null;
  details?: {
    id_district: number;
    co_absorbed: number | null;
    co_stocked: number | null;
    pm_removed: number | null;
    energy_saved: number | null;
    avoided_runoff: number | null;
    economic_value: number | null;
    number_of_plants: number;
    number_of_plants_studied: number | null;
  };
};

const formatCo2 = (co2: number | null) => {
  if (co2 === null) {
    return "N/A";
  }

  if (co2 > 1000) {
    return `${Math.round(co2 / 1000)}t CO₂`;
  }

  return `${Math.round(co2)}kg CO₂`;
};

const ParkCard: React.FC<{ data: ParkDataI }> = ({ data }) => {
  const photoUrl = data.id_photo
    ? `https://krakow.lifeurbangreen.eu/api/krakow/photo/district/${data.id_photo}`
    : "https://krakow.lifeurbangreen.eu/images/placeholder.jpg";

  return (
    <IonCard>
      <img alt={data.name} src={photoUrl} />
      <IonCardHeader>
        <IonCardTitle>{data.name}</IonCardTitle>
        <IonCardSubtitle>{data.class}</IonCardSubtitle>
      </IonCardHeader>

      {/* Additional Environmental Data */}
      {data.details && (
        <IonCardContent style={{ paddingBottom: 0 }}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonIcon icon={leafOutline} size="large" />
                <div>{data.details.number_of_plants}</div>
                <div>Drzewa w okolicy</div>
              </IonCol>

              <IonCol>
                <IonIcon icon={cloudOutline} size="large" />
                <div>{formatCo2(data.details.co_stocked)}</div>
                <div>
                  Pochłonięte CO₂
                  <br />
                  <em>rocznie</em>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      )}

      <IonCardContent>{data.desc}</IonCardContent>
    </IonCard>
  );
};
export default ParkCard;
