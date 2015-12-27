(function(){
    'use strict';

    // Check backend code in stats.enums
    var enums = {

        'OrganisationUserAccess': {
            0: 'READ',
            1: 'READ + WRITE',
            2: 'ADMINISTRATOR'
        },

        DataPointFrequency: {
            0: 'DEFAULT',
            1: 'HOURLY',
            2: 'DAILY',
            3: 'WEEKLY',
            4: 'MONTHLY',
            5: 'HOURLY'
        }

    };

    angular
        .module('intra')
        .constant('Enums', enums);

})();