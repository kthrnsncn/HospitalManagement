import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

const PatientManagement = () => {
    const [patients, setPatients] = useState([]);
    const [editingPatient, setEditingPatient] = useState(null);
    const [newPatient, setNewPatient] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        emergency_contact: '',
        medical_history: ''
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleEditPatient = (patient) => {
        // Clone the patient object to avoid directly mutating state
        const editedPatient = { ...patient };
        setEditingPatient(editedPatient);
        setNewPatient(editedPatient);
    };

    const handleUpdatePatient = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/patients/${editingPatient.id}`, newPatient);
            setEditingPatient(null); // Clear editing state
            fetchPatients(); // Refresh patient list
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    return (
        <div>
            <h3>Patient Management</h3>

            {editingPatient && (
                <div className="modal" style={modalStyle}>
                    <div className="modal-content">
                        <h4>Edit Patient</h4>
                        {/* Input fields for editing patient */}
                        <div className="mb-3">
                            <label htmlFor="editFirstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editFirstName"
                                name="first_name"
                                value={newPatient.first_name}
                                onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editLastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editLastName"
                                name="last_name"
                                value={newPatient.last_name}
                                onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                            />
                        </div>
                        {/* Add other fields for editing */}
                        <button className="btn btn-primary" onClick={handleUpdatePatient}>Update Patient</button>
                    </div>
                </div>
            )}

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Emergency Contact</th>
                            <th>Medical History</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.first_name} {patient.last_name}</td>
                                <td>{patient.date_of_birth}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.address}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.email}</td>
                                <td>{patient.emergency_contact}</td>
                                <td>{patient.medical_history}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditPatient(patient)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const modalStyle = {
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '50px'
};

export default PatientManagement;
