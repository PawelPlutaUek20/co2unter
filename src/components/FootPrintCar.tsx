import { FC, useEffect, useState } from "react";
import {
  IonInput,
  IonItem,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from "@ionic/react";

const TripFrequency = {
  OneWay: "raz w roku",
  TwoWay: "dwa razy w roku",
  Frequently: "wiele razy w roku",
};

const FuelType = {
  Petrol: "benzyna",
  Diesel: "diesel",
  GPL: "gaz LPG",
  GNV: "gaz ziemny",
  E85: "E85",
};

const VehicleSize = {
  Small: "mały samochód",
  Medium: "średni samochód",
  Big: "duży samochód",
  Van: "van",
  Truck: "ciężarówka",
};

const VehicleType = {
  Classic: "spalinowy",
  Hybrid: "hybryda",
  Electric: "elektryczny",
};

const vehicleSizeFactor = {
  [VehicleSize.Small]: 1,
  [VehicleSize.Medium]: 1.2,
  [VehicleSize.Big]: 1.4,
  [VehicleSize.Van]: 1.8,
  [VehicleSize.Truck]: 3.6,
};

const emissionFactors = {
  [VehicleType.Classic]: {
    [FuelType.Petrol]: 0.24,
    [FuelType.Diesel]: 0.224,
    [FuelType.GPL]: 0.008,
    [FuelType.GNV]: 0.004,
    [FuelType.E85]: 0.016,
  },
  [VehicleType.Hybrid]: {
    [FuelType.Petrol]: 0.112,
    [FuelType.Diesel]: 0.12,
    [FuelType.GPL]: 0.008,
    [FuelType.GNV]: 0.004,
    [FuelType.E85]: 0.016,
  },
};

const getEmissionFactor = function (
  vehicleType: any,
  fuelType: any,
  vehicleSize: any
) {
  return vehicleType === VehicleType.Electric
    ? 0.06
    : emissionFactors[vehicleType][fuelType] * vehicleSizeFactor[vehicleSize];
};

const calculateEmissions = function ({
  tripFrequency,
  tripNb,
  distance,
  vehicleType,
  fuelType,
  vehicleSize,
}: any) {
  const getTripMultiplier = function (frequency: any, number: any) {
    switch (frequency) {
      case TripFrequency.OneWay:
        return 1;
      case TripFrequency.TwoWay:
        return 2;
      case TripFrequency.Frequently:
        return number;
    }
  };

  const totalDistance =
    getTripMultiplier(tripFrequency, tripNb) * parseInt(distance);

  return {
    distance: totalDistance,
    co2: totalDistance * getEmissionFactor(vehicleType, fuelType, vehicleSize),
  };
};

const VehicleEmissionsCalculator: FC<{
  setEmissions: (emissions: number) => void;
}> = ({ setEmissions }) => {
  const [tripFrequency, setTripFrequency] = useState(TripFrequency.OneWay);
  const [tripNb, setTripNb] = useState(1);
  const [distance, setDistance] = useState(1);
  const [vehicleType, setVehicleType] = useState(VehicleType.Classic);
  const [fuelType, setFuelType] = useState(FuelType.Petrol);
  const [vehicleSize, setVehicleSize] = useState(VehicleSize.Medium);

  const emissions = calculateEmissions({
    tripFrequency,
    tripNb,
    distance,
    vehicleType,
    fuelType,
    vehicleSize,
  });

  useEffect(() => {
    setEmissions(emissions.co2);
  }, [emissions]);

  return (
    <IonList>
      <IonItem>
        <IonText>
          <h2>Kalkulator emisji pojazdu</h2>
        </IonText>
      </IonItem>

      <IonList>
        <IonItem>
          <IonLabel>Częstotliwość podróży</IonLabel>
        </IonItem>
        <IonRadioGroup
          value={tripFrequency}
          onIonChange={(ev) => setTripFrequency(ev.detail.value)}
        >
          {Object.entries(TripFrequency).map(([_, value]) => (
            <IonItem key={value}>
              <IonRadio value={value}>{value}</IonRadio>
            </IonItem>
          ))}
        </IonRadioGroup>
      </IonList>

      {tripFrequency === TripFrequency.Frequently && (
        <IonItem>
          <IonInput
            label="Liczba podróży"
            helperText="rocznych"
            value={tripNb}
            type="number"
            onIonInput={(ev) => setTripNb(parseInt(ev.detail.value!, 10))}
          />
        </IonItem>
      )}

      <br />

      <IonItem>
        <IonInput
          label="Odległość"
          helperText="km"
          value={distance}
          type="number"
          onIonInput={(ev) => setDistance(parseInt(ev.detail.value!, 10))}
        />
      </IonItem>

      <br />

      <IonItem>
        <IonSelect
          label="Typ pojazdu"
          value={vehicleType}
          onIonChange={(ev) => setVehicleType(ev.detail.value)}
        >
          {Object.entries(VehicleType).map(([_, value]) => (
            <IonSelectOption key={value} value={value}>
              {value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      {vehicleType !== VehicleType.Electric && (
        <IonItem>
          <IonSelect
            label="Typ paliwa"
            value={fuelType}
            onIonChange={(ev) => setFuelType(ev.detail.value)}
          >
            {Object.entries(FuelType).map(([_, value]) => (
              <IonSelectOption key={value} value={value}>
                {value}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      )}

      <IonItem>
        <IonSelect
          label="Rozmiar pojazdu"
          value={vehicleSize}
          onIonChange={(ev) => setVehicleSize(ev.detail.value)}
        >
          {Object.entries(VehicleSize).map(([_, value]) => (
            <IonSelectOption key={value} value={value}>
              {value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default VehicleEmissionsCalculator;
