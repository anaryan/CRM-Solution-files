
$(document).ready(function () {
  console.log('custom.js');
  
  
   
    $(".pagination").hide();
    $("#btn_view_change_log").remove();
    $('#btn_view_change_log').remove();
    
    //required * after label
     $("[data-label=LBL_OPPORTUNITY_NAME],[data-label=LBL_STATE],[data-label=LBL_SOURCE],[data-label=LBL_NON_FINANCIAL_CONSIDERATION]").append(
           '<span class="required">*</span>'
          ); 
    
    $("[data-label=LBL_TYPE],[data-label=LBL_FINANCIAL_FEASIBILITY_L1]").append(
           '<span class="required">*</span>'
          ); 
    
    
  $('#financial_feasibility_l1_c').replaceWith('<button type="button" class="button" id="financial_feasibility_l1_c">Add L1 Details</button>');
  
  $('#financial_feasibility_l2_c').replaceWith('<button type="button" class="button" id="financial_feasibility_l2_c">Add L2 Details</button>');
  
  $('#financial_feasibility_l3_c').replaceWith('<button type="button" class="button" id="financial_feasibility_l3_c">Add L3 Details</button>');
  
  $("#bid_checklist_c").replaceWith('<button type="button" class="button" id="bid_checklist_c">Add Bid Checklist</button>');
    $("#bid_checklist_c").on('click',function(){
   //  console.log("checklist");
     $(".open_bidChecklist").trigger('click');
   });
   
   
  $("#cash_flow_c").replaceWith('<button type="button" class="button" id="cash_flow_c">Add Cash Flow</button>');
  
   $("#cash_flow_c").on('click',function(){
    // console.log("Hi there!");
     $(".open-button").trigger('click');
   });
  //dropdown for sector
    var selected_sector = $("#sector_c").val();
    
    $("#sector_c").replaceWith('<select name="sector_c" id="sector_c" onchange="sectorFunction(this.value)"></select>');
  
  $.ajax({
    url : 'index.php?module=Opportunities&action=sector',
        type : 'GET',
        success : function(all_sector_list){
          if(selected_sector == ""){
            var list = '<option value=""></option><option value="">Select Sector</option> +'; 
          }else{
                    var list = '<option value="'+selected_sector+'">'+selected_sector+'</option> +';
                }
            
            all_sector_list=JSON.parse(all_sector_list);
            all_sector_list.forEach((sector)=>{
              if(sector.name != selected_sector){
                list+='<option value="'+sector.name+'">'+sector.name+'</option>';
              }
            })
            $("#sector_c").html(list);
        }
});
  
  //Dependable dropdown according to sector selection
  
  var selected_subSector = $("#sub_sector_c").val();
  $("#sub_sector_c").replaceWith('<select name="sub_sector_c" id="sub_sector_c"></select>');

    if(selected_subSector !== ""){
      $.ajax({
      type: "POST",
      url:
        "index.php?module=Opportunities&action=subSector",
      data: { sector_name:selected_sector },
      success: function (data) {
            var list = '<option value="'+selected_subSector+'">'+selected_subSector+'</option> +';
          data=JSON.parse(data);
            data.forEach((subSector)=>{
              if(subSector.name != selected_subSector){
                list+='<option value="'+subSector.name+'">'+subSector.name+'</option>';
              }
            });
            $("#sub_sector_c").html(list);
      },
    });
    }
    
   
  
  //onchange sector 
  
  sectorFunction = function(sector){
    $.ajax({
      type: "POST",
     url:
        "index.php?module=Opportunities&action=subSector",
      data: { sector_name:sector },
      success: function (data) {
       
          // $("#sub_sector1_c").append(data);
         $("#sub_sector_c").replaceWith('<select name="sub_sector_c" id="sub_sector_c"></select>');
             var list = '<option value="">Select subSector</option> +';
          
          data=JSON.parse(data);
            data.forEach((subSector)=>{
            
                list+='<option value="'+subSector.name+'">'+subSector.name+'</option>';
              
            });
            $("#sub_sector_c").html(list);
      },
    });
  }

//segment dropdown
    var selected_segment = $("#segment_c").val();
    
    $("#segment_c").replaceWith('<select name="segment_c" id="segment_c" onchange="segmentFunction(this.value)"></select>');
  
  $.ajax({
    url : 'index.php?module=Opportunities&action=segment',
        type : 'GET',
        success : function(all_segment_list){
          if(selected_segment == ""){
            var list = '<option value=""></option><option value="">Select Segment</option> +'; 
          }else{
                    var list = '<option value="'+selected_segment+'">'+selected_segment+'</option> +';
                }
            
            all_segment_list=JSON.parse(all_segment_list);
            all_segment_list.forEach((segment)=>{
              if(segment.segment_name != selected_segment){
                list+='<option value="'+segment.segment_name+'">'+segment.segment_name+'</option>';
              }
            });
            $("#segment_c").html(list);
        }
});

//sevrice dropdown
 var selected_service = $("#product_service_c").val();
  $("#product_service_c").replaceWith('<select name="product_service_c" id="product_service_c"></select>');

    if(selected_service != ""){
      $.ajax({
      type: "POST",
      url:
        "index.php?module=Opportunities&action=productService",
      data: { segment_name:selected_segment },
      success: function (data) {
            var list = '<option value="'+selected_service+'">'+selected_service+'</option> +';
          data=JSON.parse(data);
            data.forEach((service)=>{
              if(service.service_name != selected_service){
                list+='<option value="'+service.service_name+'">'+service.service_name+'</option>';
              }
            });
            $("#product_service_c").html(list);
      },
    });
    }
    
   
  
  //onchange segment
  
  segmentFunction = function(segment){
    $.ajax({
      type: "POST",
     url:
        "index.php?module=Opportunities&action=productService",
      data: { segment_name:segment },
      success: function (data) {
         $("#product_service_c").replaceWith('<select name="product_service_c" id="product_service_c"></select>');
             var list = '<option value="">Select Product/Service</option> +';
          
          data=JSON.parse(data);
            data.forEach((service)=>{
                list+='<option value="'+service.service_name+'">'+service.service_name+'</option>';
              
            });
            $("#product_service_c").html(list);
      },
    });
  }
  
  
  
              
     $("#filename_file").attr("disabled",true);          
    $("#applyfor_c").attr("disabled",true);
    
    
  //if nothing  is selected
  if ( $("#rfporeoipublished_c").val()=='select'){
    console.log('in')
        $("#detailpanel_0").hide();
        $("#detailpanel_1").hide();
        $("#detailpanel_2").hide();
        $("#detailpanel_3").hide();
        $("#detailpanel_4").hide();
        $("#detailpanel_5").hide();
        $("#detailpanel_6").hide();
        
  }
  
  
  if($("#rfporeoipublished_c").val()=="no"){
    $("#filename_file").attr("disabled",true);     
              // document.getElementById("source_details_c").requi#f59542;
              // $("input").prop('required',true);
              $("#detailpanel_0").show() ;
              $("#detailpanel_1").show() ;
              $("#detailpanel_2").hide();
              $("#detailpanel_3").hide() ;
              $("#detailpanel_4").hide() ;
              $("#detailpanel_5").hide() ;
              $("#detailpanel_6").hide() ;
              $("#detailpanel_7").hide() ;
              $("#financial_feasibility_l1_c").attr("disabled",false);
              $("#budget_source_c").attr("disabled",true);
              $("#budget_head_c").attr("disabled",true);
              $("#budget_head_amount_c").attr("disabled",true);
              $("#project_implementation_start_c").attr("disabled",true);
              $("#project_implementation_end_c").attr("disabled",true);
              $("#budget_allocated_oppertunity_c").attr("disabled",true);
              $("#financial_feasibility_l2_c").attr("disabled",true);
              $("#financial_feasibility_l3_c").attr("disabled",true);
              $("#cash_flow_c").attr("disabled",true);
              $("#project_implementation_start_c_trigger").attr("disabled",true);
              $("#project_implementation_end_c_trigger").attr("disabled",true);
              $("#status_c").val("Lead");
              $("#applyfor_c").val('qualifylead');
  }
  
  
  if ( $("#rfporeoipublished_c").val()=='yes'){
    $("#detailpanel_0").show() ;
                $("#detailpanel_1").show() ;
                $("#detailpanel_2").show() ;
                $("#detailpanel_3").show() ;
                $("#detailpanel_4").show() ;
                $("#detailpanel_5").show() ;
                $("#detailpanel_6").show() ;
                $("#budget_source_c").attr("disabled",false);
                 $("#filename_file").attr("disabled",false);
              $("#budget_head_c").attr("disabled",false);
              $("#budget_head_amount_c").attr("disabled",false);
              $("#project_implementation_start_c").attr("disabled",false);
              $("#project_implementation_end_c").attr("disabled",false);
              $("#budget_allocated_oppertunity_c").attr("disabled",false);
              $("#financial_feasibility_l2_c").attr("disabled",false);
              $("#financial_feasibility_l3_c").attr("disabled",false);
              $("#cash_flow_c").attr("disabled",false);
              $("#project_implementation_start_c_trigger").attr("disabled",false);
              $("#project_implementation_end_c_trigger").attr("disabled",false);
              $("#status_c").val("QualifiedDpr");
              $("#applyfor_c").val('qualifyBid');
               
               if ($("[data-label=LBL_FILENAME] span").text() == "") {
             $("[data-label=LBL_FILENAME]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_SOURCE] span").text() == "") {
             $("[data-label=LBL_BUDGET_SOURCE]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_HEAD] span").text() == "") {
             $("[data-label=LBL_BUDGET_HEAD]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_HEAD_AMOUNT] span").text() == "") {
             $("[data-label=LBL_BUDGET_HEAD_AMOUNT]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_ALLOCATED_OPPERTUNITY] span").text() == "") {
             $("[data-label=LBL_BUDGET_ALLOCATED_OPPERTUNITY]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_PROJECT_IMPLEMENTATION_START] span").text() == "") {
             $("[data-label=LBL_PROJECT_IMPLEMENTATION_START]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_PROJECT_IMPLEMENTATION_END] span").text() == "") {
             $("[data-label=LBL_PROJECT_IMPLEMENTATION_END]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_FINANCIAL_FEASIBILITY_L2] span").text() == "") {
             $("[data-label=LBL_FINANCIAL_FEASIBILITY_L2]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_FINANCIAL_FEASIBILITY_L3] span").text() == "") {
             $("[data-label=LBL_FINANCIAL_FEASIBILITY_L3]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_CASH_FLOW] span").text() == "") {
             $("[data-label=LBL_CASH_FLOW]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               
                if ($("[data-label=LBL_FIRST_OF_A_KIND_SEGMENT] span").text() == "") {
             $("[data-label=LBL_FIRST_OF_A_KIND_SEGMENT]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_FIRST_OF_A_KIND_PRODUCT] span").text() == "") {
             $("[data-label=LBL_FIRST_OF_A_KIND_PRODUCT]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_SECTOR] span").text() == "") {
             $("[data-label=LBL_SECTOR]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_SUB_SECTOR] span").text() == "") {
             $("[data-label=LBL_SUB_SECTOR]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
              
               if ($("[data-label=LBL_SEGMENT] span").text() == "") {
             $("[data-label=LBL_SEGMENT]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_PRODUCT_SERVICE] span").text() == "") {
             $("[data-label=LBL_PRODUCT_SERVICE]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_ADD_NEW_SEGMENT] span").text() == "") {
             $("[data-label=LBL_ADD_NEW_SEGMENT]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_ADD_NEW_PRODUCT_SERVICE] span").text() == "") {
             $("[data-label=LBL_ADD_NEW_PRODUCT_SERVICE]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
               if ($("[data-label=LBL_SELECTION] span").text() == "") {
             $("[data-label=LBL_SELECTION]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_FUNDING] span").text() == "") {
             $("[data-label=LBL_FUNDING]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_TIMING_BUTTON] span").text() == "") {
             $("[data-label=LBL_TIMING_BUTTON]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
               
          
          //adding asterisk to financial tab
          if ($("[data-label=LBL_SCOPE_BUDGET_PROJECTED] span").text() == "") {
             $("[data-label=LBL_SCOPE_BUDGET_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_PROJECTED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_PUBLISHED_PROJECTED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_PUBLISHED_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_WORK_ORDER_PROJECTED] span").text() == "") {
             $("[data-label=LBL_WORK_ORDER_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
              if ($("[data-label=LBL_SCOPE_BUDGET_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_SCOPE_BUDGET_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_RFP_EOI_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_PUBLISHED_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_PUBLISHED_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_WORK_ORDER_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_WORK_ORDER_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
         
          
          //adding asterisk to influencer tab
           if ($("[data-label=LBL_INFLUENCERSL1] span").text() == "") {
             $("[data-label=LBL_INFLUENCERSL1]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_INFLUENCERSL2] span").text() == "") {
             $("[data-label=LBL_INFLUENCERSL2]").append(
              "<span style='color:red;'>*</span>"
              );
               }
       
          //adding asterisk to bid tab
           if ($("[data-label=LBL_BID_STRATEGY] span").text() == "") {
             $("[data-label=LBL_BID_STRATEGY]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_SUBMISSIONSTATUS] span").text() == "") {
             $("[data-label=LBL_SUBMISSIONSTATUS]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_SUMMARY] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_SUMMARY]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_BID_CHECKLIST] span").text() == "") {
             $("[data-label=LBL_BID_CHECKLIST]").append(
              "<span style='color:red;'>*</span>"
              );
               }
  }
  
  //Change function for RFP/EOI change in dropdown
  
    $("#rfporeoipublished_c").on("change", function () {
       
       
      var x=$("#rfporeoipublished_c").val();
      
      switch (x){
        
        case "yes":
                $("#detailpanel_0").show() ;
                $("#detailpanel_1").show() ;
                $("#detailpanel_2").show() ;
                $("#detailpanel_3").show() ;
                $("#detailpanel_4").show() ;
                $("#detailpanel_5").show() ;
                $("#detailpanel_6").show() ;
                $("#budget_source_c").attr("disabled",false);
                 $("#filename_file").attr("disabled",false);
              $("#budget_head_c").attr("disabled",false);
              $("#budget_head_amount_c").attr("disabled",false);
              $("#project_implementation_start_c").attr("disabled",false);
              $("#project_implementation_end_c").attr("disabled",false);
              $("#budget_allocated_oppertunity_c").attr("disabled",false);
              $("#financial_feasibility_l2_c").attr("disabled",false);
              $("#financial_feasibility_l3_c").attr("disabled",false);
              $("#cash_flow_c").attr("disabled",false);
              $("#project_implementation_start_c_trigger").attr("disabled",false);
              $("#project_implementation_end_c_trigger").attr("disabled",false);
              $("#status_c").val("QualifiedDpr");
              $("#applyfor_c").val('qualifyBid');
               
               if ($("[data-label=LBL_FILENAME] span").text() == "") {
             $("[data-label=LBL_FILENAME]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_SOURCE] span").text() == "") {
             $("[data-label=LBL_BUDGET_SOURCE]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_HEAD] span").text() == "") {
             $("[data-label=LBL_BUDGET_HEAD]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_HEAD_AMOUNT] span").text() == "") {
             $("[data-label=LBL_BUDGET_HEAD_AMOUNT]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_BUDGET_ALLOCATED_OPPERTUNITY] span").text() == "") {
             $("[data-label=LBL_BUDGET_ALLOCATED_OPPERTUNITY]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_PROJECT_IMPLEMENTATION_START] span").text() == "") {
             $("[data-label=LBL_PROJECT_IMPLEMENTATION_START]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_PROJECT_IMPLEMENTATION_END] span").text() == "") {
             $("[data-label=LBL_PROJECT_IMPLEMENTATION_END]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_FINANCIAL_FEASIBILITY_L2] span").text() == "") {
             $("[data-label=LBL_FINANCIAL_FEASIBILITY_L2]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_FINANCIAL_FEASIBILITY_L3] span").text() == "") {
             $("[data-label=LBL_FINANCIAL_FEASIBILITY_L3]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_CASH_FLOW] span").text() == "") {
             $("[data-label=LBL_CASH_FLOW]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               
                if ($("[data-label=LBL_FIRST_OF_A_KIND_SEGMENT] span").text() == "") {
             $("[data-label=LBL_FIRST_OF_A_KIND_SEGMENT]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_FIRST_OF_A_KIND_PRODUCT] span").text() == "") {
             $("[data-label=LBL_FIRST_OF_A_KIND_PRODUCT]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_SECTOR] span").text() == "") {
             $("[data-label=LBL_SECTOR]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_SUB_SECTOR] span").text() == "") {
             $("[data-label=LBL_SUB_SECTOR]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
              
               if ($("[data-label=LBL_SEGMENT] span").text() == "") {
             $("[data-label=LBL_SEGMENT]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_PRODUCT_SERVICE] span").text() == "") {
             $("[data-label=LBL_PRODUCT_SERVICE]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_ADD_NEW_SEGMENT] span").text() == "") {
             $("[data-label=LBL_ADD_NEW_SEGMENT]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_ADD_NEW_PRODUCT_SERVICE] span").text() == "") {
             $("[data-label=LBL_ADD_NEW_PRODUCT_SERVICE]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
               if ($("[data-label=LBL_SELECTION] span").text() == "") {
             $("[data-label=LBL_SELECTION]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_FUNDING] span").text() == "") {
             $("[data-label=LBL_FUNDING]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
                if ($("[data-label=LBL_TIMING_BUTTON] span").text() == "") {
             $("[data-label=LBL_TIMING_BUTTON]").append(
              "<span style='color:red;'>*</span>"
              );
               } 
               
               
          
          //adding asterisk to financial tab
          if ($("[data-label=LBL_SCOPE_BUDGET_PROJECTED] span").text() == "") {
             $("[data-label=LBL_SCOPE_BUDGET_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_PROJECTED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_PUBLISHED_PROJECTED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_PUBLISHED_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_WORK_ORDER_PROJECTED] span").text() == "") {
             $("[data-label=LBL_WORK_ORDER_PROJECTED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
              if ($("[data-label=LBL_SCOPE_BUDGET_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_SCOPE_BUDGET_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
                if ($("[data-label=LBL_RFP_EOI_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_PUBLISHED_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_PUBLISHED_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_WORK_ORDER_ACHIEVED] span").text() == "") {
             $("[data-label=LBL_WORK_ORDER_ACHIEVED]").append(
              "<span style='color:red;'>*</span>"
              );
               }
         
          
          //adding asterisk to influencer tab
           if ($("[data-label=LBL_INFLUENCERSL1] span").text() == "") {
             $("[data-label=LBL_INFLUENCERSL1]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_INFLUENCERSL2] span").text() == "") {
             $("[data-label=LBL_INFLUENCERSL2]").append(
              "<span style='color:red;'>*</span>"
              );
               }
       
          //adding asterisk to bid tab
           if ($("[data-label=LBL_BID_STRATEGY] span").text() == "") {
             $("[data-label=LBL_BID_STRATEGY]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_SUBMISSIONSTATUS] span").text() == "") {
             $("[data-label=LBL_SUBMISSIONSTATUS]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_RFP_EOI_SUMMARY] span").text() == "") {
             $("[data-label=LBL_RFP_EOI_SUMMARY]").append(
              "<span style='color:red;'>*</span>"
              );
               }
               
               if ($("[data-label=LBL_BID_CHECKLIST] span").text() == "") {
             $("[data-label=LBL_BID_CHECKLIST]").append(
              "<span style='color:red;'>*</span>"
              );
               }
              
          
               break;
              
        
          
          case "no":
           
            $("#filename_file").attr("disabled",true);     
              // document.getElementById("source_details_c").requi#f59542;
              // $("input").prop('required',true);
              $("#detailpanel_0").show() ;
              $("#detailpanel_1").show() ;
              $("#detailpanel_2").hide();
              $("#detailpanel_3").hide() ;
              $("#detailpanel_4").hide() ;
              $("#detailpanel_5").hide() ;
              $("#detailpanel_6").hide() ;
              $("#detailpanel_7").hide() ;
              $("#financial_feasibility_l1_c").attr("disabled",false);
              $("#budget_source_c").attr("disabled",true);
              $("#budget_head_c").attr("disabled",true);
              $("#budget_head_amount_c").attr("disabled",true);
              $("#project_implementation_start_c").attr("disabled",true);
              $("#project_implementation_end_c").attr("disabled",true);
              $("#budget_allocated_oppertunity_c").attr("disabled",true);
              $("#financial_feasibility_l2_c").attr("disabled",true);
              $("#financial_feasibility_l3_c").attr("disabled",true);
              $("#cash_flow_c").attr("disabled",true);
              $("#project_implementation_start_c_trigger").attr("disabled",true);
              $("#project_implementation_end_c_trigger").attr("disabled",true);
              $("#status_c").val("Lead");
              $("#applyfor_c").val('qualifylead');
            
        break;
        
            case "select":
              $("#filename_file").attr("disabled",true);     
              $("#detailpanel_0").hide() ;
              $("#detailpanel_1").hide() ;
              $("#detailpanel_2").hide() ;
              $("#detailpanel_3").hide() ;
              $("#detailpanel_4").hide() ;
              $("#detailpanel_5").hide() ;
              $("#detailpanel_6").hide() ;
              $("#detailpanel_7").hide() ;
               $("#status_c").val("Lead");
              $("#applyfor_c").val('qualifylead');
            
            break;
        
      }
       
    });
    
     // status change and apply for changes
      
     $("#status_c").on("change", function () {
       
       
      var s=$("#status_c").val();
      
      $("#applyfor_c").val();
      
      switch (s){
        
        case "Lead":
        
         $("#applyfor_c").val('qualifylead');
        
        break;
        
        case "QualifiedLead":
          
          $("#applyfor_c").val('qualifyOpportunity');
         
        break;
        
        case "Qualified":
          
         $("#applyfor_c").val('qualifyDpr');
         
        break;
        
        case "QualifiedDpr":
        
         $("#applyfor_c").val('qualifyBid');
        
        break;
        
        case "QualifiedBid":
          
        $("#applyfor_c").val('closure');
        
        break;
        
        case "Closed":
           
        $("#applyfor_c").val('');
        
        break;
        
      }
      
      
      
   });
    
    
    
    //for disabling date buttons
    $("#scope_budget_projected_c_trigger").hide();
    $("#rfp_eoi_projected_c_trigger").hide();
    $("#rfp_eoi_published_projected_c_trigger").hide();
    $("#work_order_projected_c_trigger").hide();
    $("#scope_budget_achieved_c_trigger").hide();
    $("#rfp_eoi_achieved_c_trigger").hide();
    $("#rfp_eoi_published_achieved_c_trigger").hide();
    $("#work_order_achieved_c_trigger").hide();
    $("#project_implementation_start_c_trigger").hide();
    $("#project_implementation_end_c_trigger").hide();
    
    
    var scope;
    //if user click the date field other than scope and budget projected date field
    
    $(()=>{
      $("#rfp_eoi_projected_c").click(()=>{
         scope = $("#scope_budget_projected_c").val();
      if(scope == "" ){
         $('#rfp_eoi_projected_c').attr('readonly',true).datepicker("option", "showOn", "off");
    alert("please first select DPR/Scope Budget accepted Projected date");
   
  }else{
      $('#rfp_eoi_projected_c').attr('readonly',true).datepicker("option", "showOn", "off");
  }
    });
   $("#rfp_eoi_published_projected_c").click(()=>{
         scope = $("#scope_budget_projected_c").val();
      if(scope == "" ){
    alert("please first select DPR/Scope Budget accepted Projected date");
    $('#rfp_eoi_published_projected_c').attr('readonly',true).datepicker("option", "showOn", "off");
  }else{
      $('#rfp_eoi_published_projected_c').attr('readonly',true).datepicker("option", "showOn", "off");
  }
    });
    
    $("#work_order_projected_c").click(()=>{
         scope = $("#scope_budget_projected_c").val();
      if(scope == "" ){
    alert("please first select DPR/Scope Budget accepted Projected date");
    $('#work_order_projected_c').attr('readonly',true).datepicker("option", "showOn", "off");
  }else{
      $('#work_order_projected_c').attr('readonly',true).datepicker("option", "showOn", "off");
  }
    });
    
    $("#scope_budget_achieved_c").click(()=>{
         scope = $("#scope_budget_projected_c").val();
      if(scope == "" ){
    alert("please first select DPR/Scope Budget accepted Projected date");
  }
    });
    
    $("#rfp_eoi_achieved_c").click(()=>{
         scope = $("#scope_budget_projected_c").val();
      if(scope == "" ){
    alert("please first select DPR/Scope Budget accepted Projected date");
  }
    });
    
    $("#rfp_eoi_published_achieved_c").click(()=>{
         scope = $("#scope_budget_projected_c").val();
      if(scope == "" ){
    alert("please first select DPR/Scope Budget accepted Projected date");
  }
    });
    
    $("#work_order_achieved_c").click(()=>{
         scope = $("#scope_budget_projected_c").val();
      if(scope == "" ){
    alert("please first select DPR/Scope Budget accepted Projected date");
  }
    });
    
    });
    
    
  
    
    
    // making date default values
    $(function(){
    $("#scope_budget_projected_c").datepicker({
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    mindate:0,
    onSelect: function(selected) {
      $('#rfp_eoi_projected_c').css('background-color','#d8f5ee');
      $('#rfp_eoi_published_projected_c').css('background-color','#d8f5ee');
      $('#work_order_projected_c').css('background-color','#d8f5ee');
    //rfp initiated
   let drafting = $("#scope_budget_projected_c").datepicker('getDate');
   drafting.setMonth(drafting.getMonth()+1);
    $("#rfp_eoi_projected_c").datepicker('setDate',drafting);
    $('#rfp_eoi_projected_c').datepicker('option', 'minDate', drafting);

  
    
    // rfp published
    
    let published = $("#rfp_eoi_projected_c").datepicker('getDate');
    published.setMonth(published.getMonth()+1);
    $("#rfp_eoi_published_projected_c").datepicker('setDate',published);
    $('#rfp_eoi_published_projected_c').datepicker('option', 'minDate', published);
    
    //work projected
    let work = $("#rfp_eoi_published_projected_c").datepicker('getDate');
      work.setMonth(published.getMonth()+1);
      $("#work_order_projected_c").datepicker('setDate',work);
      $('#work_order_projected_c').datepicker('option', 'minDate', work);
       }
       
    
   
});


//scope-budget achieved
$("#scope_budget_achieved_c").datepicker({ 
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    beforeShow: function() {
      let scope_achieved = $("#scope_budget_projected_c").datepicker('getDate');
      scope_achieved.setDate(scope_achieved.getDate());
        $("#scope_budget_achieved_c").datepicker("option","minDate", scope_achieved);
        
    }
});  

//rfp initiated projected


  $("#rfp_eoi_projected_c").datepicker({ 
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    // onClose: function() {
      
    //     let date1 = $("#scope_budget_projected_c").datepicker('getDate');
    //   let date2 = $("#rfp_eoi_projected_c").datepicker('getDate');
      
    //   //check to prevent a user from entering a date below date of dt1
    //   if(date1 <= date2){
    //     let minDate = $('#rfp_eoi_projected_c').datepicker('option', 'minDate');
    //     $("#rfp_eoi_projected_c").datepicker('setDate', minDate)
    //   }
    //   }
      
       
    
});  

  
  



// rfp intiated achieved

    $("#rfp_eoi_achieved_c").datepicker({ 
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
     beforeShow:function() {
    let drafting_achieved = $("#rfp_eoi_projected_c").datepicker('getDate');
    drafting_achieved.setDate(drafting_achieved.getDate());
    $("#rfp_eoi_achieved_c").datepicker('option', 'minDate', drafting_achieved);
    
    }
});
  

//published 
$("#rfp_eoi_published_projected_c").datepicker({ 
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    // onClose: function() {
    //   let date1 = $("#rfp_eoi_projected_c").datepicker('getDate');
    //   let date2 = $("#rfp_eoi_published_projected_c").datepicker('getDate');
      
    //   //check to prevent a user from entering a date below date of date1
    //   if(date1 <= date2){
    //     let minDate = $('#rfp_eoi_published_projected_c').datepicker('option', 'minDate');
    //     $("#rfp_eoi_published_projected_c").datepicker('setDate', minDate)
    //   }
       
    // }
});  

//publish achieved

    $("#rfp_eoi_published_achieved_c").datepicker({ 
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
     beforeShow:function() {
    let publish_achieved = $("#rfp_eoi_published_projected_c").datepicker('getDate');
    publish_achieved.setDate(publish_achieved.getDate());
    $("#rfp_eoi_published_achieved_c").datepicker('option', 'minDate', publish_achieved);
    
    }
});


//work projected

$("#work_order_projected_c").datepicker({ 
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    // onClose: function() {
    //   let date1 = $("#rfp_eoi_published_projected_c").datepicker('getDate');
    //   let date2 = $("#work_order_projected_c").datepicker('getDate');
      
    //   //check to prevent a user from entering a date below date of date1
    //   if(date1 <= date2){
    //     let minDate = $('#work_order_projected_c').datepicker('option', 'minDate');
    //     $("#work_order_projected_c").datepicker('setDate', minDate)
    //   }
       
    // }
});  

// work achieved
 $("#work_order_achieved_c").datepicker({ 
    dateFormat : 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
     beforeShow:function() {
    let work_achieved = $("#work_order_projected_c").datepicker('getDate');
    work_achieved.setDate(work_achieved.getDate());
    $("#work_order_achieved_c").datepicker('option', 'minDate', work_achieved);
    
    }
});

$('#project_implementation_start_c').datepicker({
      dateFormat: 'dd/mm/yy',
      changeMonth: true,
      changeYear: true,
      // yearRange:  '1964:1991',
      // defaultDate: '01-01-1964'
      onSelect: function(selected) {
      $('#project_implementation_start_c').css('background-color','#d8f5ee');}
});

$('#project_implementation_end_c').datepicker({
      dateFormat: 'dd/mm/yy',
      changeMonth: true,
      changeYear: true,
      // yearRange:  '1964:1991',
      // defaultDate: '01-01-1964'
       onSelect: function(selected) {
      $('#project_implementation_end_c').css('background-color','#d8f5ee');}
});

});


//state list
var selected_state = $("#state_c").val();
$("#state_c").replaceWith('<select name="state_c" id="state_c"></select>');
  $.ajax({
    url : 'index.php?module=Opportunities&action=stateList',
        type : 'GET',
        success : function(data){
        // $("#state_c").append(data);
        if(selected_state == ""){
            var list = '<option value=""></option><option value="">Select State</option> +'; 
          }else{
                    var list = '<option value="'+selected_state+'">'+selected_state+'</option> +';
                }
         
             
         data=JSON.parse(data);
            data.forEach((state)=>{
                list+='<option value="'+state.name+'">'+state.name+'</option>';
              
            });
            $("#state_c").html(list);
        }
});

//first of a kind radio button


  $('#add_new_segment_c').attr("disabled",true);
  $('#add_new_product_service_c').attr("disabled",true);


$($('div[field="first_of_a_kind_segment_c"]')).on("click", function() {
  let new_kind = $('input[name="first_of_a_kind_segment_c"]:checked').val();
  
  if(new_kind==2){
  
  $('#segment_c').attr("disabled",false);
  $('#add_new_segment_c').attr("disabled",true);
  
  
}else{
  
  $('#segment_c').attr("disabled",true);
  $('#add_new_segment_c').attr("disabled",false);
}
  

});

$($('div[field="first_of_a_kind_product_c"]')).on("click", function() {
  let new_kind = $('input[name="first_of_a_kind_product_c"]:checked').val();
  
  if(new_kind==2){
  
  $('#product_service_c').attr("disabled",false);
  $('#add_new_product_service_c').attr("disabled",true);
  
}else{
  
  $('#product_service_c').attr("disabled",true);
  $('#add_new_product_service_c').attr("disabled",false);
}
  

});


  $("#selection_c").css('background-color','#2ecc71');
  $("#selection_c").on("click", function () {
              if ($(this).val()=='Red' ){
                  $(this).css('background-color','#de3b33');
              }else if($(this).val()=='Green'){
                $(this).css('background-color','#2ecc71');
              }else{
                $(this).css('background-color','#feca57');
              }
            });
  
  $("#funding_c").css('background-color','#2ecc71');
  $("#funding_c").on("click", function () {
              if ($(this).val()=='Red' ){
                  $(this).css('background-color','#de3b33');
              }else if($(this).val()=='Green'){
                $(this).css('background-color','#2ecc71');
              }else{
                $(this).css('background-color','#feca57');
              }
            });
   
  $("#timing_button_c").css('background-color','#2ecc71');         
  $("#timing_button_c").on("click", function () {
              if ($(this).val()=='Red' ){
                  $(this).css('background-color','#de3b33');
              }else if($(this).val()=='Green'){
                $(this).css('background-color','#2ecc71');
              }else{
                $(this).css('background-color','#feca57');
              }
            });
            
            
 //validating the oppertunity form while creating

  $("#rfporeoipublished_c").on("change", () => {
   custom_check_form = function (view/*,EditView*/) {
    var validate = true;
   
  var form_validation = $("#rfporeoipublished_c").val();


  if (form_validation == "yes") {
       
    
    
    if(  $("#state_c").val() == ""){ 
        validate = false;
        $("#state_c").css("background-color", "Red");}
        
    if( $("#name").val() == ""){ 
        validate = false;
        $("#name").css("background-color", "Red"); }
        
     if( $("#sector_c").val() == ""){ 
        validate = false;
        $("#sector_c").css("background-color", "Red"); }   
        
      if( $("#sub_sector_c").val() == ""){ 
        validate = false;
        $("#sub_sector_c").css("background-color", "Red"); }   
        
        if( $("#sub_sector_c").val() == ""){ 
        validate = false;
        $("#sub_sector_cc").css("background-color", "Red"); }   
        
         if( $("#rfp_eoi_achieved_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_achieved_c").css("background-color", "Red"); } 
        
        if( $("#rfp_eoi_published_achieved_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_published_achieved_c").css("background-color", "Red"); }
        
          if( $("#budget_head_c").val() == ""){ 
        validate = false;
        $("#budget_head_c").css("background-color", "Red"); }
        
         if( $("#budget_source_c").val() == ""){ 
        validate = false;
        $("#budget_source_c").css("background-color", "Red"); }
        
         if( $("#scope_budget_achieved_c").val() == ""){ 
        validate = false;
        $("#scope_budget_achieved_c").css("background-color", "Red"); }
        
         if( $("#project_implementation_end_c").val() == ""){ 
        validate = false;
        $("#project_implementation_end_c").css("background-color", "Red"); }
        
        if( $("#financial_feasibility_l2_c").val() == ""){ 
        validate = false;
        $("#financial_feasibility_l2_c").css("background-color", "Red"); }
        
         if( $("#work_order_achieved_c").val() == ""){ 
        validate = false;
        $("#work_order_achieved_c").css("background-color", "Red"); }
        
        if( $("#scope_budget_projected_c").val() == ""){ 
        validate = false;
        $("#scope_budget_projected_c").css("background-color", "Red"); }
        
        if( $("#rfp_eoi_projected_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_projected_c").css("background-color", "Red"); }
        
         if( $("#rfp_eoi_published_projected_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_published_projected_c").css("background-color", "Red"); }
        
         if( $("#work_order_projected_c").val() == ""){ 
        validate = false;
        $("#work_order_projected_c").css("background-color", "Red"); }
        
         if( $("#budget_source_c").val() == ""){ 
        validate = false;
        $("#budget_source_c").css("background-color", "Red"); }
        
        if( $("#budget_head_amount_c").val() == ""){ 
        validate = false;
        $("#budget_head_amount_c").css("background-color", "Red"); }
        
        if( $("#project_implementation_start_c").val() == ""){ 
        validate = false;
        $("#project_implementation_start_c").css("background-color", "Red"); }
        
        if( $("#financial_feasibility_l1_c").val() == ""){ 
        validate = false;
        $("#financial_feasibility_l1_c").css("background-color", "Red"); }
        
         if( $("#financial_feasibility_l3_c").val() == ""){ 
        validate = false;
        $("#financial_feasibility_l3_c").css("background-color", "Red"); }
        
         if( $("#budget_allocated_oppertunity_c").val() == ""){ 
        validate = false;
        $("#budget_allocated_oppertunity_c").css("background-color", "Red"); }
        
        if( $("#source_c").val() == ""){ 
        validate = false;
        $("#source_c").css("background-color", "Red"); }
        
        if( $("#account_name").val() == ""){ 
        validate = false;
        $("#account_name").css("background-color", "Red"); }
        
        if( $("#non_financial_consideration_c").val() == ""){ 
        validate = false;
        $("#non_financial_consideration_c").css("background-color", "Red"); }
 
      if(validate == false){
     alert("please fill the required fields"); 
   }
   
      if (validate && check_form(view)) {
        return true;
      } else {
        return false;
      }
      
      
   
   
  }else if(form_validation == "no"){
   
   if($("#financial_feasibility_l1_c").val() == ""){
    validate = false;
    $("#financial_feasibility_l1_c").css("background-color", "Red");
   }
   if($("#name").val() == ""){
    validate = false;
    $("#name").css("background-color", "Red");
   }
   if($("#state_c").val() == ""){
    validate = false;
    $("#state_c").css("background-color", "Red");
   }
   if($("#account_name").val() == ""){
    validate = false;
    $("#account_name").css("background-color", "Red");
   }
   if($("#source_c").val() == ""){
    validate = false;
    $("#source_c").css("background-color", "Red");
   }
   if($("#product_service_c").val() == ""){
    validate = false;
    $("#product_service_c").css("background-color", "Red");
   }
   if($("#non_financial_consideration_c").val() == ""){
    validate = false;
    $("#non_financial_consideration_c").css("background-color", "Red");
   }
   
   if($("#account_name").val() == ""){
    validate = false;
    $("#account_name").css("background-color", "Red");
   }
   
   if(validate == false){
     alert("please fill the required fields"); 
   }
  
      if (validate && check_form(view)) {
        return true;
      } else {
        return false;
      }
    
  }
  
   }
   
});

//validating opportunity form while in edit mode

   custom_check_form = function (view/*,EditView*/) {
    var validate = true;
   
  var form_validation = $("#rfporeoipublished_c").val();


  if (form_validation == "yes") {
       
    
    
    if(  $("#state_c").val() == ""){ 
        validate = false;
        $("#state_c").css("background-color", "Red");}
        
    if( $("#name").val() == ""){ 
        validate = false;
        $("#name").css("background-color", "Red"); }
        
     if( $("#sector_c").val() == ""){ 
        validate = false;
        $("#sector_c").css("background-color", "Red"); }   
        
      if( $("#sub_sector_c").val() == ""){ 
        validate = false;
        $("#sub_sector_c").css("background-color", "Red"); }   
        
        if( $("#sub_sector_c").val() == ""){ 
        validate = false;
        $("#sub_sector_cc").css("background-color", "Red"); }   
        
         if( $("#rfp_eoi_achieved_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_achieved_c").css("background-color", "Red"); } 
        
        if( $("#rfp_eoi_published_achieved_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_published_achieved_c").css("background-color", "Red"); }
        
          if( $("#budget_head_c").val() == ""){ 
        validate = false;
        $("#budget_head_c").css("background-color", "Red"); }
        
         if( $("#budget_source_c").val() == ""){ 
        validate = false;
        $("#budget_source_c").css("background-color", "Red"); }
        
         if( $("#scope_budget_achieved_c").val() == ""){ 
        validate = false;
        $("#scope_budget_achieved_c").css("background-color", "Red"); }
        
         if( $("#project_implementation_end_c").val() == ""){ 
        validate = false;
        $("#project_implementation_end_c").css("background-color", "Red"); }
        
        if( $("#financial_feasibility_l2_c").val() == ""){ 
        validate = false;
        $("#financial_feasibility_l2_c").css("background-color", "Red"); }
        
         if( $("#work_order_achieved_c").val() == ""){ 
        validate = false;
        $("#work_order_achieved_c").css("background-color", "Red"); }
        
        if( $("#scope_budget_projected_c").val() == ""){ 
        validate = false;
        $("#scope_budget_projected_c").css("background-color", "Red"); }
        
        if( $("#rfp_eoi_projected_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_projected_c").css("background-color", "Red"); }
        
         if( $("#rfp_eoi_published_projected_c").val() == ""){ 
        validate = false;
        $("#rfp_eoi_published_projected_c").css("background-color", "Red"); }
        
         if( $("#work_order_projected_c").val() == ""){ 
        validate = false;
        $("#work_order_projected_c").css("background-color", "Red"); }
        
         if( $("#budget_source_c").val() == ""){ 
        validate = false;
        $("#budget_source_c").css("background-color", "Red"); }
        
        if( $("#budget_head_amount_c").val() == ""){ 
        validate = false;
        $("#budget_head_amount_c").css("background-color", "Red"); }
        
        if( $("#project_implementation_start_c").val() == ""){ 
        validate = false;
        $("#project_implementation_start_c").css("background-color", "Red"); }
        
        if( $("#financial_feasibility_l1_c").val() == ""){ 
        validate = false;
        $("#financial_feasibility_l1_c").css("background-color", "Red"); }
        
         if( $("#financial_feasibility_l3_c").val() == ""){ 
        validate = false;
        $("#financial_feasibility_l3_c").css("background-color", "Red"); }
        
         if( $("#budget_allocated_oppertunity_c").val() == ""){ 
        validate = false;
        $("#budget_allocated_oppertunity_c").css("background-color", "Red"); }
        
        if( $("#source_c").val() == ""){ 
        validate = false;
        $("#source_c").css("background-color", "Red"); }
        
        if( $("#account_name").val() == ""){ 
        validate = false;
        $("#account_name").css("background-color", "Red"); }
        
        if( $("#non_financial_consideration_c").val() == ""){ 
        validate = false;
        $("#non_financial_consideration_c").css("background-color", "Red"); }
 
      if(validate == false){
     alert("please fill the required fields"); 
   }
   
      if (validate && check_form(view)) {
        return true;
      } else {
        return false;
      }
      
      
   
   
  }else if(form_validation == "no"){
   
   if($("#financial_feasibility_l1_c").val() == ""){
    validate = false;
    $("#financial_feasibility_l1_c").css("background-color", "Red");
   }
   if($("#name").val() == ""){
    validate = false;
    $("#name").css("background-color", "Red");
   }
   if($("#state_c").val() == ""){
    validate = false;
    $("#state_c").css("background-color", "Red");
   }
   if($("#account_name").val() == ""){
    validate = false;
    $("#account_name").css("background-color", "Red");
   }
   if($("#source_c").val() == ""){
    validate = false;
    $("#source_c").css("background-color", "Red");
   }
   if($("#product_service_c").val() == ""){
    validate = false;
    $("#product_service_c").css("background-color", "Red");
   }
   if($("#non_financial_consideration_c").val() == ""){
    validate = false;
    $("#non_financial_consideration_c").css("background-color", "Red");
   }
   
   if($("#account_name").val() == ""){
    validate = false;
    $("#account_name").css("background-color", "Red");
   }
   
   if(validate == false){
     alert("please fill the required fields"); 
   }
  
      if (validate && check_form(view)) {
        return true;
      } else {
        return false;
      }
    
  }
  
   }
   
 
 

//   //for changing the required background color red to normal

$("#project_implementation_end_c_trigger").on("click", function () {
  //console.log("if in");

  if ($("#project_implementation_end_c").css("background-color", "Red")) {
    // console.log("check in");

    $("#project_implementation_end_c").css("background-color", "#d8f5ee");
  }
});

$("#project_implementation_start_c_trigger").on("click", function () {
  if ($("#project_implementation_start_c").css("background-color", "Red")) {
    $("#project_implementation_start_c").css("background-color", "#d8f5ee");
  }
});

//for budget source field

$("#budget_source_c").on("click", function () {
  if ($("#budget_source_c").css("background-color", "Red")) {
    $("#budget_source_c").css("background-color", "#d8f5ee");
  }
});

$("#budget_head_c").on("click", function () {
  if ($("#budget_head_c").css("background-color", "Red")) {
    $("#budget_head_c").css("background-color", "#d8f5ee");
  }
});

$("#budget_head_amount_c").on("click", function () {
  if ($("#budget_head_amount_c").css("background-color", "Red")) {
    $("#budget_head_amount_c").css("background-color", "#d8f5ee");
  }
});

$("#budget_allocated_oppertunity_c").on("click", function () {
  if ($("#budget_allocated_oppertunity_c").css("background-color", "Red")) {
    $("#budget_allocated_oppertunity_c").css("background-color", "#d8f5ee");
  }
});

$("#financial_feasibility_l1_c").on("click", function () {
  if ($("#financial_feasibility_l1_c").css("background-color", "Red")) {
    $("#financial_feasibility_l1_c").css("background-color", "#d8f5ee");
  }
});

$("#financial_feasibility_l2_c").on("click", function () {
  if ($("#financial_feasibility_l2_c").css("background-color", "Red")) {
    $("#financial_feasibility_l2_c").css("background-color", "#d8f5ee");
  }
});

$("#financial_feasibility_l3_c").on("click", function () {
  if ($("#financial_feasibility_l3_c").css("background-color", "Red")) {
    $("#financial_feasibility_l3_c").css("background-color", "#d8f5ee");
  }
});



$("#sector_c").on("click", function () {
  if ($("#sector_c").css("background-color", "Red")) {
    $("#sector_c").css("background-color", "#d8f5ee");
  }
});

$("#scope_budget_projected_c").on("click", function () {
  if ($("#scope_budget_projected_c").css("background-color", "Red")) {
    $("#scope_budget_projected_c").css("background-color", "#d8f5ee");
  }
});

$("#scope_budget_achieved_c").on("click", function () {
  if ($("#scope_budget_achieved_c").css("background-color", "Red")) {
    $("#scope_budget_achieved_c").css("background-color", "#d8f5ee");
  }
});

$("#rfp_eoi_projected_c").on("click", function () {
  if ($("#rfp_eoi_projected_c").css("background-color", "Red")) {
    $("#rfp_eoi_projected_c").css("background-color", "#d8f5ee");
  }
});

$("#rfp_eoi_achieved_c").on("click", function () {
  if ($("#rfp_eoi_achieved_c").css("background-color", "Red")) {
    $("#rfp_eoi_achieved_c").css("background-color", "#d8f5ee");
  }
});

$("#rfp_eoi_published_projected_c").on("click", function () {
  if ($("#rfp_eoi_published_projected_c").css("background-color", "Red")) {
    $("#rfp_eoi_published_projected_c").css("background-color", "#d8f5ee");
  }
});

$("#rfp_eoi_published_achieved_c").on("click", function () {
  if ($("#rfp_eoi_published_achieved_c").css("background-color", "Red")) {
    $("#rfp_eoi_published_achieved_c").css("background-color", "#d8f5ee");
  }
});

$("#work_order_projected_c").on("click", function () {
  if ($("#work_order_projected_c").css("background-color", "Red")) {
    $("#work_order_projected_c").css("background-color", "#d8f5ee");
  }
});

$("#work_order_achieved_c").on("click", function () {
  if ($("#work_order_achieved_c").css("background-color", "Red")) {
    $("#work_order_achieved_c").css("background-color", "#d8f5ee");
  }
});

$("#name").on("click", function () {
  if ($("#name").css("background-color", "Red")) {
    $("#name").css("background-color", "#d8f5ee");
  }
});

$("#state_c").on("click", function () {
  if ($("#state_c").css("background-color", "Red")) {
    $("#state_c").css("background-color", "#d8f5ee");
  }
});

$("#btn_account_name").on("click", function () {
  if ($("#account_name").css("background-color", "Red")) {
    $("#account_name").css("background-color", "#d8f5ee");
  }
});

$("#source_c").on("click", function () {
  if ($("#source_c").css("background-color", "Red")) {
    $("#source_c").css("background-color", "#d8f5ee");
  }
});

$("#segment_c").on("click", function () {
  if ($("#segment_c").css("background-color", "Red")) {
    $("#segment_c").css("background-color", "#d8f5ee");
  }
});

$("#product_service_c").on("click", function () {
  if ($("#product_service_c").css("background-color", "Red")) {
    $("#product_service_c").css("background-color", "#d8f5ee");
  }
});

$("#non_financial_consideration_c").on("click", function () {
  if ($("#non_financial_consideration_c").css("background-color", "Red")) {
    $("#non_financial_consideration_c").css("background-color", "#d8f5ee");
  }
});




/**************************************Don't delete anything after this line **************************************************************/
});
