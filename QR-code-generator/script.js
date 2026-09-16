// Select elements
const textInput = document.getElementById('text-input');
const qrCodeDiv = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');

// Default placeholder text to populate on first load
const defaultText = "https://github.com";
textInput.value = defaultText;

// Initialize the QR code generator instance
let qrcode = new QRCode(qrCodeDiv, {
    text: defaultText,
    width: 180,
    height: 180,
    colorDark: "#0f172a", // Dark slate color instead of stark harsh black for a softer look
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

// Function to update the QR code dynamically as the user types
function updateQRCode() {
    let val = textInput.value.trim();
    
    // Clear out existing code content safely
    qrCodeDiv.innerHTML = "";
    
    if (val === "") {
        // Fallback display if text box is emptied out
        qrcode.makeCode(" ");
        downloadBtn.disabled = true;
        return;
    }

    downloadBtn.disabled = false;
    qrcode.makeCode(val);
}

// Event listener for live typing
textInput.addEventListener('input', updateQRCode);

// Download handler logic
downloadBtn.addEventListener('click', function () {
    const img = qrCodeDiv.querySelector('img');
    
    if (img && img.src) {
        // Create an invisible temporary anchor element to trigger browser download
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});