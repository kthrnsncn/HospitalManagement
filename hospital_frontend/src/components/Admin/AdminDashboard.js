import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminDashboard = ({ currentUser, users, setUsers }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout action here (e.g., clear session, reset authentication state)
        navigate('/');
    };

    React.useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column mt-5">
                            <li className="nav-item">
                                <Link to="users" className="nav-link">User Management</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="doctors" className="nav-link">Doctor Management</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="patients" className="nav-link">Patient Management</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="appointments" className="nav-link">Appointment Management</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="records" className="nav-link">Medical Records Management</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <h2 className="navbar-brand">Admin Dashboard</h2>
                        <div className="collapse navbar-collapse d-flex justify-content-end">
                            <ul className="navbar-nav">
                                <li className="nav-item pe-3">
                                    <span className="navbar-text mr-3">Welcome, {currentUser.name}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Outlet context={{ users, setUsers }} />
            </main>

            </div>
        </div>
    );
};

export default AdminDashboard;
