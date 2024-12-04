import React, { useState, useEffect } from "react";
import HeroPages from "../components/HeroPages";
import API_BASE_URL from "../constant/api";

// Import car images
import CarImg1 from "../images/cars-big/audi-box.png";
import CarImg2 from "../images/cars-big/golf6-box.png";
import CarImg3 from "../images/cars-big/toyota-box.png";
import CarImg4 from "../images/cars-big/bmw-box.png";
import CarImg5 from "../images/cars-big/benz-box.png";
import CarImg6 from "../images/cars-big/passat-box.png";

// Map car IDs to images
const carImages = {
  1: CarImg1,
  2: CarImg2,
  3: CarImg3,
  4: CarImg4,
  5: CarImg5,
  6: CarImg6,
};

function Models() {
  const [cars, setCars] = useState([]); // Dynamically fetched cars list
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [reviewContent, setReviewContent] = useState(""); // Review text
  const [reviewRating, setReviewRating] = useState(0); // Review rating
  const userId = localStorage.getItem("userID"); // Get userId from localStorage

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Handle booking a ride
  const handleBookRide = async (car) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          car_id: car.id,
          transaction_type: "test_drive",
        }),
      });
      const result = await response.json();
      setPopupContent(
        <div>
          <h3 style={{ marginBottom: "10px" }}>Test Drive Booked!</h3>
          <p>
            Your test drive for <strong>{car.name}</strong> is confirmed. Your
            booking ID is: <strong>{result.booking_id}</strong>.
          </p>
        </div>
      );
      setPopupVisible(true);
    } catch (error) {
      console.error("Error booking ride:", error);
    }
  };

  // Handle buying a car
  const handleBuyNow = async (car) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          car_id: car.id,
          transaction_type: "buy",
        }),
      });
      const result = await response.json();
      setPopupContent(
        <div>
          <h3 style={{ marginBottom: "10px" }}>Purchase Confirmed!</h3>
          <p>
            Thank you for purchasing <strong>{car.name}</strong>. Your booking
            ID is: <strong>{result.booking_id}</strong>.
          </p>
        </div>
      );
      setPopupVisible(true);
    } catch (error) {
      console.error("Error buying car:", error);
    }
  };

  return (
    <>
      <section>
        <HeroPages name="Vehicle Models" />
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {cars.map((car) => (
              <div
                key={car.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <img
                    src={carImages[car.id]}
                    alt={`${car.name}_img`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                  <h4 style={{ margin: "10px 0" }}>{car.name}</h4>
                  <p style={{ color: "#007bff", fontWeight: "bold" }}>
                    {car.price} M
                  </p>
                </div>
                <div style={{ fontSize: "14px", color: "#555" }}>
                  <p>
                    <strong>Brand:</strong> {car.brand}
                  </p>
                  <p>
                    <strong>Engine:</strong> {car.engine}
                  </p>
                  <p>
                    <strong>Transmission:</strong> {car.transmission}
                  </p>
                  <p>
                    <strong>Seats:</strong> {car.seats}
                  </p>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <button
                    onClick={() => handleBookRide(car)}
                    style={{
                      padding: "10px 20px",
                      margin: "5px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Book Ride
                  </button>
                  <button
                    onClick={() => handleBuyNow(car)}
                    style={{
                      padding: "10px 20px",
                      margin: "5px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {popupVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                maxWidth: "500px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              {popupContent}
              <button
                onClick={() => setPopupVisible(false)}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Models;
