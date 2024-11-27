<?php
// Database credentials
$host = 'localhost';
$dbname = 'test';
$username = 'root';
$password = '';

// Create a PDO instance
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

// Check if the data is received from DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $device_type = $_DELETE['device_type'];

    // Prepare SQL query to delete the record
    $stmt = $pdo->prepare("DELETE FROM devices WHERE device_type = ?");
    $stmt->execute([$device_type]);

    echo "Record deleted successfully!";
}
?>
