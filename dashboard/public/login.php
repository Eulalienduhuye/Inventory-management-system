<?php
session_start();

// Allow requests from frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$db = 'inventory_management';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Handle POST login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        die("All fields are required.");
    }

    $sql = "SELECT id, first_name, email, password FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            // Store user in session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['first_name'];

            // ✅ Redirect to React dashboard (make sure React is running on port 3000)
            header("Location: http://localhost:3000/dashboard");
            $stmt->close();
            exit();
        } else {
            $stmt->close();
            die("❌ Invalid password.");
        }
    } else {
        $stmt->close();
        die("❌ No account found with that email.");
    }
} else {
    die("Invalid request method.");
}

