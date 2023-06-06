<?php
    session_start();

    if (empty($_SESSION['email']) ){
        $resp['status'] = true;
        $resp['redirect'] = "login.html";
        echo json_encode($resp);
    }else{
        $resp['status'] = false;
        echo json_encode($resp);
    }
?>