<?php


class MMap{

    private $connection;

    public function __construct(){
        $this->connection = BD::obtine_conexiune();
    }


	/**
	 * the function searches and returns the data, in order to generate the map considering the user's options
	 */
    public function searchData($array){
		 //$sql='SELECT DISTINCT country_txt, latitude, longitude FROM attacks';
			$sql= $this->createQuery($array);
			$prepStmtArray = $this->createPrepareStatementArray($array);
			$cerere=BD::obtine_conexiune()->prepare($sql);
			$cerere->execute($prepStmtArray);
			$msg= $cerere->fetchAll();
			if($msg==NULL)
				return 0;
            
			return $msg;

	}
	
	private function createPrepareStatementArray($data){
		$array = array();
		$i = 0;
		foreach($data as $key => $value){
				if($value != ''){
					$array[$i] = $value;
					$i += 1;
				}
			}

		
		return $array;
	}

	/**
	 * the function creates the query, given the specific conditions
	 */
    public function createQuery($array){
		
		$sqll='SELECT country_txt, latitude, longitude  FROM attacks '; 
		$conditions="";
		$firstCondition=1;
		foreach ($array as $i => $value) {
			if ( $value != ''){
				if($firstCondition==1)
				{																
					if($i == 'iyear_l'){
						$conditions=$conditions."   WHERE iyear BETWEEN ? ";
					}
					else{
						$conditions=$conditions." WHERE $i = ? ";
					}
				
					$firstCondition=0;
				}
				else{
					
					if($i == 'iyear_l'){
						$conditions=$conditions." AND iyear BETWEEN ? ";
					}
					else if ($i == 'iyear_h'){
						$conditions=$conditions." AND ? ";
					}
					else{
						$conditions=$conditions." AND $i = ? ";
					}
				}
			}
		}
		return $sqll.$conditions;
	}

}