(function(){

    angular
        .module('intra')
        .controller('SegmentReporterListCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $rootScope, MeHelper, $stateParams, Restangular, $log, $http, $translate, TopAlertHelper, SweetAlert){

        $scope.form = {};

        $scope.get = function(){

            var id = $stateParams.id;
            MeHelper.ready().then(function(me){
                Restangular.one('segments', id).getList('reporters').then(function(data){
                    $scope.reporters = data;
                });
            });

        };

        $scope.add = function(item, model){

            $scope.form.child = item;

            var url = '/api/v1/segments/' + $stateParams.id + '/reporters';
            $http.post(url, $scope.form).
                success(function(data, status, headers, config){
                    $scope.get();
                    $scope.form = {};

                    TopAlertHelper.translateOne('alert.reporting_unit_added', 'success');
                }).
                error(function(data, status, headers, config){
                    $scope.form.errors = data;
                });

            $scope.organisation.selected = undefined;
        };

        $scope.confirmRemove = function(segment_id, reporter_id){

            var keys = ['are_you_sure', 'segments.reporter_will_be_removed', 'cancel', 'yes'];

            $translate(keys).then(function(translations){

                SweetAlert.swal({
                        title: translations['are_you_sure'],
                        text: translations['segments.reporter_will_be_removed'],
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: translations['cancel'],
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: translations['yes'],
                        closeOnConfirm: true
                    },
                    function(isConfirm){
                        if(isConfirm){
                            $scope.remove(segment_id, reporter_id);
                        }
                    });

            });

        };

        $scope.remove = function(segment_id, reporter_id){
            var url = '/api/v1/segments/' + segment_id + '/reporters/' + reporter_id;
            $http.delete(url).
                success(function(data, status, headers, config){
                    $scope.get();

                    TopAlertHelper.translateOne('alert.reporting_unit_deleted', 'warning');
                }).
                error(function(data, status, headers, config){
                    // TODO: Create a GlobalAlertHandler
                });

        };

        $scope.get();


        // UI-Select
        $scope.organisation = {};
        $scope.organisations = [];

        $scope.getOrganisations = function(){
            Restangular.all('reporters').getList().then(function(data){
                $scope.organisations = data;
            });
        };

        $scope.getOrganisations();
    }

})();

