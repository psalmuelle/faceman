import "@smile_identity/smart-camera-web";
import "@smile_identity/smart-camera-web";

export default function SmileID() {
  return (
    <div>
      <div>
        <h1 style={{textAlign: 'center'}}>SmileID</h1>
        <smart-camera-web  imagesComputed={(e)=> console.log(e)}></smart-camera-web>
        
      </div>
    </div>
  );
}
