(function(){

    angular.module('intra').factory('MeHelper', Factory);

    /* @ngInject */
    function Factory($http, $q, $log, $rootScope, $window) {

        // Declare private vars here...
        var _isAuthenticated = false,
            _ready = $q.defer();

        return {

            fetchFirst: function(){

                var self = this;

                var deferred = $q.defer();
                var url = '/api/v1/me';

                $http.get(url).
                    success(function(data, status, headers, config){
                        _isAuthenticated = true;
                        var promises = [];
                        angular.extend(self, data);
                        // Attach to window object for debugging purposes...
                        $window.me = self;
                        deferred.resolve(self);

                        // promises.push(self.getOrganisationData());

                        $q.all(promises)['finally'](function(){
                            _ready.resolve(self);
                        });
                    }).
                    error(function(data, status, headers, config){
                        $log.error('Error:', url);
                        deferred.reject();
                    });

                return deferred.promise;
            },

            ready: function() {
                return _ready.promise;
            },

            isAuthenticated: function(){
                return _isAuthenticated;
            },

            save: function(payload){
                var self = this;

                var url = '/api/v1/me';
                var deferred = $q.defer();

                $http.put(url, payload).
                    success(function(data, status, headers, config){
                        angular.extend(self, data);
                        deferred.resolve(data);
                        $rootScope.$broadcast('me:change', self);
                    }).
                    error(function(data, status, headers, config){
                        deferred.reject(status);
                    });

                return deferred.promise;
            },

            getActiveUser: function(){
                var self = this;

                var found = _.find(self.organisations, function(organisationWrapper){
                    return organisationWrapper.is_active === true;
                });

                return found;
            },

            getActiveOrganisation: function(){
                var self = this;

                var found = _.find(self.organisations, function(organisationWrapper){
                    return organisationWrapper.is_active === true;
                });

                if(angular.isDefined(found)){
                    // If is defined, it returns the organisation object
                    return found.organisation;
                }
                // Else return undefined
                return found;
            },

            isCollector: function(){
                var self = this;
                return self.getActiveUser().organisation.literal_kind === 'COLLECTOR';
            },

            getOtherOrganisations: function(){
                var self = this;

                return _.without(self.organisations, self.getActiveUser());
            },

            login: function(payload){
                var self = this,
                    url = '/api/v1/me/login',
                    deferred = $q.defer();

                $http.post(url, payload).
                    success(function(data, status, headers, config){
                        $log.info('Login was successful!');
                        deferred.resolve();
                    }).
                    error(function(data, status, headers, config){
                        $log.error('Error:', url);
                        deferred.reject(data);
                    });

                return deferred.promise;
            },

            logout: function(){
                var self = this,
                    url = '/api/v1/me/logout',
                    deferred = $q.defer();

                $http.get(url).
                    success(function(data, status, headers, config){
                        _isAuthenticated = false;

                        try {
                            // Remove props...
                            var props = ['id', 'email', 'first_name', 'last_name', 'date_joined', 'last_login'];
                            _.each(props, function(prop){
                                delete self[prop];
                            })
                        } catch(error){
                            // Do something
                        }

                        deferred.resolve(self);
                        $log.info('Logout was successful!');
                    }).
                    error(function(data, status, headers, config){
                        $log.error('Error:', url);
                        deferred.reject({data: data, status: status});
                    });
            }


        };

    };

})();