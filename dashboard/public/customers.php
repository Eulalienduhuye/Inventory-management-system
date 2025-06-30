<?php
// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// DB connection setup
$host = 'localhost';
$db = 'inventory_management';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Handle request
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM customers");
    $customers = [];

    while ($row = $result->fetch_assoc()) {
        $customers[] = [
            "id" => $row["id"],
            "name" => $row["name"],
            "email" => $row["email"],
            "phone" => $row["phone"]
        ];
    }

    echo json_encode($customers);
}

elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        empty($data['name']) || 
        empty($data['email']) || 
        empty($data['phone'])
    ) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required."]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data['name'], $data['email'], $data['phone']);
    $stmt->execute();

    $data['id'] = $stmt->insert_id;
    echo json_encode($data);
}

elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        empty($data['id']) ||
        empty($data['name']) || 
        empty($data['email']) || 
        empty($data['phone'])
    ) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required including ID."]);
        exit();
    }

    $stmt = $conn->prepare("UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?");
    $stmt->bind_param("sssi", $data['name'], $data['email'], $data['phone'], $data['id']);
    $stmt->execute();
    echo json_encode(["success" => true, "updated" => $data]);
}

elseif ($method === 'DELETE') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing customer ID."]);
        exit();
    }

    $id = intval($_GET['id']);

    $stmt = $conn->prepare("DELETE FROM customers WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(["success" => true]);
}

$conn->close();
?>
