import React, { useState, useEffect } from "react";
import API_BASE_URL from "../constant/api";

// Import car images
import CarImg1 from "../images/cars-big/audi-box.png";
import CarImg2 from "../images/cars-big/golf6-box.png";
import CarImg3 from "../images/cars-big/toyota-box.png";
import CarImg4 from "../images/cars-big/bmw-box.png";
import CarImg5 from "../images/cars-big/benz-box.png";
import CarImg6 from "../images/cars-big/passat-box.png";

// Map car names to images
const carImages = {
  "Audi A1": CarImg1,
  "Golf 6": CarImg2,
  "Toyota Camry": CarImg3,
  "BMW 320": CarImg4,
  "Mercedes Benz GLK": CarImg5,
  "VW Passat": CarImg6,
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userID"); // Get the user ID from localStorage

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/transactions/user/${userId}`
        );
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions.");
      }
    };

    if (userId) {
      fetchTransactions();
    } else {
      setError("User not logged in.");
    }
  }, [userId]);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

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
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Transactions
      </h1>
      {transactions.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              <div style={{ backgroundColor: "#f9f9f9", padding: "15px" }}>
                <img
                  src={carImages[transaction.car_name] || ""}
                  alt={transaction.car_name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ padding: "15px" }}>
                <h2 style={{ marginBottom: "10px", color: "#333" }}>
                  {transaction.car_name}
                </h2>
                <p style={{ margin: "5px 0", color: "#555" }}>
                  <strong>Brand:</strong> {transaction.car_brand}
                </p>
                <p style={{ margin: "5px 0", color: "#555" }}>
                  <strong>Transaction Type:</strong>{" "}
                  {transaction.transaction_type === "buy"
                    ? "Purchase"
                    : "Test Drive"}
                </p>
                <p style={{ margin: "5px 0", color: "#555" }}>
                  <strong>Date:</strong>{" "}
                  {new Date(transaction.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#555" }}>
          You have no transactions yet.
        </p>
      )}
    </div>
  );
}

export default Transactions;
