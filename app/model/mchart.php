<?php


class MChart{
    private $connection;
	private $filterArray = Array();

    public function __construct(){
        $this->connection = BD::obtine_conexiune();
    }

	public function getByCountry($country){
		$sql = 'Select * from attacks where country_txt = :country ';
		$request = $this->connection->prepare($sql);
		$request->execute([
			'country' => $country
		]);
	
		
        return $request->fetchAll();
	}
	/**
	 * the function searches and returns the data, in order to generate the chart considering the user's options
	 */
    public function getDistinctAndCount($queryData){
        
		$sql=$this->createQuery($queryData);
		$prepstmtArray = $this->createPrepareStatementArray($queryData);
        $request = $this->connection->prepare($sql);
        $request->execute($prepstmtArray);
        return $request->fetchAll();
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
	private function createQuery($array){
		$this->setFilterArray();
		$sql='SELECT ' . $array->column . ' as to_graph, COUNT( ? ) AS value FROM attacks ' . $this->filterArray[$array->column]; 
		$conditions="";
		foreach ($array as $i => $value) {
			if ($i != 'column' && $value != ''){
				
				if($i == 'iyear_l'){
					$conditions=$conditions." and iyear between ? ";
				}
				else if ($i == 'iyear_h'){
					$conditions=$conditions." and ? ";
				}
				else{
					$conditions=$conditions." AND $i = ? ";
				}
			}
		}
		
		return $sql.$conditions.'GROUP BY ' . $array->column;
	}

	/**
	 * the function filters the data 
	 */
	private function setFilterArray(){
		$this->filterArray['country_txt'] = " where country_txt in ('Peru', 'El Salvador', 'Colombia', 'United Kingdom', 'India', 'Turkey', 'Spain', 'Chile', 'Nicaragua', 'South Africa', 'Sri Lanka', 'Philippines', 'France', 'Guatemala', 'Lebanon', 'Italy', 'Israel', 'United States','Algeria', 'France', 'Egypt', 'Lebanon', 'Chile', 'Libya', 'Syria', 'Russia', 'Israel', 'Guatemala') ";
		$this->filterArray['weaptype1_txt'] = " where weaptype1_txt in ('Explosives', 'Firearms', 'Chemical', 'Incendiary', 'Melee', 'Unknown') ";
		$this->filterArray['iyear'] = " where iyear not in (-1)";
		$this->filterArray['attacktype1_txt'] = " where attacktype1_txt in ('Bombing/Explosion', 'Armed Assault', 'Assassination', 'Facility/Infrastructure Attack', 'Hostage Taking (Kidnapping)', 'Insurgency/Guerilla Action', 'Hostage Taking (Barricade Incident)', 'Unarmed Assault' , 'Hijacking' )";
		$this->filterArray['targtype1_txt'] = " where targtype1_txt in ('Private Citizens & Property', 'Business', 'Military', 'Government (General)', 'Police', 'Utilities', 'Transportation', 'Government (Diplomatic)', 'Journalists & Media', 'Educational Institution', 'Religious Figures/Institutions', 'Airports & Aircraft', 'Telecommunication', 'NGO', 'Tourists', 'Maritime' ) ";
		$this->filterArray['success'] = " where success in ('1', '0') ";
		$this->filterArray['suicide'] = " where success in ('1', '0') ";
	}
}
	