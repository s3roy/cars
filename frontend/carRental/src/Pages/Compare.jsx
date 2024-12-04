import React, { useState, useEffect } from "react";
import API_BASE_URL from "../constant/api";

// Import car images
import CarImg1 from "../images/cars-big/audi-box.png";
import CarImg2 from "../images/cars-big/golf6-box.png";
import CarImg3 from "../images/cars-big/toyota-box.png";
import CarImg4 from "../images/cars-big/bmw-box.png";
import CarImg5 from "../images/cars-big/benz-box.png";
import CarImg6 from "../images/cars-big/passat-box.png";

function ComparePage() {
  const [cars, setCars] = useState([]); // List of all cars with details
  const [reviews, setReviews] = useState([]); // List of all reviews
  const [selectedCars, setSelectedCars] = useState([null, null]); // Selected car IDs
  const [error, setError] = useState(null);

  // Map car IDs to images
  const carImages = {
    1: CarImg1,
    2: CarImg2,
    3: CarImg3,
    4: CarImg4,
    5: CarImg5,
    6: CarImg6,
  };

  // Fetch cars and reviews
  useEffect(() => {
    const fetchCarsAndReviews = async () => {
      try {
        const carsResponse = await fetch(`${API_BASE_URL}/cars`);
        const carsData = await carsResponse.json();
        setCars(carsData);

        const reviewsResponse = await fetch(`${API_BASE_URL}/reviews/reviews`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data.");
      }
    };
    fetchCarsAndReviews();
  }, []);

  // Handle dropdown selection
  const handleSelectCar = (index, carId) => {
    const updatedSelectedCars = [...selectedCars];
    updatedSelectedCars[index] = carId;
    setSelectedCars(updatedSelectedCars);
  };

  // Get selected car details
  const getCarDetails = (carId) => cars.find((car) => car.id === carId);

  // Get reviews for a car
  const getCarReviews = (carId) =>
    reviews.filter((review) => review.car_id === carId);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        position: "absolute",
        top: "100px",
        left: "15%",
        width: "70%",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Compare Cars
      </h1>

      {/* Dropdowns to select cars */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {selectedCars.map((_, index) => (
          <div key={index} style={{ margin: "0 10px" }}>
            <select
              onChange={(e) =>
                handleSelectCar(
                  index,
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              value={selectedCars[index] || ""}
              style={{
                padding: "10px",
                width: "300px",
                fontSize: "18px",
              }}
            >
              <option value="">Select a Car</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Display selected cars side by side */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "20px",
        }}
      >
        {selectedCars.map((carId, index) => {
          const car = getCarDetails(carId);
          const carReviews = getCarReviews(carId);
          const carImage = car ? carImages[car.id] : null;

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "30px",
                width: "45%",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              {car ? (
                <>
                  <img
                    src={carImage}
                    alt={`${car.name} image`}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                      marginBottom: "20px",
                    }}
                  />
                  <h2 style={{ marginBottom: "15px" }}>{car.name}</h2>
                  <p style={{ color: "#007bff", marginBottom: "15px" }}>
                    <strong>Price:</strong> {car.price}
                  </p>
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

                  <h3 style={{ marginTop: "30px" }}>Reviews</h3>
                  {carReviews.length > 0 ? (
                    carReviews.map((review, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: "#f9f9f9",
                          padding: "15px",
                          margin: "15px 0",
                          borderRadius: "8px",
                          textAlign: "left",
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          <strong>Username:</strong> {review.username}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Rating:</strong> {review.rating} / 5
                        </p>
                        <p style={{ margin: 0 }}>{review.review}</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#999" }}>No reviews available.</p>
                  )}
                </>
              ) : (
                <p style={{ color: "#999" }}>Select a car to view details.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComparePage;
