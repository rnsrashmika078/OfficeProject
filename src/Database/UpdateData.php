<?php
include 'db.php';

// Check if POST request to update data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];  // Device ID
    $device_type = $_POST['device_type']; 
    $os = $_POST['os']; 
    $processor = $_POST['processor']; 
    $ram = $_POST['ram']; 
    $hard_drive = $_POST['hard_drive']; 
    $keyboard_status = $_POST['keyboard_status']; 
    $mouse_status = $_POST['mouse_status']; 
    $network = $_POST['network']; 
    $printer = $_POST['printer']; 
    $virus_guard = $_POST['virus_guard']; 
    $monitor = $_POST['monitor']; 
    $laptop = $_POST['laptop']; 

    // SQL Update query
    $sql = "UPDATE devices SET 
            device_type='$device_type', 
            os='$os', 
            processor='$processor', 
            ram='$ram', 
            hard_drive='$hard_drive', 
            keyboard_status='$keyboard_status', 
            mouse_status='$mouse_status', 
            network='$network', 
            printer='$printer', 
            virus_guard='$virus_guard', 
            monitor='$monitor', 
            laptop='$laptop' 
            WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

$conn->close();
?>
