import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
  const [role, setRole] = useState('patient');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigate = useNavigate();

  const handleRegistration = () => {
    const name = `${firstName} ${lastName}`;
    const userData = { name, email, password, role };

    fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          alert('Error during login: ' + JSON.stringify(data.errors));
        } else {
          if (role === 'patient') {
            registerPatient();
          } else if (role === 'doctor') {
            registerDoctor();
          }
        }
      })
      .catch(error => console.error('Error during login:', error));
  };

  const registerPatient = () => {
    const patientData = {
      first_name: firstName, last_name: lastName, date_of_birth: dateOfBirth,
      gender, address, phone, email, emergency_contact: emergencyContact,
      medical_history: medicalHistory,
    };

    fetch('http://127.0.0.1:8000/api/addPatients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          alert('Error registering patient: ' + JSON.stringify(data.errors));
        } else {
          alert('Patient account created successfully! Please log in.');
          navigate('/');
        }
      })
      .catch(error => console.error('Error registering patient:', error));
  };

  const registerDoctor = () => {
    const doctorData = {
      first_name: firstName, last_name: lastName, specialization, license_number: licenseNumber,
      phone, email,
    };

    fetch('http://127.0.0.1:8000/api/addDoctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          alert('Error registering doctor: ' + JSON.stringify(data.errors));
        } else {
          alert('Doctor account created successfully! Please log in.');
          navigate('/');
        }
      })
      .catch(error => console.error('Error registering doctor:', error));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Hospital Registration</h2>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select id="role" className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>

              {role === 'patient' && (
                <>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date" className="form-control" id="dateOfBirth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input type="text" className="form-control" id="gender" placeholder="Enter Gender" value={gender} onChange={e => setGender(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter Address" value={address} onChange={e => setAddress(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="emergencyContact">Emergency Contact</label>
                    <input type="text" className="form-control" id="emergencyContact" placeholder="Enter Emergency Contact" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="medicalHistory">Medical History</label>
                    <input type="text" className="form-control" id="medicalHistory" placeholder="Enter Medical History" value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} />
                  </div>
                </>
              )}

              {role === 'doctor' && (
                <>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialization">Specialization</label>
                    <input type="text" className="form-control" id="specialization" placeholder="Enter Specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="licenseNumber">License Number</label>
                    <input type="text" className="form-control" id="licenseNumber" placeholder="Enter License Number" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleRegistration}>Register</button>
              </div>

              <p className="mt-3 text-center">Already have an account? <a href="/">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
