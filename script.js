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
    const canvas = document.getElementById('badgeCanvas');
    const ctx = canvas.getContext('2d');
    const imgInput = document.getElementById('imageInput');
    const template = new Image();
    
    template.src = 'template.png'; // Make sure this file exists in your folder!

    template.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. Draw User Photo first (to clip it in circle)
        if (imgInput.files && imgInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const userImg = new Image();
                userImg.onload = function() {
                    // Draw circular photo in center
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(300, 300, 120, 0, Math.PI * 2); // Adjust position/size
                    ctx.clip();
                    ctx.drawImage(userImg, 180, 180, 240, 240); // Adjust to fit circle
                    ctx.restore();

                    // 2. Draw Template on top (with transparent center)
                    ctx.drawImage(template, 0, 0, 600, 600);

                    // Show result
                    const dataUrl = canvas.toDataURL('image/png');
                    document.getElementById('finalBadge').src = dataUrl;
                    document.getElementById('downloadBtn').href = dataUrl;
                    document.getElementById('resultArea').style.display = 'block';
                };
                userImg.src = event.target.result;
            };
            reader.readAsDataURL(imgInput.files[0]);
        }
    };
}