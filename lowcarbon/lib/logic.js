
/**
 * A emision of co2 has been received for a sensor
 * @param {org.proyecto.lowcarbon.EmisionReading} emisionReading - the EmisionReading transaction
 * @transaction
 */
async function emisionReading(emisionReading) { 
  
  const sensor = emisionReading.sensor;
  console.log('Adding emision CO2 ' + emisionReading.emisionCO2 + ' to sensor ' + sensor.$identifier);
  
  
  if(emisionReading.vehicle.status == 'ON' ){
      
     if(emisionReading.emisionCO2 > emisionReading.contract.maxEmisionCO2){
  		sensor.status = 'REVISION';     
        // emit the event
        const factory = getFactory();
        const namespace = 'org.proyecto.lowcarbon';
        const revisionSensorEvent = factory.newEvent(namespace, 'RevisionSensorEvent');
        revisionSensorEvent.sensorId = sensor.$identifier;
        revisionSensorEvent.vinId = emisionReading.vehicle.$identifier;
        emit(revisionSensorEvent);
  	}
   // add the emision to the sensor
    
    if (sensor.dataSensor) {
        sensor.dataSensor.push(emisionReading); 
    } else {
        sensor.dataSensor = [emisionReading];
    }   
 	 const sensorRegistry = await getAssetRegistry('org.proyecto.lowcarbon.Sensor');
 	 await sensorRegistry.update(sensor);
  }
}