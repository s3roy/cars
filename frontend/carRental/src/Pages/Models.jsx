import React, { useState } from "react";
import HeroPages from "../components/HeroPages";
import CarImg1 from "../images/cars-big/audi-box.png";
import CarImg2 from "../images/cars-big/golf6-box.png";
import CarImg3 from "../images/cars-big/toyota-box.png";
import CarImg4 from "../images/cars-big/bmw-box.png";
import CarImg5 from "../images/cars-big/benz-box.png";
import CarImg6 from "../images/cars-big/passat-box.png";

const carData = [
  {
    id: 1,
    name: "Audi A1",
    price: "$45M",
    img: CarImg1,
    brand: "Audi",
    engine: "Diesel",
    transmission: "Manual",
    seats: "4/5",
  },
  {
    id: 2,
    name: "Golf 6",
    price: "$37M",
    img: CarImg2,
    brand: "Volkswagen",
    engine: "Diesel",
    transmission: "Manual",
    seats: "4/5",
  },
  {
    id: 3,
    name: "Toyota Camry",
    price: "$30M",
    img: CarImg3,
    brand: "Toyota",
    engine: "Petrol",
    transmission: "Automatic",
    seats: "5",
  },
  {
    id: 4,
    name: "BMW 320",
    price: "$35M",
    img: CarImg4,
    brand: "BMW",
    engine: "Diesel",
    transmission: "Manual",
    seats: "4/5",
  },
  {
    id: 5,
    name: "Mercedes Benz GLK",
    price: "$50M",
    img: CarImg5,
    brand: "Mercedes",
    engine: "Diesel",
    transmission: "Automatic",
    seats: "5",
  },
  {
    id: 6,
    name: "VW Passat",
    price: "$25M",
    img: CarImg6,
    brand: "Volkswagen",
    engine: "Diesel",
    transmission: "Manual",
    seats: "4/5",
  },
];

function Models() {
  const [message, setMessage] = useState(null);

  const handleBookRide = async (car) => {
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setMessage(
      <p className="booking-done">
        Your test drive is booked! Your Order ID is: <strong>{orderId}</strong>.{" "}
        Check your email to confirm the details.{" "}
        <i onClick={() => setMessage(null)} className="fa-solid fa-xmark"></i>
      </p>
    );

    // Make API call for booking
    try {
      const response = await fetch("/api/book-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car, orderId }),
      });
      const result = await response.json();
      console.log("Book Ride Response:", result);
    } catch (error) {
      console.error("Error booking ride:", error);
    }
  };

  const handleBuyNow = async (car) => {
    setMessage(
      <p className="booking-done">
        Thank you for purchasing! Your order for <strong>{car.name}</strong> is
        confirmed.{" "}
        <i onClick={() => setMessage(null)} className="fa-solid fa-xmark"></i>
      </p>
    );

    // Make API call for buying
    try {
      const response = await fetch("/api/buy-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car }),
      });
      const result = await response.json();
      console.log("Buy Now Response:", result);
    } catch (error) {
      console.error("Error purchasing car:", error);
    }
  };

  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <div className="container">
          <div className="models-div">
            {carData.map((car) => (
              <div key={car.id} className="models-div__box">
                <div className="models-div__box__img">
                  <img src={car.img} alt={`${car.name}_img`} />
                  <div className="models-div__box__descr">
                    <div className="models-div__box__descr__name-price">
                      <div className="models-div__box__descr__name-price__name">
                        <p>{car.name}</p>
                        <span>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </span>
                      </div>
                      <div className="models-div__box__descr__name-price__price">
                        <h4>{car.price}</h4>
                      </div>
                    </div>
                    <div className="models-div__box__descr__name-price__details">
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp; Brand:{" "}
                        {car.brand}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        Seats: {car.seats} &nbsp;{" "}
                        <i className="fa-solid fa-user-group"></i>
                      </span>
                      <span>
                        <i className="fa-solid fa-cogs"></i> &nbsp;
                        Transmission: {car.transmission}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        Engine: {car.engine} &nbsp;{" "}
                        <i className="fa-solid fa-gas-pump"></i>
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__btn">
                      <button
                        onClick={() => handleBookRide(car)}
                        className="btn btn-primary"
                      >
                        Book Ride
                      </button>
                      <button
                        onClick={() => handleBuyNow(car)}
                        className="btn btn-secondary"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {message && <div className="message-box">{message}</div>}
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Models;
