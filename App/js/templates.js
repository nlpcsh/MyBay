'use strict';

let templates = (function(){
    function get(name){
        let promise = new Promise(function(resolve, reject){
            let url = 'templates/' + name + '.handlebars';
            $.get(url, function(html){
                let template = Handlebars.compile(html);
                resolve(template);
            });

        });
        return promise;
    }

    return {
        get: get
    };
})();