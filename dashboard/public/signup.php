<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");




$host = 'localhost'; 
$db = 'inventory_management'; 
$user = 'root';
$pass = ''; 

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Secure password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT); 

    $sql = "INSERT INTO users (first_name, last_name, email, password)
            VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $firstName, $lastName, $email, $passwordHash);

    if ($stmt->execute()) {
      echo "<h2>Account created successfully!</h2>";
      echo "<a href='login.html'>Go to login</a>";
    } else {
      echo "Error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
