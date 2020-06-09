<?php

class cred {
    private $db_host;
    private $db_user;
    private $db_password;
    private $db_name;

    public function __construct(string $host, string $user, string $pass, string $name) {
        $this->db_host = $host;
        $this->db_user = $user;
        $this->db_password = $pass;
        $this->db_name = $name;
    }
    
    public function connect()
    {
        return new mysqli($this->db_host,$this->db_user,$this->db_password,$this->db_name);
    }
}

$DB_cred = new cred("localhost","root","","calendar");
// var_dump($DB_cred->connect());
?>