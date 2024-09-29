import { FC, useEffect, useState } from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonText,
} from "@ionic/react";

const ConnectionType = {
  Fibre: "światłowód",
  ADSL: "ADSL",
};

const dataTransferRates = {
  [ConnectionType.ADSL]: 15e-8,
  [ConnectionType.Fibre]: 43e-8,
};

const calculateDataUsage = function (
  connectionType: (typeof ConnectionType)[keyof typeof ConnectionType],
  onlineTime: number
) {
  const baseRate = dataTransferRates[connectionType] + 7e-5;
  const additionalDataUsage = 20 * onlineTime;
  return baseRate * additionalDataUsage;
};

type CalculateProps = {
  screensCount: number;
  connectionType: (typeof ConnectionType)[keyof typeof ConnectionType];
  onlineTime: number;
};

const calculateEmissionsFootprint = function (params: CalculateProps) {
  const { screensCount, connectionType, onlineTime } = params;

  const totalTime = onlineTime;
  const timeMultiplier = 0.02 * totalTime;

  const dataUsage = calculateDataUsage(connectionType, onlineTime);

  const weeklyEmissions = 0.08 * (screensCount * timeMultiplier + dataUsage);

  // Assuming the result is annual emissions (52 weeks)
  return weeklyEmissions * 52;
};

const InternetFootPrintCalculator: FC<{
  setEimssions: (emissions: number) => void;
}> = ({ setEimssions }) => {
  const [connectionType, setconnectionType] = useState<
    (typeof ConnectionType)[keyof typeof ConnectionType]
  >(ConnectionType.ADSL);
  const [onlineTime, setonlineTime] = useState<number>(4);
  const [screensCount, setScreensCount] = useState<number>(1);

  const footPrint = calculateEmissionsFootprint({
    connectionType,
    onlineTime,
    screensCount,
  });

  useEffect(() => {
    setEimssions(footPrint);
  }, [footPrint]);

  return (
    <IonList>
      <IonItem>
        <IonText>
          <h2>Ślad węglowy korzystania z internetu</h2>
        </IonText>
      </IonItem>

      <IonList>
        <IonItem>
          <IonLabel>Rodzaj połączenia internetowego</IonLabel>
        </IonItem>
        <IonRadioGroup
          value={connectionType}
          onIonChange={(ev) => setconnectionType(ev.target.value)}
        >
          {Object.entries(ConnectionType).map(([_, connectionType]) => (
            <IonItem>
              <IonRadio key={connectionType} value={connectionType}>
                {connectionType}
              </IonRadio>
            </IonItem>
          ))}
        </IonRadioGroup>
      </IonList>

      <br />

      <IonItem>
        <IonInput
          label="Czas spędzony online"
          helperText="W godzinach tygodniowych na 1 urządzeniu"
          value={onlineTime}
          type="number"
          onIonInput={(ev) => {
            setonlineTime(parseInt(ev.target.value as string, 10));
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Liczba urządzeń"
          value={screensCount}
          type="number"
          onIonInput={(ev) => {
            setScreensCount(parseInt(ev.target.value as string, 10));
          }}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};

export default InternetFootPrintCalculator;
