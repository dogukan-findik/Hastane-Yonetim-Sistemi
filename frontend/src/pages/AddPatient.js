import { useState } from 'react';
import NewPatientForm from '../components/NewPatientForm';

function AddPatient() {
  const [patients, setPatients] = useState([]);

  const handleAddPatient = (patientData) => {
    // Burada API çağrısı yapılacak
    const newPatient = {
      id: patients.length + 1,
      ...patientData,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    
    setPatients([...patients, newPatient]);
    // Gerçek uygulamada burada API'ye kayıt yapılacak
    console.log('Yeni hasta eklendi:', newPatient);
  };

  return <NewPatientForm onSubmit={handleAddPatient} />;
}

export default AddPatient; 