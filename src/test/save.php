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

// Check if the data is received from POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect the data from the POST request
    $device_id = $_POST['id']; // Device ID (Primary Key)
    $device_type = $_POST['device_type'];
    $os = $_POST['os'];
    $processor = $_POST['processor'];
    $ram = $_POST['ram'];
    $hard_drive_capacity = $_POST['hard_drive_capacity'];
    $keyboard_status = $_POST['keyboard_status'];
    $mouse_status = $_POST['mouse_status'];
    $network_connectivity = $_POST['network_connectivity'];
    $printer_connectivity = $_POST['printer_connectivity'];
    $virus_guard = $_POST['virus_guard'];
    $monitor = $_POST['monitor'];
    $laptop = $_POST['laptop'];
    $purchase_date = $_POST['purchase_date'];
    $repair = $_POST['repair'];
    $section = $_POST['section'];

    // If an ID exists, update the record; if not, insert a new one
    if ($device_id) {
        // Prepare the update query
        $stmt = $pdo->prepare("UPDATE devices SET
            device_type = ?, os = ?, processor = ?, ram = ?, hard_drive_capacity = ?, 
            keyboard_status = ?, mouse_status = ?, network_connectivity = ?, printer_connectivity = ?, 
            virus_guard = ?, monitor = ?, laptop = ?, purchase_date = ?, repair = ?, section = ? 
            WHERE id = ?");
        
        // Execute the update query
        $stmt->execute([
            $device_type, $os, $processor, $ram, $hard_drive_capacity,
            $keyboard_status, $mouse_status, $network_connectivity, $printer_connectivity,
            $virus_guard, $monitor, $laptop, $purchase_date, $repair, $section, $device_id
        ]);
        
        // Return the updated ID (in case it's needed for reference)
        echo json_encode(['id' => $device_id]);
    } else {
        // Prepare the insert query if no ID is found
        $stmt = $pdo->prepare("INSERT INTO devices 
            (device_type, os, processor, ram, hard_drive_capacity, keyboard_status, mouse_status, 
            network_connectivity, printer_connectivity, virus_guard, monitor, laptop, 
            purchase_date, repair, section)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        // Execute the insert query
        $stmt->execute([
            $device_type, $os, $processor, $ram, $hard_drive_capacity,
            $keyboard_status, $mouse_status, $network_connectivity, $printer_connectivity,
            $virus_guard, $monitor, $laptop, $purchase_date, $repair, $section
        ]);
        
        // Return the new ID (in case it's needed for reference)
        echo json_encode(['id' => $pdo->lastInsertId()]);
    }
}
?>
