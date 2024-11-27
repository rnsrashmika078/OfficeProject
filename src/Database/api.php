<?php
include 'db.php';

// Fetch all rows from the table
$sql = "SELECT * FROM devices";  // Replace with your table name
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $devices = [];
    while($row = $result->fetch_assoc()) {
        $devices[] = $row;
    }
    echo json_encode($devices);
} else {
    echo json_encode([]);
}

$conn->close();
?>
