import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fetch all return requests
    useEffect(() => {
        console.log("Fetching returns from:", "http://localhost:3004/api/admin/returns");
        fetch("http://localhost:3004/api/admin/returns")
            .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Received data:", data);
                setOrders(data);
            })
            .catch(error => {
                console.error("Error fetching returns:", error);
                setError(error.message);
            });
    }, []);

    // Handle Refund Status Change
    const handleStatusChange = (orderId, newStatus) => {
        console.log("Updating status for order:", orderId, "to:", newStatus);
        fetch("http://localhost:3004/api/admin/update-refund-status", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                orderId: orderId,  // This will be matched with order_id in backend
                newStatus: newStatus 
            })
        })
        .then(response => {
            console.log("Update response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Update response data:", data);
            alert(data.message);
            setOrders(prevOrders => prevOrders.map(order =>
                order.order_id === orderId ? { ...order, refund_status: newStatus } : order
            ));
        })
        .catch(error => {
            console.error("Error updating status:", error);
            alert("Error updating status: " + error.message);
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#FFA500';
            case 'Processing':
                return '#007BFF';
            case 'Completed':
                return '#28A745';
            default:
                return '#6C757D';
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f0f2f5',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        }}>
            <div style={{
                width: '95%',
                maxWidth: '1400px',
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                padding: '2rem',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #eee',
                    paddingBottom: '1rem'
                }}>
                    <div>
                        <h2 style={{
                            margin: 0,
                            color: '#1a1a1a',
                            fontSize: '2rem',
                            fontWeight: '600'
                        }}>Admin Panel</h2>
                        <p style={{
                            margin: '0.5rem 0 0',
                            color: '#666',
                            fontSize: '1rem'
                        }}>Manage Refund Requests</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            color: '#495057',
                            fontWeight: '500'
                        }}>
                            Total Requests: {orders.length}
                        </div>
                        <div style={{
                            backgroundColor: '#e3f2fd',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            color: '#1976d2',
                            fontWeight: '500'
                        }}>
                            Active: {orders.filter(order => order.refund_status === 'Processing').length}
                        </div>
                    </div>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fff3f3',
                        color: '#dc3545',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        Error: {error}
                    </div>
                )}

                <div style={{
                    overflowX: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    width: '100%'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        tableLayout: 'fixed'
                    }}>
                        <thead>
                            <tr style={{
                                backgroundColor: '#f8f9fa',
                                borderBottom: '2px solid #dee2e6'
                            }}>
                                <th style={{
                                    padding: '1rem',
                                    textAlign: 'left',
                                    color: '#495057',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    width: '20%'
                                }}>Order ID</th>
                                <th style={{
                                    padding: '1rem',
                                    textAlign: 'left',
                                    color: '#495057',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    width: '30%'
                                }}>Email</th>
                                <th style={{
                                    padding: '1rem',
                                    textAlign: 'left',
                                    color: '#495057',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    width: '25%'
                                }}>Refund Status</th>
                                <th style={{
                                    padding: '1rem',
                                    textAlign: 'left',
                                    color: '#495057',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    width: '25%'
                                }}>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{
                                        padding: '2rem',
                                        textAlign: 'center',
                                        color: '#6c757d'
                                    }}>
                                        No refund requests found
                                    </td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.order_id} style={{
                                        borderBottom: '1px solid #dee2e6',
                                        transition: 'background-color 0.2s',
                                        ':hover': {
                                            backgroundColor: '#f8f9fa'
                                        }
                                    }}>
                                        <td style={{
                                            padding: '1rem',
                                            color: '#212529',
                                            fontWeight: '500',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>{order.order_id}</td>
                                        <td style={{
                                            padding: '1rem',
                                            color: '#212529',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>{order.email}</td>
                                        <td style={{
                                            padding: '1rem'
                                        }}>
                                            <span style={{
                                                backgroundColor: getStatusColor(order.refund_status),
                                                color: 'white',
                                                padding: '0.35rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                display: 'inline-block'
                                            }}>
                                                {order.refund_status}
                                            </span>
                                        </td>
                                        <td style={{
                                            padding: '1rem'
                                        }}>
                                            <select 
                                                value={order.refund_status} 
                                                onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid #dee2e6',
                                                    backgroundColor: 'white',
                                                    cursor: 'pointer',
                                                    outline: 'none',
                                                    transition: 'all 0.2s',
                                                    width: '200px',
                                                    fontSize: '0.875rem',
                                                    color: '#495057',
                                                    ':focus': {
                                                        borderColor: '#1976d2',
                                                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)'
                                                    }
                                                }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 