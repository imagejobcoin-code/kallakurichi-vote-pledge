const kallakurichiConstituencies = ["Kallakurichi", "Sankarapuram", "Rishivandiyam", "Ulundurpet"];
const allDistricts = ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"];

function updateConstituencies() {
    const district = document.getElementById('district').value;
    const constituencySelect = document.getElementById('constituency');
    constList = (district === "Kallakurichi") ? kallakurichiConstituencies : allDistricts;
    
    constituencySelect.innerHTML = constList.map(item => `<option value="${item}">${item}</option>`).join('');
}

// Initialize list on load
updateConstituencies();

function generateBadge() {
    const video = document.getElementById('video');
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('badgeCanvas');
const ctx = canvas.getContext('2d');
let capturedImage = null;

// --- CAMERA LOGIC ---
document.getElementById('startCamera').addEventListener('click', async () => {
    document.getElementById('cameraArea').style.display = 'block';
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
});

document.getElementById('captureBtn').addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    tempCanvas.getContext('2d').drawImage(video, 0, 0);
    capturedImage = tempCanvas.toDataURL('image/png');
    
    // Stop camera
    video.srcObject.getTracks().forEach(track => track.stop());
    document.getElementById('cameraArea').style.display = 'none';
    alert("Photo Captured!");
});

// --- GENERATE BADGE LOGIC ---
function generateBadge() {
    const template = new Image();
    template.src = 'template.png'; // Ensure this filename matches your uploaded image exactly

    template.onload = function() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const userImg = new Image();
        
        // Check if user uploaded a file OR took a camera photo
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userImg.src = e.target.result;
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else if (capturedImage) {
            userImg.src = capturedImage;
        } else {
            alert("Please upload or take a photo first!");
            return;
        }

        userImg.onload = function() {
            // 1. Draw User Photo (Clipped into a circle)
            ctx.save();
            ctx.beginPath();
            ctx.arc(300, 410, 160, 0, Math.PI * 2); // Positioned for the center hole
            ctx.clip();
            
            // This centers the photo inside the circle
            ctx.drawImage(userImg, 140, 250, 320, 320); 
            ctx.restore();

            // 2. Draw Template on top
            ctx.drawImage(template, 0, 0, 600, 600);

            // 3. Show the result
            const finalImage = document.getElementById('finalBadge');
            finalImage.src = canvas.toDataURL('image/png');
            document.getElementById('downloadBtn').href = canvas.toDataURL('image/png');
            document.getElementById('resultArea').style.display = 'block';
        };
    };
}