<?php

// controller for opportunity module in CRM

if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');

require_once('include/MVC/Controller/SugarController.php');

class OpportunitiesController extends SugarController
{
      public function action_sales_create_opportunity()
    {
      try{  
        global $current_user;
        // print_r($current_user);
        // die();
    	  $log_in_user_id = $current_user->id;
    // 	if($current_user->is_admin !=1){
    // 	    echo 'not admin';
    // 	}else{
    // 	     echo 'admin';
    // 	}
    // 	die();
    	  $db = \DBManagerFactory::getInstance();
        $GLOBALS['db'];
        // $user_id = $_POST[''];
        $sql = "SELECT users.id, users_cstm.teamfunction_c, users_cstm.mc_c, users_cstm.teamheirarchy_c FROM users INNER JOIN users_cstm ON users.id = users_cstm.id_c WHERE users_cstm.id_c = '".$log_in_user_id."' AND users.deleted = 0";
        $result = $GLOBALS['db']->query($sql);
        while($row = $GLOBALS['db']->fetchByAssoc($result)) 
        {
            $check_sales = $row['teamfunction_c'];
            $check_mc = $row['mc_c'];
            $check_team_lead = $row['teamheirarchy_c'];
            
        }
        // $fields = unencodeMultienum($this->bean->report_vars);
        $team_func_array = explode(',', $check_sales);
        if(in_array("^sales^", $team_func_array) || $current_user->is_admin ==1 || $check_mc =="yes" || $check_team_lead =="teamLead" ) {
        // if(in_array("$team_func_array !== 'sales')){
            $can_create = 'yes';
        } else {
            $can_create = 'no';
        }
        
        
        echo json_encode(array("status"=> true, 'view'=>$can_create));
        
      } catch(Exception $e) {
          echo json_encode(array("status"=>false, "message"=>"some error occured"));
      }
      die();
    }
    
    public function action_cashflow_popup()
    {
        
    }

   
//   public function action_sector() 
//   {
         
//       //echo 'hello';
//      try{
//          $db = \DBManagerFactory::getInstance();
//         	$GLOBALS['db'];
        	
//         	$sql='SELECT * FROM sector';
        
//         $result = $GLOBALS['db']->query($sql);
        
//       if($result->num_rows > 0){
//                 foreach ($result as $sector) {
//                   echo '<option value='.$sector["name"].'>' .$sector["name"]. '</option>';
//                 }
//                   }
//      }catch(Exception $e){
//     		echo json_encode(array("status"=>false, "message" => "Some error occured"));
//     	}
// 		die();
//   }
   
//   public function action_subSector() 
//   {
         
//         if(isset($_POST['sector_id']))
// {
//     $sector = $_POST['sector_id'];
   
// }
//          try{
//         $db = \DBManagerFactory::getInstance();
//         	$GLOBALS['db'];
        	
//         	$sql='SELECT sub_sector.name,sector_id FROM  sub_sector INNER JOIN sector ON sub_sector.sector_id=sector.id WHERE sector.name="'.$sector.'"';
        
//         $result = $GLOBALS['db']->query($sql);
        
//       if($result->num_rows > 0){
//                 foreach ($result as $subSector) {
//                   echo '<option value='.$subSector["name"].'>' .$subSector["name"]. '</option>';
//                 }
//                   }
//          }catch(Exception $e){
//     		echo json_encode(array("status"=>false, "message" => "Some error occured"));
//     	}
// 		die();
        
//   }
  
  public function action_sector() 
  {
         
      //echo 'hello';
     try{
         $db = \DBManagerFactory::getInstance();
        	$GLOBALS['db'];
        	
        	$sql='SELECT * FROM sector';
        
        $result = $GLOBALS['db']->query($sql);
        
        $sector_list = array();
       
      while ($row = mysqli_fetch_assoc($result)) {
      // $sector_list=$row["name"];
      // echo $name;
      $sector_list[]=$row;
       
    }
   echo json_encode( $sector_list);
        
      // if($result->num_rows > 0){
      //           foreach ($result as $sector) {
      //             echo '<option value='.$sector["name"].'>' .$sector["name"]. '</option>';
      //             // array_push($sector_list,$sector["name"]);
      //           }
      //             }
                  
          // echo json_encode(array("status"=>true,"sector_list"=>$sector_list));
          // echo $sector_list;
     }catch(Exception $e){
    		echo json_encode(array("status"=>false, "message" => "Some error occured"));
    	}
		die();
  }
   
