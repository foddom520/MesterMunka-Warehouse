import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import '../styles/PlaceBid.css';

const PlaceBid = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bidLoading, setBidLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 10 });
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await fetch(`http://localhost:3000/arveresinfo/${id}`);
        if (!res.ok) throw new Error("Hiba az árverés betöltésekor");
        const data = await res.json();
        
        if (data && data.length > 0) {
          setAuction(data[0]);
          setBid(data[0].Licit);
        } else {
          setError("Árverés nem található.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAuction();
  }, [id]);

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    const amount = Number(e.target.bidAmount.value);
    
    const tenPercent = bid * 0.10;
    const requiredIncrement = Math.min(tenPercent, 50);
    const minBid = bid + requiredIncrement;
  
    if (amount < minBid) {
      alert(`A licitnek legalább $${minBid.toFixed(2)} értékűnek kell lennie! (Minimum emelés: $${requiredIncrement.toFixed(2)})`);
      return;
    }
  
    setBidLoading(true);
    try {
      const res = await fetch("http://localhost:3000/arveresinfo/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aid: id, licit: amount }),
      });
  
      if (!res.ok) throw new Error("Hiba történt a licitálás során");
      
      setBid(amount);
      alert("Sikeres licit!");
      e.target.reset();
    } catch (err) {
      alert(err.message);
    } finally {
      setBidLoading(false);
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;
  if (error) return <div className="text-center p-5"><Alert variant="danger">{error}</Alert></div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <div className="bg-gray-200 aspect-square rounded-xl flex items-center justify-center overflow-hidden">
          <img src="/api/placeholder/600/600" alt="Auction Item" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Live Auction #{id}</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">Raktár Licit</h1>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Árverés részletei és aktuális státusza.
          </p>
        </div>

        <form onSubmit={handlePlaceBid} className="flex gap-3">
          <input 
            type="number" 
            name="bidAmount"
            min={bid + 1}
            placeholder={`Minimum licit: $${Number(bid) + 50}`}
            className="flex-1 p-4 border border-gray-300 rounded-lg outline-none"
            required
          />
          <button 
            type="submit" 
            disabled={bidLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold"
          >
            {bidLoading ? "Töltés..." : "Place Bid"}
          </button>
        </form>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex justify-between items-center">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Current Bid</p>
            <p className="text-3xl font-bold text-gray-900">${bid.toLocaleString()}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceBid;