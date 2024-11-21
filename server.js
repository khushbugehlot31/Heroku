const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999"; // Replace with your user ID
    const email = "john@xyz.com"; // Replace with your email
    const roll_number = "ABCD123"; // Replace with your roll number

    if (!data) {
        return res.status(400).json({ is_success: false, message: "No data provided" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercase = alphabets.filter(char => char === char.toLowerCase()).sort().pop() || '';
    const isPrimeFound = numbers.some(num => isPrime(num));
    
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKb = 0;

    if (req.file) {
        fileValid = true;
        fileMimeType = req.file.mimetype;
        fileSizeKb = req.file.size / 1024; // Convert to KB
    }

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

function isPrime(num) {
    num = parseInt(num);
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
