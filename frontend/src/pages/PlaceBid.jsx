import React, { useState, useEffect } from 'react';
import '../styles/PlaceBid.css';
import {Modal, Button} from 'react-bootstrap';

const TestPage = () => {
  const [bid, setBid] = useState(1250);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 10 });
  

  const [showHistory, setShowHistory] = useState(false);

  // Simple countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePlaceBid = (e) => {
    e.preventDefault();
    const amount = Number(e.target.bidAmount.value);
    if (amount > bid) {
      setBid(amount);
      alert("Bid placed successfully!");
    } else {
      alert("Bid must be higher than current price.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Left: Image Gallery */}
      <div className="space-y-4">
        <div className="bg-gray-200 aspect-square rounded-xl flex items-center justify-center overflow-hidden">
          <img src="/api/placeholder/600/600" alt="Auction Item" className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-24 h-24 bg-gray-100 rounded-md border border-gray-300 cursor-pointer hover:border-blue-500" />
          ))}
        </div>
      </div>

      {/* Right: Bidding & Info */}
      <div className="flex flex-col space-y-6">
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Live Auction</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">Vintage 1960s Chronograph Watch</h1>
          <p className="text-gray-500 mt-4 leading-relaxed">
            A rare, well-preserved timepiece with original leather straps. Minimal wear on the casing, 
            fully functional mechanical movement. A collector's dream.
          </p>
        </div>

        {/* Action Form */}
        <form onSubmit={handlePlaceBid} className="flex gap-3">
          <input 
            type="number" 
            name="bidAmount"
            placeholder={`Enter $${Number(bid) + 50} or more`}
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition">
            Place Bid
          </button>
        </form>

        {/* Price & Timer Card */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Current Bid</p>
            <p className="text-3xl font-bold text-gray-900">${bid.toLocaleString()}</p>

            <button 
              onClick={() => setShowHistory(true)}
              className="text-blue-600 underline mt-2"
            >
              Bid History
            </button>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Time Remaining</p>
            <p className="text-2xl font-mono font-bold text-red-500">
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>
        </div>

        

       
       
      </div>

      {/* MODAL – Bid History Popup */}
      <Modal
        show={showHistory}
        onHide={() => setShowHistory(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Bid History</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            {[
              { user: "WatchFan99", amount: 1250, time: "2 mins ago" },
              { user: "Collector_A", amount: 1100, time: "10 mins ago" },
              { user: "TimeKeeper", amount: 1050, time: "1 hour ago" },
            ].map((entry, idx) => (
              <div
                key={idx}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <strong>{entry.user}</strong>
                <small className="text-muted">{entry.time}</small>
                <span className="fw-bold">${entry.amount}</span>
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHistory(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default TestPage;
