<?php

class MAdmin{

    public function __construct(){
        $this->connection = BD::obtine_conexiune();
    }

    //insert Attack
    public function insertAtt($json){
        $sql = 'INSERT INTO attacks(iyear,imonth,iday,country_txt,city,latitude,longitude,success,suicide,attacktype1_txt,targtype1_txt,weaptype1_txt) VALUES(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)';
        
        $array=array();
        $i=0;
        foreach ($json as $key => $value) {
            if ($key == 'latitude' || $key == 'longitude'){
                $array[$i]=floatval($value);
            }
            else if($key == 'year'){
                $array[$i] = intval($value);
            }
            else{
                $array[$i]=$value;
            }
                
                $i=$i+1;
        }
        $stmt = $this->connection->prepare($sql);
        $resp = $stmt->execute($array);
        echo $resp;
        if ($resp == 1){
            return true;
        }
        return false;
       
    }

    //update attack
    public function updateAttack($json){
        $sql = 'update attacks set iyear = ?, imonth = ?, iday = ?, country_txt = ?, city = ?, latitude = ?, longitude = ?, success = ?, suicide = ?, attacktype1_txt = ?, targtype1_txt = ?, weaptype1_txt = ? where id = ?' ;
        $request = $this->connection->prepare($sql);

        $index = 0;
        $prepStmtArray = Array();
        foreach($json as $key => $value){
            if($key != 'id'){
                $prepStmtArray[$index] = $value;
                $index += 1;
            }
        }
        $prepStmtArray[$index] = $json->id;
        $request->execute($prepStmtArray);
        if($request->rowCount() == 1){
            return true;
        }
        return false;

    }
    //delete Attack
    public function deleteAtt($id){
        $sql = 'Delete from attacks where id = :id' ;
        $request = $this->connection->prepare($sql);
        $request->execute([
            'id' => $id
        ]);
        if($request->rowCount() == 1){
            return true;
        }
        return false;
        
    }
    //verificat-----------------------------------------------


    //delete User
    public function deleteUser($user){
        $sql = 'Delete from tusers where user = :user' ;
        $request = $this->connection->prepare($sql);
        $request->execute([
            'user' => $user
        ]);
        if($request->rowCount() == 1){
            return true;
        }
        return false;
    }

    //operate user
    public function operateUser($json){
        if($json->isAdmin == '1'){
            $sql = 'UPDATE tusers SET isAdmin = 1 WHERE user = :user' ;
        }
        else {
               $sql = 'UPDATE tusers SET isAdmin = 0 WHERE user = :user' ;
        }
        $request = $this->connection->prepare($sql);
        $request->execute([
            'user' => $json->user
        ]);
        if($request->rowCount() == 1){
            return true;
        }
        return false;
    }

    public function getAttackById($id){
        $sql = 'Select * from attacks where id = :id' ;
        $request = $this->connection->prepare($sql);
        $request->execute([
            'id' => $id
        ]);
        return $request->fetchAll();
    }

    public function isUserAdmin($authHash){
        $sql = 'Select isAdmin from tusers where hash = :hash' ;
        $request = $this->connection->prepare($sql);
        $request->execute([
            'hash' => $authHash
        ]);
        $raw_data = $request->fetchAll();
        if($raw_data[0]['isAdmin'] == '1'){
           return true;
        }
        return false;

      

    }


}
