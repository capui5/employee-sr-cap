sap.ui.define(["sap/m/library","sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","sap/ui/model/Filter","sap/m/MessageBox","sap/ui/core/Fragment"],function(e,t,a,o,i,s,r){"use strict";var n=e.URLHelper;return t.extend("empreg.controller.View2",{onInit:function(){this.oTable=this.byId("table0");this.showEmployeesFromNetherlands();this.oDataModel=this.getOwnerComponent().getModel("MainModel");this.getView().setModel(this.oDataModel)},showEmployeesFromNetherlands:function(){var e=new i("country_ID",sap.ui.model.FilterOperator.EQ,"1");this.oTable.bindItems({path:"/Employees",filters:[e],template:new sap.m.ColumnListItem({cells:[new sap.m.Text({text:"{ID}"}),new sap.m.Text({text:"{fname}"}),new sap.m.Text({text:"{lname}"}),new sap.m.Text({text:"{desig}"}),new sap.m.Text({text:"{email}"}),new sap.m.Text({text:"{skills}"}),new sap.m.Text({text:"{country/name}"}),new sap.m.Text({text:"{State}"}),new sap.m.Text({text:"{city}"}),new sap.m.Text({text:"{doj}"}),new sap.m.Text({text:"{yoe} year"}),new sap.m.Text({text:"{gender}"}),new sap.m.Text({text:"{leave}"})]})})},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){var e,t;e=a.getInstance();t=e.getPreviousHash();if(t!==undefined){window.history.go(-1)}else{this.getRouter().navTo("View1",{},true)}},onaddnewemployee:function(){var e=this.getOwnerComponent().getRouter();e.navTo("View5")},onAdvancedSearch:function(e){var t=e.getParameter("newValue");var a=this.getView().byId("table0");var o=a.getBinding("items");if(o){var i=[];var s=t.toLowerCase();var r=[{term:"cap",matches:["cloud","cloud development","cloud application programming","cloud application programming model","CAP","capm"]},{term:"javascript",matches:["js","javascript"]}];r.forEach(function(e){if(e.term.includes(s)||e.matches.includes(s)){e.matches.forEach(function(e){var t=new sap.ui.model.Filter({path:"skills",operator:sap.ui.model.FilterOperator.Contains,value1:e,caseSensitive:false});i.push(t)})}});if(i.length===0){var n=new sap.ui.model.Filter({path:"skills",operator:sap.ui.model.FilterOperator.Contains,value1:t,caseSensitive:false});i.push(n)}var l=new sap.ui.model.Filter({path:"fname",operator:sap.ui.model.FilterOperator.Contains,value1:t,caseSensitive:false});var d=new sap.ui.model.Filter({path:"lname",operator:sap.ui.model.FilterOperator.Contains,value1:t,caseSensitive:false});var c=new sap.ui.model.Filter({path:"desig",operator:sap.ui.model.FilterOperator.Contains,value1:t,caseSensitive:false});var p=new sap.ui.model.Filter({path:"email",operator:sap.ui.model.FilterOperator.Contains,value1:t,caseSensitive:false});i.push(l,d,c,p);var u=new sap.ui.model.Filter({filters:i,and:false});o.filter(u)}},onDelete:function(){var e=this.getView().byId("table0");var t=e.getSelectedItems()[0];if(!t){sap.m.MessageBox.error("Please select an employee to delete.");return}var a=t.getBindingContext().getObject();var o=a.ID;var i=this;s.confirm("Are you sure you want to delete "+a.fname+" "+a.lname+" record?",{title:"Confirm",onClose:function(t){if(t===sap.m.MessageBox.Action.OK){i.onDeleteSpecificRecord(e,a)}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:sap.m.MessageBox.Action.CANCEL,initialFocus:null,textDirection:sap.ui.core.TextDirection.Inherit})},onDeleteSpecificRecord:function(e,t){var a=t.ID;var o=this;$.ajax({url:"../../CatalogService/Employees/"+a,method:"DELETE",success:function(){s.success("Employee deleted successfully.",{onClose:function(){window.location.reload()}});var t=e.getModel("MainModel");var o=t.getProperty("/Employees");for(var i=0;i<o.length;i++){if(o[i].ID===a){o.splice(i,1);t.setProperty("/Employees",o);e.getModel().refresh(true);break}}},error:function(){s.error("Error deleting employee.")}})},onEdit:function(){var e=this.byId("table0");var t=e.getSelectedItems()[0];if(!t){sap.m.MessageBox.error("Please select an employee to Update.");return}var a=t.getBindingContext().getObject();var o=this;if(!this.pDialog){r.load({id:this.getView().getId(),name:"empreg.view.Edit",controller:this}).then(function(e){o.pDialog=e;o.setEmployeeData(a);e.open()}).catch(function(e){s.error("Error loading fragment: "+e)})}else{o.setEmployeeData(a);this.pDialog.open()}},setEmployeeData:function(e){var t=this.getView();var a=t.byId("Id");a.setValue(e.ID);a.setEditable(false);t.byId("fname").setValue(e.fname);t.byId("lname").setValue(e.lname);t.byId("desig").setValue(e.desig);t.byId("email").setValue(e.email);t.byId("skills").setValue(e.skills);var o=t.byId("country");var i=e.country_ID;o.setSelectedKey(i);t.byId("idstate").setValue(e.State);t.byId("idcity").setValue(e.city);t.byId("myDatePicker").setValue(e.doj);t.byId("yoe").setValue(e.yoe);var s=t.byId("genderRadioGroup");var r=e.gender.toLowerCase();if(r==="male"){s.setSelectedIndex(0)}else if(r==="female"){s.setSelectedIndex(1)}t.byId("leave").setValue(e.leave)},onUpdate:function(){var e=this;var t=this.getView();var a=t.byId("country").getSelectedItem().getKey();var o={Netherlands:1,India:2,Singapore:3};var i=o[a];var r=t.byId("leave").getSelectedKey()==="true";var n={ID:parseInt(t.byId("Id").getValue()),fname:t.byId("fname").getValue(),lname:t.byId("lname").getValue(),desig:t.byId("desig").getValue(),email:t.byId("email").getValue(),skills:t.byId("skills").getValue(),country_ID:i,State:t.byId("idstate").getValue(),city:t.byId("idcity").getValue(),doj:t.byId("myDatePicker").getValue(),yoe:parseInt(t.byId("yoe").getValue()),gender:t.byId("genderRadioGroup").getSelectedButton().getText(),leave:r};$.ajax({contentType:"application/json",type:"PATCH",url:"../../CatalogService/Employees("+n.ID+")",dataType:"json",crossDomain:true,data:JSON.stringify(n),success:function(t){e.pDialog.close();s.success("Employee data updated successfully!",{onClose:function(){window.location.reload()}})},error:function(e){s.error("Error while updating employee data")}})},onCancel:function(e){this.byId("openDialog").close()},handleEmailPress:function(e){n.triggeremail(this._getVal(e),"Info Request",false,false,false,true)}})});