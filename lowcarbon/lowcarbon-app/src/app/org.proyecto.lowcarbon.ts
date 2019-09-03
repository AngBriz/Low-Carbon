import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.proyecto.lowcarbon{
   export enum VehicleStatus {
      ON,
      OFF,
   }
   export enum SensorStatus {
      ON,
      REVISION,
      OFF,
   }
   export abstract class Company extends Participant {
      companyId: string;
      name: string;
   }
   export class VehicleCompany extends Company {
      numberVehicles: number;
   }
   export class SensorCertifier extends Company {
   }
   export class Government extends Company {
   }
   export class Contractor extends Company {
   }
   export class Sensor extends Asset {
      sensorId: string;
      vehicleId: string;
      certificadoId: string;
      companyId: string;
      contractId: string;
      dataSensor: EmisionReading[];
      status: SensorStatus;
   }
   export class CertificateSensor extends Asset {
      certificateId: string;
      timeExpedition: string;
      timeRevision: string;
      companyId: string;
   }
   export class Vehicle extends Asset {
      vinId: string;
      sensor1Id: string;
      sensor2Id: string;
      sensor3Id: string;
      companyId: string;
      status: VehicleStatus;
   }
   export class Contract extends Asset {
      contractId: string;
      maxEmisionCO2: number;
   }
   export class EmisionReading extends Transaction {
      sensor: Sensor;
      vehicle: Vehicle;
      emisionCO2: number;
      contract: Contract;
   }
   export class RevisionSensorEvent extends Event {
      sensorId: string;
      vinId: string;
   }
// }
