import { useState } from "react";

import minBy from "lodash/minBy";
import parksWithDetailsJSON from "../assets/parksWithDetails.json";

import VehicleEmissionsCalculator from "./FootPrintCar";
import InternetFootPrintCalculator from "./FootPrint";
import { IonItem, IonSelect, IonSelectOption, IonText } from "@ionic/react";

const POPULATION_GMINA_KRAKOW = 806_000;

const EmissionsTabs = () => {
  const [selection, setSelection] = useState("car");
  const [emissions, setEmissions] = useState<number>();

  const emissions2 = emissions && emissions * POPULATION_GMINA_KRAKOW;

  const parkWithSimmilarEmissionsAbsorbtion = emissions2
    ? minBy(parksWithDetailsJSON, (park) => {
        const parkCo2Absorbed = park.details?.co_stocked;
        if (parkCo2Absorbed) {
          return Math.abs(parkCo2Absorbed - emissions2);
        } else {
          return Infinity;
        }
      })
    : undefined;

  const parkCo2Absolbed =
    parkWithSimmilarEmissionsAbsorbtion?.details?.co_stocked;
  const count =
    parkCo2Absolbed && emissions2 ? emissions2 / parkCo2Absolbed : undefined;

  return (
    <>
      <IonItem>
        <IonSelect
          label="Wybierz typ emisji"
          placeholder="Wybierz opcję"
          value={selection}
          onIonChange={(e) => setSelection(e.detail.value)}
        >
          <IonSelectOption value="internet">Internet</IonSelectOption>
          <IonSelectOption value="car">Samochód</IonSelectOption>
        </IonSelect>
      </IonItem>

      {selection === "car" ? (
        <VehicleEmissionsCalculator setEmissions={setEmissions} />
      ) : selection === "internet" ? (
        <InternetFootPrintCalculator setEimssions={setEmissions} />
      ) : null}

      <IonItem>
        <IonText color={"danger"}>
          <p>
            Jesli kazdy mieszkaniec gminy krakow by emitowal podobna ilosc Co2
            jak ty, potrzeba by bylo ok <b>{Math.round(count ?? 1)}</b> parkow
            jak{" "}
            <a
              style={{ color: "inherit" }}
              href={`/tab1?query=${parkWithSimmilarEmissionsAbsorbtion?.name.toLowerCase()}`}
            >
              {parkWithSimmilarEmissionsAbsorbtion?.name}
            </a>{" "}
            zeby to Co2 zostalo pochłonięte przez zieleń miejską
          </p>
        </IonText>
      </IonItem>
    </>
  );
};

export default EmissionsTabs;
