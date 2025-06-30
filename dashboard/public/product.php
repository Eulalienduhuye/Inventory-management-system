<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$db = 'inventory_management';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "DB connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM products");
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            "id" => (int)$row["id"],
            "name" => $row["name"],
            "price" => (float)$row["price"],
            "quantity" => (int)$row["quantity"],
        ];
    }
    echo json_encode($products);
}

elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (empty($data['name']) || !isset($data['price']) || !isset($data['quantity'])) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required."]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)");
    $stmt->bind_param("sdi", $data['name'], $data['price'], $data['quantity']);
    if ($stmt->execute()) {
        $data['id'] = $stmt->insert_id;
        echo json_encode($data);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $stmt->error]);
    }
}

elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['id'], $data['name'], $data['price'], $data['quantity'])) {
        http_response_code(400);
        echo json_encode(["error" => "All fields including ID are required."]);
        exit();
    }

    $stmt = $conn->prepare("UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?");
    $stmt->bind_param("sdii", $data['name'], $data['price'], $data['quantity'], $data['id']);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $stmt->error]);
    }
}

elseif ($method === 'DELETE') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing product ID."]);
        exit();
    }
    $id = (int)$_GET['id'];
    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $stmt->error]);
    }
}

$conn->close();
?>
