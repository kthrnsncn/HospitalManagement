import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DoctorManagement = ({ currentUser }) => {
    const [doctor, setDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        id: '',
        first_name: '',
        last_name: '',
        specialization: '',
        license_number: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        // Fetch doctor data based on current user's email
        axios.get(`http://127.0.0.1:8000/api/doctorsEmail/${currentUser.email}`)
            .then(response => {
                const doctorData = response.data;
                setDoctor(doctorData);
                setNewDoctor(doctorData); // Initialize newDoctor state with fetched data
            })
            .catch(error => console.log(error));
    }, [currentUser.email]);

    const handleUpdate = () => {
        // Update doctor profile
        axios.put(`http://127.0.0.1:8000/api/doctors/${doctor.id}`, newDoctor)
            .then(response => {
                console.log("Doctor profile updated successfully:", response.data);
                setDoctor(prevDoctor => ({ ...prevDoctor, ...newDoctor })); // Update displayed doctor data
                setShowModal(false); // Close the modal after successful update
            })
            .catch(error => console.log(error));
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor(prevDoctor => ({
            ...prevDoctor,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h3 className="mt-4">Doctor Profile</h3>
            {doctor && (
                <div className="mt-3">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td>
                                    {showModal ? (
                                        <>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="first_name"
                                                value={newDoctor.first_name}
                                                onChange={handleChange}
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="last_name"
                                                value={newDoctor.last_name}
                                                onChange={handleChange}
                                                placeholder="Last Name"
                                            />
                                        </>
                                    ) : (
                                        `${doctor.first_name} ${doctor.last_name}`
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Specialization:</strong></td>
                                <td>
                                    {showModal ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="specialization"
                                            value={newDoctor.specialization}
                                            onChange={handleChange}
                                            placeholder="Specialization"
                                        />
                                    ) : (
                                        doctor.specialization
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>License Number:</strong></td>
                                <td>
                                    {showModal ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="license_number"
                                            value={newDoctor.license_number}
                                            onChange={handleChange}
                                            placeholder="License Number"
                                        />
                                    ) : (
                                        doctor.license_number
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Phone:</strong></td>
                                <td>
                                    {showModal ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={newDoctor.phone}
                                            onChange={handleChange}
                                            placeholder="Phone"
                                        />
                                    ) : (
                                        doctor.phone
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>
                                    {showModal ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={newDoctor.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />
                                    ) : (
                                        doctor.email
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {showModal ? (
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                            <button className="btn btn-outline-secondary mt-2" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Edit Profile</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;
