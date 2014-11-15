"use strict";

module.exports = function(App){

    App.Router.map(function() {

        this.route('welcome');

        this.route('workspace', function(){

            this.route('images', function(){
                this.route('detail', { path: '/:id' });
            });

            this.route('extractor', function(){
                this.route('image', { path: '/:id' });
            });

            this.route('register', function(){});

            this.route('mvs', function(){});

        });

    });


    App.ApplicationRoute = Ember.Route.extend({

        beforeModel: function(){
            return this.controllerFor('sfmStore').promiseResume();
        },

        model: function(){
            return this.controllerFor('sfmStore');
        }

    });


    App.IndexRoute = Ember.Route.extend({

        model: function(){
            return this.controllerFor('sfmStore').promiseProject();
        },

        afterModel: function(){
            this.transitionTo('workspace');
        },

        actions: {
            error: function(){
                this.transitionTo('welcome');
            }
        }

    });

    App.WelcomeRoute = require('./routes/WelcomeRoute.js');

    App.WorkspaceRoute = require('./routes/WorkspaceRoute.js');

    App.WorkspaceIndexRoute = Ember.Route.extend();

    //=============================
    // Workspace.Images
    //=============================

    App.WorkspaceImagesRoute = Ember.Route.extend({

        model: function() {
            return this.controllerFor('workspace').promiseImages();
        }

    });

    App.WorkspaceImagesIndexRoute = Ember.Route.extend();

    App.WorkspaceImagesDetailRoute = Ember.Route.extend({

        model: function(params){
            return this.modelFor('workspace.images').findBy('_id', parseInt(params.id));
        },

        serialize: function(model){
            return { id: model.get('_id') };
        }

    });


    //=============================
    // Workspace.Images
    //=============================

    App.WorkspaceExtractorRoute = Ember.Route.extend({

        model: function() {
            return this.controllerFor('workspace').promiseImages();
        }

    });

    App.WorkspaceExtractorIndexRoute = Ember.Route.extend();

    App.WorkspaceExtractorImageRoute = Ember.Route.extend({

        model: function(params){
            return this.modelFor('workspace.extractor').findBy('_id', parseInt(params.id));
        },

        serialize: function(model){
            return { id: model.get('_id') };
        }

    });

    //=============================
    // Workspace.Mathces
    //=============================

    App.MatchesRoute = Ember.Route.extend({

        model: function(){
            return this.controllerFor('workspace').get('project').promiseMatches();
        }

    });

    App.MatchesIndexRoute = Ember.Route.extend();

    App.MatchesPairRoute = require('./routes/MatchesPairRoute.js');

    App.TracksRoute = Ember.Route.extend({

        model: function(){
            return this.controllerFor('workspace').get('project').promiseTracks();
        }

    });

    //=============================
    // Workspace.Register
    //=============================

    App.WorkspaceRegisterRoute = require('./routes/WorkspaceRegisterRoute.js');

    App.WorkspaceRegisterIndexRoute = Ember.Route.extend();

    //=============================
    // Workspace.MVS
    //=============================

    App.WorkspaceMvsRoute = require('./routes/WorkspaceMvsRoute.js');

    App.WorkspaceMvsIndexRoute = Ember.Route.extend();

};