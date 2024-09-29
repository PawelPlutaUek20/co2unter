import { useState } from "react";

import minBy from "lodash/minBy";
import parksWithDetailsJSON from "../assets/parksWithDetails.json";
import seedlingSvg from "../assets/seedling.svg";
import growthSvg from "../assets/growth.svg";
import treeSvg from "../assets/tree.svg";

import VehicleEmissionsCalculator from "./FootPrintCar";
import InternetFootPrintCalculator from "./FootPrint";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";

const POPULATION_GMINA_KRAKOW = 806_000;
const YEARLY_SEEDLING_CO_STOCKED = 0.01;
const YEARLY_TREE_CO_STOCKED = 20;
const YEARLY_OLD_TREE_CO_STOCKED = 100;

function formatPolishNumber(number: number): string {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    const thousands = Math.floor(number / 1000);
    return `${thousands} tys.`;
  } else {
    const millions = Math.floor(number / 1000000);
    return `${millions} mil.`;
  }
}

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
              href={`/#/tab1?query=${parkWithSimmilarEmissionsAbsorbtion?.name.toLowerCase()}`}
            >
              {parkWithSimmilarEmissionsAbsorbtion?.name}
            </a>{" "}
            zeby to Co2 zostalo pochłonięte przez zieleń miejską
          </p>
        </IonText>
      </IonItem>

      <IonItem>
        <IonText>
          <p>
            W przeliczeniu na pochłanianie przez rośliny (w zaleznosci od
            wielkosci) byloby to:
          </p>
        </IonText>
      </IonItem>

      {emissions2 && (
        <IonItem>
          <IonGrid>
            <IonRow style={{ textAlign: "center" }}>
              <IonCol>
                <IonIcon icon={seedlingSvg} size="large" />
                <div>
                  {formatPolishNumber(
                    Math.round(emissions2 / YEARLY_SEEDLING_CO_STOCKED)
                  )}{" "}
                  Małych sadzonek
                </div>
              </IonCol>
              <IonCol>
                <IonIcon icon={growthSvg} size="large" />
                <div>
                  {formatPolishNumber(
                    Math.round(emissions2 / YEARLY_TREE_CO_STOCKED)
                  )}{" "}
                  srednich drzew
                </div>
              </IonCol>
              <IonCol>
                <IonIcon icon={treeSvg} size="large" />
                <div>
                  {formatPolishNumber(
                    Math.round(emissions2 / YEARLY_OLD_TREE_CO_STOCKED)
                  )}{" "}
                  stu-letnich drzew
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      )}
    </>
  );
};

export default EmissionsTabs;
