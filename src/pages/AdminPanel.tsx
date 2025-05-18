import React, { useEffect, useState } from 'react';

const AdminPanel: React.FC = () => {
  const [spot, setSpot] = useState({ spot_id: '', status: '', camera_id: '' });
  const [vehicle, setVehicle] = useState({ license_plate: '', spot_id: '' });
  const [spotMessage, setSpotMessage] = useState('');
  const [vehicleMessage, setVehicleMessage] = useState('');
  const [spots, setSpots] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  // Fetch data from backend
  const fetchSpots = async () => {
    const res = await fetch('http://127.0.0.1:5000/get-spots');
    const data = await res.json();
    setSpots(data);
  };

  const fetchVehicles = async () => {
    const res = await fetch('http://127.0.0.1:5000/get-vehicles');
    const data = await res.json();
    setVehicles(data);
  };

  useEffect(() => {
    fetchSpots();
    fetchVehicles();
  }, []);

  const handleAddSpot = async () => {
    const res = await fetch('http://127.0.0.1:5000/add-spot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
    });
    const data = await res.json();
    setSpotMessage(data.message || 'Spot added!');
    setSpot({ spot_id: '', status: '', camera_id: '' });
    fetchSpots();
  };

  const handleAddVehicle = async () => {
    const entry_time = new Date().toISOString();
    const res = await fetch('http://127.0.0.1:5000/add-vehicle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...vehicle, entry_time }),
    });
    const data = await res.json();
    setVehicleMessage(data.message || 'Vehicle added!');
    setVehicle({ license_plate: '', spot_id: '' });
    fetchVehicles();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Admin Panel</h1>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '50px' }}>
        <div style={{ width: '300px' }}>
          <h3>Add Parking Spot</h3>
          <input placeholder="Spot ID" value={spot.spot_id} onChange={(e) => setSpot({ ...spot, spot_id: e.target.value })} />
          <input placeholder="Status (vacant/occupied)" value={spot.status} onChange={(e) => setSpot({ ...spot, status: e.target.value })} />
          <input placeholder="Camera ID" value={spot.camera_id} onChange={(e) => setSpot({ ...spot, camera_id: e.target.value })} />
          <button onClick={handleAddSpot} style={{ marginTop: '10px' }}>Add Spot</button>
          <p>{spotMessage}</p>
        </div>

        <div style={{ width: '300px' }}>
          <h3>Add Vehicle</h3>
          <input placeholder="License Plate" value={vehicle.license_plate} onChange={(e) => setVehicle({ ...vehicle, license_plate: e.target.value })} />
          <input placeholder="Spot ID" value={vehicle.spot_id} onChange={(e) => setVehicle({ ...vehicle, spot_id: e.target.value })} />
          <button onClick={handleAddVehicle} style={{ marginTop: '10px' }}>Add Vehicle</button>
          <p>{vehicleMessage}</p>
        </div>
      </div>

      <hr />

      <div style={{ display: 'flex', gap: '40px' }}>
        <div>
          <h2>🅿️ Parking Spots</h2>
          <ul>
            {spots.map((s, i) => (
              <li key={i}>
                <strong>{s.spot_id}</strong>: {s.status} (Camera: {s.camera_id})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>🚗 Vehicles</h2>
          <ul>
            {vehicles.map((v, i) => (
              <li key={i}>
                <strong>{v.license_plate}</strong> → {v.spot_id} (entry: {new Date(v.entry_time).toLocaleString()})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
