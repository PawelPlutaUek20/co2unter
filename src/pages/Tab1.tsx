import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import ParkCard from "../components/ParkCard";

import parksJson from "../assets/parksWithDetails.json";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

// Function to get query parameters
const getQueryParams = (location: any) => {
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  return query;
};

const Tab1: React.FC = () => {
  const location = useLocation();

  const [_search, setSearch] = useState<string>();

  const queryParams = useMemo(() => getQueryParams(location), [location]);

  const search = useMemo(
    () => _search ?? queryParams ?? "planty",
    [queryParams, _search]
  );

  useEffect(() => {
    setSearch(undefined);
  }, [queryParams]);

  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) {
      setSearch(target.value!.toLowerCase());
    }
  };

  const results = useMemo(() => {
    if (search === "") return parksJson;
    return parksJson.filter((d) => d.name.toLowerCase().indexOf(search) > -1);
  }, [search]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Parki w Krakowie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Parki w krakowie</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar
          value={search}
          debounce={1000}
          onIonInput={(ev) => handleInput(ev)}
        ></IonSearchbar>

        {results.map((park) => {
          return <ParkCard key={park.id} data={park} />;
        })}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