  public function action_subSector() 
  {
         
        if(isset($_POST['sector_name']))
{
    $sector = $_POST['sector_name'];
   
}
         try{
        $db = \DBManagerFactory::getInstance();
        	$GLOBALS['db'];
        	
        	$sql='SELECT sub_sector.name,sector_id FROM  sub_sector INNER JOIN sector ON sub_sector.sector_id=sector.id WHERE sector.name="'.$sector.'"';
        
        $result = $GLOBALS['db']->query($sql);
        
        $subSector_list = array();
        $status = array(status=>true);
       
      while ($row = mysqli_fetch_assoc($result)) {
      // $sector_list=$row["name"];
      // echo $name;
      $subSector_list[]=$row;
       
    }
   echo json_encode($subSector_list);
      // if($result->num_rows > 0){
      //           foreach ($result as $subSector) {
      //             echo '<option value='.$subSector["name"].'>' .$subSector["name"]. '</option>';
      //           }
      //             }
         }catch(Exception $e){
    		echo json_encode(array("status"=>false, "message" => "Some error occured"));
    	}
		die();
        
  }

public function action_segment(){
     try{
         $db = \DBManagerFactory::getInstance();
        	$GLOBALS['db'];
        	
        	$sql='SELECT * FROM segment';
        
        $result = $GLOBALS['db']->query($sql);
        
        $segment_list = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
     
      $segment_list[]=$row;
       
    }
   echo json_encode($segment_list);
        
    //   if($result->num_rows > 0){
    //             foreach ($result as $segment) {
    //               echo '<option value='.$segment["segment_name"].'>' .$segment["segment_name"]. '</option>';
    //             }
    //               }
     }catch(Exception $e){
    		echo json_encode(array("status"=>false, "message" => "Some error occured"));
    	}
		die();
}

public function action_productService() 
  {
         
     
    if(isset($_POST['segment_name']))
{
    $segment = $_POST['segment_name'];
   
}
         try{
        $db = \DBManagerFactory::getInstance();
        	$GLOBALS['db'];
        	
        	$sql='SELECT service.service_name, segment.id FROM service INNER JOIN segment ON service.segment_id= segment.id where segment.segment_name="'.$segment.'"';
        
        $result = $GLOBALS['db']->query($sql);
        
        $service_list =array();
        
        while ($row = mysqli_fetch_assoc($result)) {
      // $sector_list=$row["name"];
      // echo $name;
      $service_list[]=$row;
       
    }
   echo json_encode($service_list);
        
    //   if($result->num_rows > 0){
    //             foreach ($result as $service) {
    //               echo '<option value='.$service["service_name"].'>' .$service["service_name"]. '</option>';
    //             }
    //               }
         }catch(Exception $e){
    		echo json_encode(array("status"=>false, "message" => "Some error occured"));
    	}
		die();
        
  }

public function action_stateList(){
     try{
         $db = \DBManagerFactory::getInstance();
        	$GLOBALS['db'];
        	
        	$sql='SELECT * FROM `states` WHERE country_id=101';
        
        $result = $GLOBALS['db']->query($sql);
        
        $state_list = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
     
      $state_list[]=$row;
       
    }
   echo json_encode($state_list);
        
   
     }catch(Exception $e){
    		echo json_encode(array("status"=>false, "message" => "Some error occured"));
    	}
		die();
}
  
    // public function action_editview(){
    //     // if (array_key_exists(“record”,$_REQUEST)) // Check whether the record key is available in the request. For new records the key is not present
    //     // {
    //         $this->view = 'edit'; //If the record key exists then record can be edited
    //     // }
    //     // else
    //     // {
    //         // $this->view = 'noacesss'; // if the record key is not available that means u cannot create a new record AND it displays a blank page.
    //     // }
    // }
    
}
?>
