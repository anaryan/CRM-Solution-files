$( document ).ready(function() {
    
//     function myFunction() {
//   var popup = document.getElementById("myPopup");
//   popup.classList.toggle("show");
// }
//     // console.log("hey!");

    var myForm = document.getElementById("myForm");
   
    var bidChecklistForm = document.getElementById("bidChecklistForm");
   
  window.onclick = function(event) {
      
          if (event.target == myForm || event.target == bidChecklistForm) {
            myForm.style.display = "none";
            
            bidChecklistForm.style.display = "none";
            
         //   $('#EditView').show();
            
          }
    };
    
    openForm = function() {
    $("#myForm").css("display", "block");
  //  $('#EditView').hide();
  };

$(document).on('click', '#open_bidChecklist', function(){
  //console.log('bb');
   $("#bidChecklistForm").css("display", "block");
});
  
 
  

    
  
      
  //*****************************to delete column in cashflow template and bidchecklist template*********************
  $('#mtenth, #mcheckst').on('click', '.remove-column', function(){
      WRN_PROFILE_DELETE = "Are you sure you want to delete this column?";  
  		var check = confirm(WRN_PROFILE_DELETE);  
  		if(check == true){
  		  var table_id = $(this).closest('table').attr('id');
  			var head_position = $(this).closest('th').index();
  			$('#'+table_id+' tr').find('td:eq('+head_position+'),th:eq('+head_position+')').remove();
  		}
  });

  $('.add_rows_cls').click(function(){
    // console.log();
    var add_row_id = $(this).attr('id');
    // $('#m'+add_row_id).append($('#m'+add_row_id+' tbody tr:last').clone(true).find('input, textarea,select').val('').end());
    
    // $('#cash_out_flow').before($('#m'+add_row_id+'.addition:last').clone(true).find('input, textarea').val('').end());
    $('#m'+add_row_id).append($('#m'+add_row_id+' .addition:last').clone(true).find('input, textarea').val('').end());
    $('#m'+add_row_id+' .addition:last').find("td:eq(1)").text(Number($('#m'+add_row_id+' .addition:last').find("td:eq(1)").text()) + 1);
  });
  
  
  
  //*******************************/adding rows in bidchecklist form  ***********************************
  $('.add_rows_cls1').click(function(){
    // console.log();
    var add_row_id = $(this).attr('id');
    $('#m'+add_row_id).append($('#m'+add_row_id+' tbody tr:last').clone(true).find('input, textarea').val('').end());
      
    $('#m'+add_row_id+' tbody tr:last').find("td:eq(1)").text(Number($('#m'+add_row_id+' tbody tr:last').find("td:eq(1)").text()) + 1);
  });
  
  
  
  // *******************************************for adding the column in Bid Checklist*******************************
  $('.add_doc_col').click(function(){
      var add_column_id = $(this).attr('id');
      if($("[name='"+add_column_id+"']").val()){
          $('#m'+add_column_id+'t thead tr').append('<th><center>'+$("[name='"+add_column_id+"']").val()+'&nbsp &nbsp &nbsp <a class="remove-column pointer"><i class="glyphicon glyphicon-trash"></i></a></center></th>');
          $('#m'+add_column_id+'t tbody tr').each(function(){$(this).append($('<td width="150px"> <textarea rows="1" cols="30" class="for_info_popup txtarea" required="" name="Comments" type="text"></textarea></td>'))});
      }else{alert('Enter Column Name');}
  });
  
 
 
  
  //*********************************** delete rows function for cashflow and bid Checklist********************
 $('#mcheckst,#mtenth').on('click', '.remove-row', function(){
    var row_length =$(this).closest('table').find('tr').length;
    // console.log(row_length);
    var form_nam = $(this).closest('form').attr('name');
    if(form_nam == 'fc' ){
      min_row = 14;
    }else{
      min_row = 2;
    }
    if(row_length > min_row){
    	WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";  
    		var check = confirm(WRN_PROFILE_DELETE);
    		// $(this).closest('table').find('tr').length;
    		if(check == true){
    		  var row_index = $(this).closest('tr').index();
    			$(this).closest('table tbody').find("tr:gt("+row_index+")").each(function(){
    			   var prev_val = Number($(this).find("td:eq(1)").text());
    			   var new_value = prev_val - 1;
    			   $(this).find("td:eq(1)").text(new_value);
    			});
    		  var table_id =$(this).closest('table').attr('id');
    			if(table_id == 'mcost' || table_id == 'mtq'){
    			  var row_position = $(this).closest('tbody tr').index();
    			  max_marks_allocated = Number($('#'+table_id+' tbody tr:eq('+row_position+')').find('td:eq(5) input').val());
    			  var total_before_delete  = Number($('[name='+form_nam+'] .total_count').val());
    			  var total_after_delete = total_before_delete - max_marks_allocated;
    			  $('[name='+form_nam+'] .total_count').val(total_after_delete);
    			}
    			$(this).closest('tr').remove();
    		}
    }else{
      alert('Last row delete not allowed');
    }
  });
  
 //*********************************** delete rows function for cashflow and bid Checklist********************** 
  var startYear = 2010;
  var nextYear = 2011; 
  for (var i = 0; i < 50; i++) {
  startYear = startYear + 1;
  nextYear = nextYear + 1;
  $('#startYear').append(
    $('<option></option>').val(startYear + "-" + nextYear).html(startYear + "-" + nextYear)
     );
     
  $('#endYear').append(
    $('<option></option>').val(startYear + "-" + nextYear).html(startYear + "-" + nextYear)
     );   
  }

//***************************************************For Column Insert Cash Flow*********************************  
  $('#first_form').click(function(){
    var start_year=$('#startYear').val();
    var end_year=$('#endYear').val();
    var start_quarter=$('#start_quarter').val();
    var end_quarter=$('#end_quarter').val()
    
    if(start_year!=''&& start_quarter !=''&& end_quarter!=''&& end_year !=''){
      // console.log('as');
     
      var start_quarter_col;
      var end_quarter_col;
      
      if(start_quarter=='Q1'){
       start_quarter_col=4;
        
      }else if(start_quarter=='Q2'){
       start_quarter_col=3;
        
      
    }else if(start_quarter=='Q3'){
       start_quarter_col=2;
        
      }else{start_quarter_col=1;}
      
        if(end_quarter=='Q1'){
       end_quarter_col=1;
        
      }else if(end_quarter=='Q2'){
       end_quarter_col=2;
        
      
    }else if(end_quarter=='Q3'){
       end_quarter_col=3;
        
    }else{end_quarter_col=4;}
      
    var array_start_quater = start_quarter.split(/Q/);
    var start_quarter_no = Number(array_start_quater[1]);
    // console.log(start_quarter_no);
    
    var array_end_quater = end_quarter.split(/Q/);
    var end_quarter_no = Number(array_end_quater[1]);
    // console.log(start_end_no);
    
    var fields1= start_year.split(/-/);
    var start1 = fields1[0];
   
    
    var fields2=  end_year.split(/-/);
    var end2= fields2[1];
    // var end1= fields2[0];
    var inbtw=((end2-start1)-2)*4;
    
    var no_of_col=start_quarter_col+end_quarter_col+inbtw+1;
      
    // console.log(end_quarter_col,start_quarter_col,inbtw,no_of_col);
     
    for(var i=1; i<Number(no_of_col); i++) {
          
      $('#mtenth tbody tr,#mtenth tfoot tr').each(function(){
        $(this).append($(this).find("td:last").clone(true).find('input, textarea').val('').end());
      });
      
      
      $('#mtenth thead tr').each(function(){
        $(this).append($(this).find("th:last").clone(true).find('input, textarea').val('').end());
        // console.log($(this).text());
      });
    }
    
   //adding dynamic column------------------------
    var dynamic_column = ['','S No','Stage','Milestones','Type of Expenditure'];
    
    var i=Number(start1);
    var j = 1;
    // $('#mtenth thead tr th').each(function(index){
      // if(index > 4){
        for(i; i<Number(end2); i++) {
          if(i == Number(start1)){
            j = start_quarter_no;
          }
          for(j; j<=4; j++) {
            // console.log('Q'+j+' '+i+'-'+(i+1));
            dynamic_column.push('Q'+j+' '+i+'-'+(i+1));
            
            if(i==(Number(end2)-1) && j== end_quarter_no){
              console.log('enter');
              break;
            }
          }
          j = 1;
        }
      // }
    // });
      
      dynamic_column.push('Total');
      $('#mtenth thead tr th').each(function(index){
        $(this).text(dynamic_column[index]);
      });
      
       $('#mtenth tbody tr').each(function(){
        $(this).find('td:last-child input').attr('readonly',true);
    });
      
      console.log(dynamic_column);
      // -------------------------------------------------------------------
    }else{alert("fill all the fields")}
    
    
   });
  
 
        
  //***************************************************For Column Insert Cash Flow*********************************
   
   
     // $('#first_form').click(function(){
    //   var num = 4;                                       //$("#numYears").val();
    //   // console.log(num);
    //   while(num>=1){
    //   // var itm = document.getElementById("years").lastChild;
    //   //   var cln = itm.cloneNode(true);
    //   //   document.getElementById("years").appendChild(cln);
    //     // $("#years").clone().appendTo("#year_row");
    //     $("#years").append('<td>'+num+'</td>');
    //     num--;
    //   }
    // });
  
  
  // adding total and cumalitive total  logic==================================================================
  
  $('#mtenth').on('change', '.row_add', function(){
     var input_pos_rev = $(this).closest('td').index();
     var input_row_position = $(this).closest("tr").index();
     var count_row =0;
     var count_col = 0;
    // column total ------------------------------------------------
     $('#mtenth tbody tr').each(function(index){ 
      var column_input = Number($(this).find("td:eq("+input_pos_rev+") input").val());
      if(column_input == ''){
        column_input = 0;
      }
      count_col = count_col + column_input;
     });
     
  // console.log(count_col);
   $('#mtenth tfoot tr').find("td:eq("+input_pos_rev+") .total").val(count_col);
  // -----------------------------------------------------------------------------
  // row total ----------------------------------------------------------------------
   var td_length = Number($('#mtenth tbody tr:eq('+input_row_position+') td').length);
    $('#mtenth tbody tr:eq('+input_row_position+') td input').each(function(index){
      row_inputs= Number($(this).val());
      if(row_inputs == ''){
        row_inputs = 0;
      }
      if($(this).closest('td').index() != (td_length-1)){
         count_row = count_row + row_inputs;
      }
    });
    $('#mtenth tbody tr:eq('+input_row_position+') td:last-child input').val(count_row);
    //-----------------------------------------------------------------------------------
    
    // current cummalative total by adding prevoius cummaltive and current total -----------------------------------------------------
    if(input_pos_rev == 5){
       current_cum = count_col;
       $('#cum').find('td:eq('+input_pos_rev+') input').val(current_cum);
     }else{
       change_input_pos_for_cum = input_pos_rev - 1;
       var previous_cum = Number($('#cum').find('td:eq('+change_input_pos_for_cum+') input').val());
       if(previous_cum == ''){
        previous_cum = 0;
       }
       current_cum = count_col + previous_cum;
       $('#cum').find('td:eq('+input_pos_rev+') input').val(current_cum);
     }
     
    // --------------------------------------------------------------------------------------
     
    // total of row 'total' ----------------------------------------------------
    var row_total = 0;
    $('.total').each(function(index){
      current_total = Number($(this).val());
      if(current_total == ''){
        current_total = 0;
      }
      
      if($(this).closest('td').index() != (td_length-1)){
         row_total = row_total+current_total;
      }
    });
    $('#tot td:last-child input').val(row_total);
    // --------------------------------------------------------------------------------------
    
    // change cummalative total anywhere you change input-------------------------------
      
    var k;
    for (k = input_pos_rev; k < $('#mtenth th').length ; k++) {
      var curr_cum = Number($('#cum').find('td:eq('+k+') input').val());
      if(curr_cum == ''){
        curr_cum = 0;
      }
      var next_column_net_flow = Number($('#tot').find('td:eq('+(k+1)+') input').val());
       if(next_column_net_flow == ''){
        next_column_net_flow = 0;
       }
      next_column_cumulative = curr_cum + next_column_net_flow;
      $('#cum').find('td:eq('+(k+1)+') input').val(next_column_cumulative);
    }
    //--------------------------------------------------------------
    
    // ==============================================================================
    
  });
  
  // ==========================================================================================================
  
  
  
});
