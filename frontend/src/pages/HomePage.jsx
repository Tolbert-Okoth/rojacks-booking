// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Spinner, 
  Alert, 
  Card 
} from 'react-bootstrap';

// Import our API hooks
import { useGetRestaurantQuery } from '../api/restaurantApiSlice';
import { useCreateBookingMutation } from '../api/bookingApiSlice';

const HomePage = () => {
  // --- 1. Fetch Restaurant Data ---
  const { 
    data: restaurant, 
    isLoading: isLoadingRestaurant, 
    isError: isErrorRestaurant, 
    error: restaurantError 
  } = useGetRestaurantQuery();

  // --- 2. Booking Form State ---
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); 
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1);

  // --- 3. Booking Mutation ---
  const [
    createBooking, 
    { isLoading: isBooking, isSuccess: isBookingSuccess, isError: isBookingError, error: bookingError }
  ] = useCreateBookingMutation();

  // --- 4. Handle Form Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurant) {
      alert('Restaurant data is not loaded yet. Please wait.');
      return;
    }

    try {
      // Send all form data + the restaurant's ID
      await createBooking({
        customerName,
        phone,
        email, 
        date,
        time,
        people,
        restaurantId: restaurant.id // Crucial!
      }).unwrap();

      // Clear the form on success
      setCustomerName('');
      setPhone('');
      setEmail(''); 
      setDate('');
      setTime('');
      setPeople(1);

    } catch (err) {
      console.error('Failed to create booking:', err);
    }
  };
  
  // Get today's date for the min attribute on the date picker
  const today = new Date().toISOString().split('T')[0];

  // --- 5. Render Component ---
  return (
    <Container className="mt-5">
      <Row>
        {/* --- COLUMN 1: RESTAURANT INFO --- */}
        <Col md={6} style={{ color: '#4E342E' }}>
          {isLoadingRestaurant ? (
            <Spinner animation="border" />
          ) : isErrorRestaurant ? (
            <Alert variant="danger">
              {restaurantError?.data?.message || 'Could not load restaurant info.'}
            </Alert>
          ) : restaurant ? (
            <>
              <h1 className="display-4" style={{ fontWeight: 'bold' }}>
                Experience the Taste of Rojacks
              </h1>
              <h3 style={{ color: '#D4A373' }}>
                Book Your Table Now!
              </h3>
              <Card className="mt-4" style={{ backgroundColor: '#FFF8E1', border: 'none' }}>
                <Card.Body>
                  <Card.Title as="h4">{restaurant.name}</Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {restaurant.location}
                  </Card.Text>
                  <Card.Text>
                    {restaurant.description || 'The best dining experience in Migori.'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Contact:</strong> {restaurant.contact || 'N/A'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          ) : (
            <Alert variant="info">No restaurant information available.</Alert>
          )}
        </Col>

        {/* --- COLUMN 2: BOOKING FORM --- */}
        <Col md={6} className="p-4" style={{ backgroundColor: '#FFF8E1', borderRadius: '8px' }}>
          <h2 style={{ color: '#4E342E' }}>Reserve Your Spot</h2>
          
          {/* Form submission success/error messages */}
          {isBookingSuccess && (
            <Alert variant="success">
              Booking Confirmed! We'll see you soon.
            </Alert>
          )}
          {isBookingError && (
            <Alert variant="danger">
              {bookingError?.data?.message || 'Booking failed. Please try again.'}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="customerName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    // --- ADDED TIME RESTRICTIONS ---
                    min="09:00"
                    max="22:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="people">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={people}
                // --- THIS IS THE CORRECTED LINE ---
                onChange={(e) => setPeople(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              disabled={isBooking || isLoadingRestaurant}
              style={{ backgroundColor: '#D4A373', borderColor: '#D4A373', color: '#4E342E', fontWeight: 'bold' }}
            >
              {isBooking ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  Booking...
                </>
              ) : (
                'Book a Table'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;