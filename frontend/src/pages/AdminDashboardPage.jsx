import React, { useState, useMemo } from 'react'; // <-- 1. Import useState and useMemo
import { 
  Container, 
  Row, 
  Col, 
  Table, 
  Spinner, 
  Alert, 
  Button, 
  ButtonGroup // <-- 2. Import ButtonGroup
} from 'react-bootstrap';

import { 
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation 
} from '../api/bookingApiSlice';

const AdminDashboardPage = () => {
  // --- 3. Add state for the filter ---
  const [filter, setFilter] = useState('All'); // 'All', 'Pending', 'Confirmed'

  // --- Hooks for fetching and mutating data (no change) ---
  const { data: bookings, isLoading, isError, error } = useGetBookingsQuery();
  const [updateBookingStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();

  // --- 4. Create the filtered list ---
  // useMemo will re-calculate this list only when 'filter' or 'bookings' changes
  const filteredBookings = useMemo(() => {
    if (!bookings) {
      return [];
    }

    const today = new Date().toISOString().split('T')[0];

    switch (filter) {
      case 'Pending':
        return bookings.filter((b) => b.status === 'Pending');
      case 'Confirmed':
        return bookings.filter((b) => b.status === 'Confirmed');
      case 'Today':
        return bookings.filter((b) => b.date === today);
      case 'All':
      default:
        return bookings;
    }
  }, [bookings, filter]); // Dependencies

  // --- Handlers (no change) ---
  const handleConfirm = async (id) => {
    try {
      await updateBookingStatus({ id, status: 'Confirmed' }).unwrap();
    } catch (err) {
      console.error('Failed to confirm booking:', err);
      alert('Failed to confirm booking.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id).unwrap();
      } catch (err) {
        console.error('Failed to delete booking:', err);
        alert('Failed to delete booking.');
      }
    }
  };

  // --- Loading/Error states (no change) ---
  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" style={{ color: '#4E342E' }} />
        <p>Loading bookings...</p>
      </Container>
    );
  }
  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error: {error?.data?.message || 'Could not fetch bookings'}
        </Alert>
      </Container>
    );
  }

  // --- 5. Updated Render Logic ---
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h1 style={{ color: '#4E342E' }}>Admin Dashboard</h1>
          <h4>Manage Bookings</h4>
        </Col>
      </Row>

      {/* --- 6. Add Filter Buttons --- */}
      <Row className="mt-3 mb-3">
        <Col>
          <ButtonGroup>
            <Button 
              variant={filter === 'All' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('All')}
              style={filter === 'All' ? {backgroundColor: '#4E342E', borderColor: '#4E342E'} : {color: '#4E342E', borderColor: '#4E342E'}}
            >
              All Bookings
            </Button>
            <Button 
              variant={filter === 'Today' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('Today')}
              style={filter === 'Today' ? {backgroundColor: '#4E342E', borderColor: '#4E342E'} : {color: '#4E342E', borderColor: '#4E342E'}}
            >
              Today's Bookings
            </Button>
            <Button 
              variant={filter === 'Pending' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('Pending')}
              style={filter === 'Pending' ? {backgroundColor: '#4E342E', borderColor: '#4E342E'} : {color: '#4E342E', borderColor: '#4E342E'}}
            >
              Pending
            </Button>
            <Button 
              variant={filter === 'Confirmed' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('Confirmed')}
              style={filter === 'Confirmed' ? {backgroundColor: '#4E342E', borderColor: '#4E342E'} : {color: '#4E342E', borderColor: '#4E342E'}}
            >
              Confirmed
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      {/* --- End of Filter Buttons --- */}

      <Row className="mt-3">
        <Col>
          {/* --- 7. Map over 'filteredBookings' instead of 'bookings' --- */}
          {filteredBookings && filteredBookings.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#4E342E', color: 'white' }}>
                <tr>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Email</th> {/* Added Email to the table */}
                  <th>Date</th>
                  <th>Time</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Use filteredBookings here */}
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.customerName}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td> {/* Added Email */}
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.time}</td>
                    <td>{booking.people}</td>
                    <td>
                      <span 
                        className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : 'bg-warning'}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleConfirm(booking.id)}
                        disabled={booking.status === 'Confirmed' || isUpdating} 
                      >
                        {isUpdating ? '...' : 'Confirm'}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(booking.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? '...' : 'Delete'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            // Show a message relevant to the filter
            <Alert variant="info">
              {filter === 'All' 
                ? 'No bookings found.' 
                : `No ${filter.toLowerCase()} bookings found.`}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;