from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_setup import db
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/add-spot', methods=['POST'])
def add_spot():
    data = request.json
    data['last_updated_time'] = datetime.utcnow().isoformat()
    db.collection('ParkingSpots').document(data['spot_id']).set(data)
    return jsonify({"message": "Parking spot added successfully."})

@app.route('/add-vehicle', methods=['POST'])
def add_vehicle():
    data = request.json
    db.collection('Vehicles').document(data['license_plate']).set(data)
    return jsonify({"message": "Vehicle added successfully."})

@app.route('/log-event', methods=['POST'])
def log_event():
    data = request.json
    db.collection('Logs').add(data)
    return jsonify({"message": "Event logged successfully."})

@app.route('/find-vehicle', methods=['POST'])
def find_vehicle():
    data = request.json
    license_plate = data.get('license_plate')
    if not license_plate:
        return jsonify({"status": "error", "message": "License plate is required"}), 400
    
@app.route('/get-vehicle/<license_plate>', methods=['GET'])
def get_vehicle(license_plate):
    doc = db.collection('Vehicles').document(license_plate).get()
    if doc.exists:
        return jsonify(doc.to_dict())
    else:
        return jsonify({"error": "Vehicle not found"}), 404

    doc_ref = db.collection('Vehicles').document(license_plate)
    doc = doc_ref.get()
    if doc.exists:
        vehicle_data = doc.to_dict()
        return jsonify({
            "status": "found",
            "location": {
                "level": vehicle_data.get("level"),
                "row": vehicle_data.get("row"),
                "slot": vehicle_data.get("slot")
            }
        })
    else:
        return jsonify({"status": "not_found"})

if __name__ == '__main__':
    app.run(debug=True)
