<?php

include "BD.php";



$first = true;
$connection = BD::obtine_conexiune();
$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
try{
    if (($file = fopen("data.csv", "r")) !== FALSE) {
        echo "File opened.\n Inserting lines...\n";
        $line = 0;
        while (($csv = fgetcsv($file, 5000, ",")) !== FALSE) { // for each row of the file
           

            // skip first line that contains column names
            if($first == true){
                $first = false;
                continue;
            }

            //insert null in empty columns and remove extra "
            for ($count = 0; $count < count($csv); $count++){
            
                if($csv[$count] == ''){
                    $csv[$count] = "null";
                }
                if(strpos($csv[$count], "\"") !== false){
                    $csv[$count] = str_replace("\"", '', $csv[$count]);
                }
            }
            // keep only first 12 columns
            $csv = array_slice($csv, 0, 12);
            $sql = 'INSERT INTO attacks VALUES(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)';
            $stmt = $connection->prepare($sql);
            $stmt->execute($csv);
            $line++;
           
            }
        }
        echo "Successfully inserted $line lines.";
        fclose($file);
   

}catch( PDOException $e ) {
   echo $e->getMessage();
}


?>