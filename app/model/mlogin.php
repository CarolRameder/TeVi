<?php


	class MLogIn
	{
		/**
		 * the function searches for a specific user in the data base in order to complete the login process.
		 */
		public function searchUser($user, $password)
		{
		 	$sql='SELECT id, hash, name FROM tusers where user like :user AND password like :password ';
		 	$response = array();
			$cerere=BD::obtine_conexiune()->prepare($sql);
			$cerere->execute(["user"=> $user, "password"=> $password ]);
			$msg= $cerere->fetchAll();
			if($msg == null){
				
				$response['userFound'] = false;
			}
			else{
				setcookie("authHash", $msg[0]['hash'], 0 , "/");
				setcookie("name", $msg[0]['name'], 0 , "/" );
				$response['userFound'] = true;
				$response['name'] = $msg[0]['name'];
			}
			return $response;
			
			
			
			
		}

		private function isUsernameUnique($username){
			$sql = "Select user from tusers where user = :username";
			$request = BD::obtine_conexiune()->prepare($sql);
			$request->execute([
				'username'=>$username
			]);
			
			if ($request->fetchAll() == null){
				return true;
			}
			return false;
		}

		/**
		 * the function inserts a new user in the database, generating him an user hash
		 */
		public function insertUser($name, $user, $password)
		{
			if($this->isUsernameUnique($user)){
				$userHash = hash('md5', $user);
				
				$sql="INSERT INTO tusers(name,user,password,hash) VALUES(:name, :user,:password,:hash)";
				$cerere=BD::obtine_conexiune()->prepare($sql);
				$cerere-> execute([
					'name'=> $name,
					'user'=> $user,
					'password'=>$password,
					'hash'=>$userHash
				]);
				return true;
			}
			return false;
		}
		

	

	}


?>