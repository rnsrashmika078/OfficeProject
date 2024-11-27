<?php
include 'db.php';

// Check if DELETE request to remove data
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $id = $_GET['id'];  // Device ID

    // SQL Delete query
    $sql = "DELETE FROM devices WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
}

$conn->close();
?>
