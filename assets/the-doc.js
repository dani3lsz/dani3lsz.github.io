"use strict";



define('the-doc/app', ['exports', 'ember', 'the-doc/resolver', 'ember-load-initializers', 'the-doc/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('the-doc/components/scroll-to', ['exports', 'ember-scroll-to/components/scroll-to'], function (exports, _scrollTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _scrollTo.default;
});
define('the-doc/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('the-doc/helpers/app-version', ['exports', 'ember', 'the-doc/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('the-doc/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('the-doc/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('the-doc/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'the-doc/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('the-doc/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('the-doc/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('the-doc/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('the-doc/initializers/export-application-global', ['exports', 'ember', 'the-doc/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('the-doc/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('the-doc/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('the-doc/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("the-doc/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('the-doc/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('the-doc/router', ['exports', 'ember', 'the-doc/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('projects');
    this.route('project', { path: '/project/:project_id' });
    this.route('document', { path: '/project/:project_id/:doc_id' });
  });

  exports.default = Router;
});
define('the-doc/routes/document', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    projects: [{
      id: "1",
      name: "Some project name",
      note: "Some short note",
      ready: true,
      contractor: {
        name: "Some Body",
        address: "Address, California"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: true
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: true
      }, {
        id: "4",
        name: "Document name",
        ready: true
      }]
    }, {
      id: "2",
      name: "Other project name",
      note: "Some short note",
      ready: false,
      contractor: {
        name: "Some Body",
        address: "Address, New York"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: false
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: false
      }, {
        id: "4",
        name: "Document name",
        ready: false
      }]
    }, {
      id: "3",
      name: "Third project name",
      note: "Some short note",
      ready: false,
      contractor: {
        name: "Some Body",
        address: "Address, Hungary"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: false
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: false
      }, {
        id: "4",
        name: "Document name",
        ready: false
      }]
    }, {
      id: "4",
      name: "Problematic project name",
      note: "Some short note",
      ready: false,
      contractor: {
        name: "Some Body",
        address: "Address, Texas"
      },
      warning: {
        title: "Deadline approaching",
        text: "Deadline: July 22., 2017"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: false
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: false
      }, {
        id: "4",
        name: "Document name",
        ready: false,
        warning: "Unfilled"
      }]
    }],
    model: function model(params) {
      var project = this.get('projects').filter(function (project) {
        return project.id === params.project_id;
      })[0];

      var document = project.documents.filter(function (project) {
        return project.id === params.doc_id;
      })[0];

      var other = project.documents.filter(function (project) {
        return project.id !== params.doc_id;
      });

      return _rsvp.default.hash({
        project: project,
        document: document,
        other: other
      });
    }
  });
});
define('the-doc/routes/index', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define("the-doc/routes/project", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    projects: [{
      id: "1",
      name: "Some project name",
      note: "Some short note",
      ready: true,
      contractor: {
        name: "Some Body",
        address: "Address, California"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: true
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: true
      }, {
        id: "4",
        name: "Document name",
        ready: true
      }]
    }, {
      id: "2",
      name: "Other project name",
      note: "Some short note",
      ready: false,
      contractor: {
        name: "Some Body",
        address: "Address, New York"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: false
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: false
      }, {
        id: "4",
        name: "Document name",
        ready: false
      }]
    }, {
      id: "3",
      name: "Third project name",
      note: "Some short note",
      ready: false,
      contractor: {
        name: "Some Body",
        address: "Address, Hungary"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: false
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: false
      }, {
        id: "4",
        name: "Document name",
        ready: false
      }]
    }, {
      id: "4",
      name: "Problematic project name",
      note: "Some short note",
      ready: false,
      contractor: {
        name: "Some Body",
        address: "Address, Texas"
      },
      warning: {
        title: "Deadline approaching",
        text: "Deadline: July 22., 2017"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        ready: true
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        ready: false
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        ready: false
      }, {
        id: "4",
        name: "Document name",
        ready: false,
        warning: "Unfilled"
      }]
    }],
    model: function model(params) {
      return this.get('projects').filter(function (project) {
        return project.id === params.project_id;
      })[0];
    }
  });
});
define("the-doc/routes/projects", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    projects: [{
      id: "1",
      name: "Some project name",
      note: "Some short note",
      ready: true
    }, {
      id: "2",
      name: "Other project name",
      note: "Some short note",
      ready: false
    }, {
      id: "3",
      name: "Third project name",
      note: "Some short note",
      ready: false
    }, {
      id: "4",
      name: "Problematic project name",
      note: "Some short note",
      ready: false,
      warning: "Deadline"
    }],
    model: function model() {
      return this.get('projects');
    }
  });
});
define('the-doc/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('the-doc/services/scroller', ['exports', 'ember-scroll-to/services/scroller'], function (exports, _scroller) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scroller.default;
    }
  });
});
define("the-doc/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lrnNy2wd", "block": "{\"statements\":[[11,\"nav\",[]],[15,\"class\",\"td_nav aa_text--condensed td_noformat aa_text--0\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"aa_text--bold aa_text--22\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"index\"],[[\"class\"],[\"\"]],{\"statements\":[[0,\"the\"],[11,\"span\",[]],[15,\"class\",\"aa_txtc-blue\"],[13],[0,\"Doc\"],[14]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"ul\",[]],[15,\"class\",\"td_nav_list\"],[13],[0,\"\\n    \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"projects\"],[[\"class\"],[\"td_nav_list_a\"]],{\"statements\":[[0,\"Projects\"]],\"locals\":[]},null],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[11,\"footer\",[]],[15,\"class\",\"td_footer\"],[13],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/application.hbs" } });
});
define("the-doc/templates/components/scroll-to", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kutMPxX1", "block": "{\"statements\":[[6,[\"if\"],[[29,\"default\"]],null,{\"statements\":[[0,\"  \"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[1,[26,[\"label\"]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/components/scroll-to.hbs" } });
});
define("the-doc/templates/document", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "o9iAWSCz", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"td aa_clearfix\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[15,\"class\",\"td_project_ttl aa_text--base\"],[13],[1,[28,[\"model\",\"project\",\"name\"]],false],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"td_project_info\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Contractor\"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_badge td_project_info_elem_badge-face\"],[13],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_text\"],[13],[0,\"\\n        \"],[11,\"h5\",[]],[15,\"class\",\"td_project_info_elem_text_ttl aa_text--base\"],[13],[1,[28,[\"model\",\"project\",\"contractor\",\"name\"]],false],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[15,\"class\",\"td_project_info_elem_text_detail\"],[13],[1,[28,[\"model\",\"project\",\"contractor\",\"address\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Status\"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_project_info_elem_badge \",[33,[\"if\"],[[28,[\"model\",\"project\",\"ready\"]],\"td_project_info_elem_badge-ready\"],null],\" \",[33,[\"if\"],[[28,[\"model\",\"project\",\"warning\"]],\"td_project_info_elem_badge-warning\"],null],\" \"]]],[13],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"model\",\"project\",\"warning\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-exclamation\"],[13],[14]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"project\",\"ready\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-check\"],[13],[14]],\"locals\":[]},{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-flask\"],[13],[14]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_text\"],[13],[0,\"\\n        \"],[11,\"h5\",[]],[15,\"class\",\"td_project_info_elem_text_ttl aa_text--base\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"model\",\"project\",\"warning\"]]],null,{\"statements\":[[1,[28,[\"model\",\"project\",\"warning\",\"title\"]],false]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"project\",\"ready\"]]],null,{\"statements\":[[0,\"Ready\"]],\"locals\":[]},{\"statements\":[[0,\"Under progress\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[15,\"class\",\"td_project_info_elem_text_detail\"],[13],[6,[\"if\"],[[28,[\"model\",\"project\",\"warning\"]]],null,{\"statements\":[[1,[28,[\"model\",\"project\",\"warning\",\"text\"]],false]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"td_doc\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[15,\"class\",\"td_doc_title aa_text--base\"],[13],[1,[28,[\"model\",\"document\",\"name\"]],false],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[15,\"class\",\"td_doc_text\"],[13],[0,\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum convallis mauris,\\n      non vestibulum quam imperdiet non. Cras vel nisi lacus. Quisque sollicitudin ex vel tempus lobortis.\"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_doc_peak\"],[13],[0,\"\\n\"],[6,[\"scroll-to\"],null,[[\"href\",\"class\",\"duration\",\"offset\"],[\"#page_1\",\"td_doc_peak_elem td_noformat\",300,-10]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_doc td_projects_elem_doc-warning aa_pb aa_pb--133\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"scroll-to\"],null,[[\"href\",\"class\",\"duration\",\"offset\"],[\"#page_2\",\"td_doc_peak_elem td_noformat\",300,-10]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_doc aa_pb aa_pb--133\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"scroll-to\"],null,[[\"href\",\"class\",\"duration\",\"offset\"],[\"#page_3\",\"td_doc_peak_elem td_noformat\",300,-10]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_doc aa_pb aa_pb--133\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"scroll-to\"],null,[[\"href\",\"class\",\"duration\",\"offset\"],[\"#page_4\",\"td_doc_peak_elem td_noformat\",300,-10]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_doc td_projects_elem_doc-ready aa_pb aa_pb--133\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"scroll-to\"],null,[[\"href\",\"class\",\"duration\",\"offset\"],[\"#page_5\",\"td_doc_peak_elem td_noformat\",300,-10]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_doc td_projects_elem_doc-ready aa_pb aa_pb--133\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"scroll-to\"],null,[[\"href\",\"class\",\"duration\",\"offset\"],[\"#page_6\",\"td_doc_peak_elem td_noformat\",300,-10]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_doc td_projects_elem_doc-ready aa_pb aa_pb--133\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages aa_noverflow\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"id\",\"page_1\"],[15,\"class\",\"td_doc_pages_elem\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_notes\"],[13],[0,\"\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_doc_pages_elem_notes_elem td_doc_pages_elem_notes_elem-warning\"],[13],[0,\"Signature\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_page aa_noverflow\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb aa_pb--133\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem td_doc_pages_elem_page_\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_doc_pages_elem_page_note td_doc_pages_elem_page_note-warning\"],[15,\"style\",\"bottom: 5%; left: 20%; width: 25%;\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"id\",\"page_2\"],[15,\"class\",\"td_doc_pages_elem\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_notes\"],[13],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_page aa_noverflow\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb aa_pb--133\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem td_doc_pages_elem_page_\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"id\",\"page_3\"],[15,\"class\",\"td_doc_pages_elem\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_notes\"],[13],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_page aa_noverflow\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb aa_pb--133\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem td_doc_pages_elem_page_\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"id\",\"page_4\"],[15,\"class\",\"td_doc_pages_elem\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_notes\"],[13],[0,\"\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_doc_pages_elem_notes_elem td_doc_pages_elem_notes_elem-ready\"],[13],[0,\"Signature\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_page aa_noverflow\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb aa_pb--133\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem td_doc_pages_elem_page_\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_doc_pages_elem_page_note td_doc_pages_elem_page_note-ready\"],[15,\"style\",\"bottom: 5%; left: 20%; width: 25%;\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"id\",\"page_5\"],[15,\"class\",\"td_doc_pages_elem\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_notes\"],[13],[0,\"\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_doc_pages_elem_notes_elem td_doc_pages_elem_notes_elem-ready\"],[13],[0,\"Signature\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_page aa_noverflow\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb aa_pb--133\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem td_doc_pages_elem_page_\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_doc_pages_elem_page_note td_doc_pages_elem_page_note-ready\"],[15,\"style\",\"bottom: 5%; left: 20%; width: 25%;\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"id\",\"page_6\"],[15,\"class\",\"td_doc_pages_elem\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_notes\"],[13],[0,\"\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_doc_pages_elem_notes_elem td_doc_pages_elem_notes_elem-ready\"],[13],[0,\"Signature\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_page aa_noverflow\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"aa_pb aa_pb--133\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem td_doc_pages_elem_page_\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_doc_pages_elem_page_note td_doc_pages_elem_page_note-ready\"],[15,\"style\",\"bottom: 5%; left: 20%; width: 25%;\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"td_docs\"],[13],[0,\"\\n    \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name td_project_info_elem_name-right aa_text--base aa_noverflow\"],[13],[0,\"Other documents\"],[14],[0,\"\\n\\n    \"],[11,\"ul\",[]],[15,\"class\",\"td_projects\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"other\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[15,\"class\",\"td_projects_elem\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"document\",[28,[\"model\",\"project\",\"id\"]],[28,[\"doc\",\"id\"]]],[[\"class\"],[\"td_projects_elem_ td_noformat\"]],{\"statements\":[[0,\"            \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_projects_elem_doc \",[33,[\"if\"],[[28,[\"doc\",\"ready\"]],\"td_projects_elem_doc-ready\"],null],\" \",[33,[\"if\"],[[28,[\"doc\",\"warning\"]],\"td_projects_elem_doc-warning\"],null],\" aa_pb aa_pb--133\"]]],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"doc\",\"ready\"]]],null,{\"statements\":[[0,\"                  \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-check\"],[13],[14],[11,\"br\",[]],[13],[14],[0,\"Ready\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"doc\",\"warning\"]]],null,{\"statements\":[[0,\"                  \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-exclamation\"],[13],[14],[11,\"br\",[]],[13],[14],[1,[28,[\"doc\",\"warning\"]],false],[14],[0,\"\\n                \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"h3\",[]],[15,\"class\",\"td_projects_elem_ttl aa_text--base\"],[13],[1,[28,[\"doc\",\"name\"]],false],[14],[0,\"\\n\\n            \"],[11,\"p\",[]],[15,\"class\",\"td_projects_elem_note\"],[13],[1,[28,[\"doc\",\"note\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[\"doc\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/document.hbs" } });
});
define("the-doc/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "G1otWHYb", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/index.hbs" } });
});
define("the-doc/templates/project", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FRpiGLPa", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"td\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[15,\"class\",\"td_project_ttl aa_text--base\"],[13],[1,[28,[\"model\",\"name\"]],false],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"td_project_info\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Contractor\"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_badge td_project_info_elem_badge-face\"],[13],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_text\"],[13],[0,\"\\n        \"],[11,\"h5\",[]],[15,\"class\",\"td_project_info_elem_text_ttl aa_text--base\"],[13],[1,[28,[\"model\",\"contractor\",\"name\"]],false],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[15,\"class\",\"td_project_info_elem_text_detail\"],[13],[1,[28,[\"model\",\"contractor\",\"address\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Status\"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_project_info_elem_badge \",[33,[\"if\"],[[28,[\"model\",\"ready\"]],\"td_project_info_elem_badge-ready\"],null],\" \",[33,[\"if\"],[[28,[\"model\",\"warning\"]],\"td_project_info_elem_badge-warning\"],null],\" \"]]],[13],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"model\",\"warning\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-exclamation\"],[13],[14]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"ready\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-check\"],[13],[14]],\"locals\":[]},{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-flask\"],[13],[14]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_text\"],[13],[0,\"\\n        \"],[11,\"h5\",[]],[15,\"class\",\"td_project_info_elem_text_ttl aa_text--base\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"model\",\"warning\"]]],null,{\"statements\":[[1,[28,[\"model\",\"warning\",\"title\"]],false]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"ready\"]]],null,{\"statements\":[[0,\"Ready\"]],\"locals\":[]},{\"statements\":[[0,\"Under progress\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[15,\"class\",\"td_project_info_elem_text_detail\"],[13],[6,[\"if\"],[[28,[\"model\",\"warning\"]]],null,{\"statements\":[[1,[28,[\"model\",\"warning\",\"text\"]],false]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Documents\"],[14],[0,\"\\n\\n  \"],[11,\"ul\",[]],[15,\"class\",\"td_projects\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"documents\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[15,\"class\",\"td_projects_elem\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"document\",[28,[\"model\",\"id\"]],[28,[\"doc\",\"id\"]]],[[\"class\"],[\"td_projects_elem_ td_noformat\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_projects_elem_doc \",[33,[\"if\"],[[28,[\"doc\",\"ready\"]],\"td_projects_elem_doc-ready\"],null],\" \",[33,[\"if\"],[[28,[\"doc\",\"warning\"]],\"td_projects_elem_doc-warning\"],null],\" aa_pb aa_pb--133\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"doc\",\"ready\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-check\"],[13],[14],[11,\"br\",[]],[13],[14],[0,\"Ready\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"doc\",\"warning\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-exclamation\"],[13],[14],[11,\"br\",[]],[13],[14],[1,[28,[\"doc\",\"warning\"]],false],[14],[0,\"\\n              \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n          \"],[11,\"h3\",[]],[15,\"class\",\"td_projects_elem_ttl aa_text--base\"],[13],[1,[28,[\"doc\",\"name\"]],false],[14],[0,\"\\n\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_projects_elem_note\"],[13],[1,[28,[\"doc\",\"note\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"doc\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/project.hbs" } });
});
define("the-doc/templates/projects", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WEw/yRVc", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"td\"],[13],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"td_projects\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[15,\"class\",\"td_projects_elem\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"project\",[28,[\"project\",\"id\"]]],[[\"class\"],[\"td_projects_elem_ td_noformat\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_projects_elem_doc \",[33,[\"if\"],[[28,[\"project\",\"ready\"]],\"td_projects_elem_doc-ready\"],null],\" \",[33,[\"if\"],[[28,[\"project\",\"warning\"]],\"td_projects_elem_doc-warning\"],null],\" aa_pb aa_pb--133\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"project\",\"ready\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-check\"],[13],[14],[11,\"br\",[]],[13],[14],[0,\"Ready\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"project\",\"warning\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-exclamation\"],[13],[14],[11,\"br\",[]],[13],[14],[1,[28,[\"project\",\"warning\"]],false],[14],[0,\"\\n              \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n          \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_face\"],[13],[14],[0,\"\\n\\n          \"],[11,\"h3\",[]],[15,\"class\",\"td_projects_elem_ttl aa_text--base\"],[13],[1,[28,[\"project\",\"name\"]],false],[14],[0,\"\\n\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_projects_elem_note\"],[13],[1,[28,[\"project\",\"note\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"project\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/projects.hbs" } });
});


define('the-doc/config/environment', ['ember'], function(Ember) {
  var prefix = 'the-doc';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("the-doc/app")["default"].create({"name":"the-doc","version":"0.0.0+dd5869c8"});
}
//# sourceMappingURL=the-doc.map
