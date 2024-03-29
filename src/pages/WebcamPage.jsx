import React from "react";
import Webcam from "react-webcam";

import "@tensorflow/tfjs";
import * as faceDetection from "@tensorflow-models/face-detection";

export default function WebcamPage() {
  const videoConstraints = {
    width: 400,
    height: 460,
    facingMode: "user",
    aspectRatio: 0.1,
  };

  const [error, setError] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [startCapture, setStartCapture] = React.useState(false);
  const [isOkay, setIsOkay] = React.useState(false);

  const webcamRef = React.useRef(null);

  React.useEffect(() => {}, []);

  const handlePlay = async () => {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;

    const detectorConfig = {
      runtime: "tfjs",
    };

    const detector = await faceDetection.createDetector(model, detectorConfig);

    setInterval(async () => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null
      ) {
        const faces = await detector.estimateFaces(webcamRef.current.video);

        if (faces[0]) {
          setImages((prev) => [...prev, webcamRef.current.getScreenshot()]);
          setIsOkay(true);
        } else {
          setIsOkay(false);
        }
      }
    }, 1000);
  };

  const handleCaptureClick = () => {
    const checkUserMediaSupport = async () => {
      const isUserMediaSupported =
        typeof navigator.mediaDevices !== "undefined" &&
        typeof navigator.mediaDevices.getUserMedia === "function";

      try {
        if (isUserMediaSupported) {
          console.log("getUserMedia is supported!");
        } else {
          setError(true);
          console.error("getUserMedia is not supported in this browser.");
        }
      } catch (error) {
        console.error("Error checking getUserMedia support:", error);
      }
    };

    checkUserMediaSupport()
      .then(() => {
        if (startCapture) {
          setStartCapture(false);
        } else {
          setImages([]);
          !error && setStartCapture(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Web Cam</h1>

      {images.length <= 7 && startCapture ? (
        <div className='webcam-container'>
          <Webcam
            className='webcam'
            audio={false}
            ref={webcamRef}
            width={200}
            height={230}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
            screenshotQuality={1}
            onPlay={handlePlay}
            mirrored={true}
          />
        </div>
      ) : (
        images.length >= 7 && (
          <div className='final-image'>
            <img src={images[images.length - 1]} alt='Result' />
          </div>
        )
      )}

      {images.length >= 7 && (
        <p
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            setImages([]);
            setStartCapture(true);
          }}>
          Retake Photo
        </p>
      )}

      <button className='capture-btn' onClick={handleCaptureClick}>
        {startCapture ? "Finish Capture" : "Start Capture"}
      </button>

      {error && (
        <p className='inactive'>
          getUserMedia is not implemented in this browser!
        </p>
      )}

      {startCapture && (
        <>
          <p style={{ textAlign: "center" }}>
            Tips: Put your face inside the oval frame and click to "take selfie"
          </p>
          <p className={isOkay ? "active" : "inactive"}>
            {isOkay
              ? "Hold on! Taking Pictures"
              : "Make sure your face is clear enough"}
          </p>
        </>
      )}

      <div className='snapped-images'>
        {images.length > 1 &&
          startCapture &&
          images.map((val, i) => {
            return (
              <img className='result-image' src={val} alt='Conver' key={i} />
            );
          })}
      </div>
    </div>
  );
}
