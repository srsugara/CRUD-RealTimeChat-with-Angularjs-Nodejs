myApp.controller('customerApiController',['$scope','Api',function($scope,Api){
	$scope.form={};
	$scope.customers=[];
	$scope.pageSize=6;
	$scope.currentPage=1;

	Api.Customer.query({},function(data){
		$scope.customers=data;
	});

	$scope.deleteAll=function(){
		Api.Customer.delete({},function(data){
			$scope.customers=[];
		});
	};

	$scope.delete=function(index){
		 if (confirm("yo bana?")){
		Api.Customer.delete({id:$scope.customers[index]._id},function(data){
			$scope.customers.splice(index,1);
		});
		alert('sip lah taapuih');
		}
	};

	$scope.addToDatabase=function(){
		Api.Customer.save({},$scope.form,function(data){
			$scope.customers.push(data);
		},
		function(err){
			bootbox.alert('Error: '+err);
		});
	};
}]);