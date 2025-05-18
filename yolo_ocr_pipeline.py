input_video_path = [k for k in uploaded.keys() if not k.endswith('.pt')][0]
output_video_path = "output_with_yolo_ocr.mp4"

cap = cv2.VideoCapture(input_video_path)

fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

frame_count = 0

while True:
   ret, frame = cap.read()
   if not ret:
       break
   frame_count += 1
   
   # YOLO inference on frame (returns detections)
   results = model(frame)[0]
   
   # Each detection: xyxy bbox, confidence, class
   boxes = results.boxes.xyxy.cpu().numpy() if results.boxes is not None else []
   classes = results.boxes.cls.cpu().numpy().astype(int) if results.boxes is not None else []
   
   # Keep track of texts detected per frame
   detected_license_plates = []
   detected_slot_numbers = []
   
   for i, box in enumerate(boxes):
       x1, y1, x2, y2 = map(int, box)
       cls = classes[i]
       
       # Crop detected region
       crop_img = frame[y1:y2, x1:x2]
       
       if crop_img.size == 0:
           continue
       
       # OCR on crop (grayscale)
       gray_crop = cv2.cvtColor(crop_img, cv2.COLOR_BGR2GRAY)
       ocr_results = reader.readtext(gray_crop)
       
       # Extract detected text strings
       texts = [res[1] for res in ocr_results]
       
       # Filter for license plates and slot numbers
       license_plates, slot_numbers = filter_text(texts)
       
       detected_license_plates.extend(license_plates)
       detected_slot_numbers.extend(slot_numbers)
       
       # Draw bounding box on original frame
       color = (0, 255, 0)  # Green box for detected region
       cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
       
       # Put OCR text above box (showing first detected text or "None")
       display_text = license_plates[0] if license_plates else (slot_numbers[0] if slot_numbers else "No Text")
       cv2.putText(frame, display_text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
   
   # Overlay summary of detected texts on frame
   lp_text = "License Plates: " + (", ".join(detected_license_plates) if detected_license_plates else "None")
   slot_text = "Slots: " + (", ".join(detected_slot_numbers) if detected_slot_numbers else "None")
   
   cv2.putText(frame, lp_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
   cv2.putText(frame, slot_text, (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
   
   # Write frame to output video
   out.write(frame)
   
   # Show every 30 frames (optional for Colab preview)
   if frame_count % 30 == 0:
       from google.colab.patches import cv2_imshow
       print(f"Processed frame: {frame_count}")
       cv2_imshow(frame)

cap.release()
out.release()

print("Done! Saved video as:", output_video_path)
