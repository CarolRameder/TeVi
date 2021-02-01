<?php
	class CHome
	{	
		public function __construct($actiune, $parametri)
		{	
			
			if($actiune=="viewHome")
					
				{ 
				 $this->viewHome();
				}
			
			
		}

		private function viewHome()
		{

			$view=new VHome();
			
			$view-> oferaVizualizare();
		
		}

	}

?>