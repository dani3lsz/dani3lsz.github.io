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
define('the-doc/components/nav-bar', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({
    login: _ember.default.inject.service('login'),
    loggedIn: _ember.default.computed(function () {
      return this.get('login').loggedIn;
    }),
    actions: {
      loggingOut: function loggingOut() {
        this.get('login').logOut();
        this.set('loggedIn', this.get('login').loggedIn);
        this.sendAction('logOut');
      },
      loggingIn: function loggingIn() {
        this.get('login').logIn();
        this.set('loggedIn', this.get('login').loggedIn);
        this.sendAction('logIn');
      }
    }
  });
});
define('the-doc/components/project-header', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({});
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
define('the-doc/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({
    actions: {
      logOut: function logOut() {
        this.transitionToRoute('index');
      },
      logIn: function logIn() {
        this.transitionToRoute('projects');
      }
    }
  });
});
define('the-doc/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({});
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
define("the-doc/helpers/get-page-padding", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getPagePadding = getPagePadding;
  function getPagePadding(params /*, hash*/) {
    if (!params.length) return;

    var w = params[0].width;
    var h = params[0].height;

    return Math.round(h / w * 1000) / 10 + "%";
  }

  exports.default = _ember.default.Helper.helper(getPagePadding);
});
define('the-doc/helpers/not-equal', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.notEqual = notEqual;
  function notEqual(params /*, hash*/) {
    if (!params.length) return;

    var side1 = params[0];
    var side2 = params[1];

    return side1 !== side2;
  }

  exports.default = _ember.default.Helper.helper(notEqual);
});
define("the-doc/helpers/page-anchor-id", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pageAnchorId = pageAnchorId;
  function pageAnchorId(params /*, hash*/) {
    if (!params.length) return;

    return "#page_" + params[0];
  }

  exports.default = _ember.default.Helper.helper(pageAnchorId);
});
define("the-doc/helpers/page-note-style", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pageNoteStyle = pageNoteStyle;
  function pageNoteStyle(params /*, hash*/) {
    if (!params.length) return;

    var page = params[0];
    var note = params[1];

    var top = Math.round(note.top / page.height * 1000) / 10 + "%";
    var right = Math.round((1 - note.right / page.width) * 1000) / 10 + "%";
    var bottom = Math.round((1 - note.bottom / page.height) * 1000) / 10 + "%";
    var left = Math.round(note.left / page.width * 1000) / 10 + "%";

    return "top: " + top + "; right: " + right + "; bottom: " + bottom + "; left: " + left + ";";
  }

  exports.default = _ember.default.Helper.helper(pageNoteStyle);
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
define("the-doc/helpers/status-icon-class", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.statusIconClass = statusIconClass;
  function statusIconClass(params /*, hash*/) {
    if (!params.length) return;

    var status = params[0];
    var iconClass = "";

    if (status === "ready") {
      iconClass = "fa fa-check";
    } else if (status === "warning" || status === "error" || status === "missing") {
      iconClass = "fa fa-exclamation";
    } else if (status === "normal") {
      iconClass = "fa fa-flask";
    }

    return iconClass;
  }

  exports.default = _ember.default.Helper.helper(statusIconClass);
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
define('the-doc/routes/application', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('the-doc/routes/document', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    login: _ember.default.inject.service('login'),
    data: _ember.default.inject.service('data'),
    beforeModel: function beforeModel() {
      if (!this.get('login').loggedIn) {
        this.transitionTo('index');
      }
    },
    model: function model(params) {
      var project = this.get('data').data.filter(function (project) {
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
  exports.default = _ember.default.Route.extend({
    login: _ember.default.inject.service('login'),
    beforeModel: function beforeModel() {
      if (this.get('login').loggedIn) {
        this.transitionTo('projects');
      }
    }
  });
});
define('the-doc/routes/project', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    login: _ember.default.inject.service('login'),
    data: _ember.default.inject.service('data'),
    beforeModel: function beforeModel() {
      if (!this.get('login').loggedIn) {
        this.transitionTo('index');
      }
    },
    model: function model(params) {
      return this.get('data').data.filter(function (project) {
        return project.id === params.project_id;
      })[0];
    }
  });
});
define('the-doc/routes/projects', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    login: _ember.default.inject.service('login'),
    data: _ember.default.inject.service('data'),
    beforeModel: function beforeModel() {
      if (!this.get('login').loggedIn) {
        this.transitionTo('index');
      }
    },
    model: function model() {
      return this.get('data').data;
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
define("the-doc/services/data", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Service.extend({
    init: function init() {
      this._super.apply(this, arguments);
    },


    data: [{
      id: "1",
      name: "Some project name",
      note: "Some short note",
      status: "ready",
      statusMessage: "Ready",
      statusMessageAdditional: "",
      contractor: {
        name: "Some Body",
        address: "Address, California"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "4",
        name: "Document name",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }]
    }, {
      id: "2",
      name: "Other project name",
      note: "Some short note",
      status: "error",
      statusMessage: "Missing document",
      statusMessageAdditional: "Upload Required document name",
      contractor: {
        name: "Some Body",
        address: "Address, New York"
      },
      documents: [{
        id: "1",
        name: "Certificate of eligibility",
        note: "for Department of Homeland Security",
        status: "warning",
        statusMessage: "Unfilled pages",
        pages: {
          1: {
            status: "warning",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/form/page_1.jpg",
            notes: [{
              id: "1_1_0",
              status: "ready",
              title: "Remarks",
              top: 962,
              right: 1165,
              bottom: 1060,
              left: 106
            }, {
              id: "1_1_1",
              status: "warning",
              title: "Signature needed",
              top: 1206,
              right: 637,
              bottom: 1206,
              left: 106
            }, {
              id: "1_1_2",
              status: "warning",
              title: "Signature needed",
              top: 1364,
              right: 721,
              bottom: 1364,
              left: 106
            }, {
              id: "1_1_3",
              status: "warning",
              title: "Date needed",
              top: 1364,
              right: 1039,
              bottom: 1364,
              left: 743
            }]
          },
          2: {
            status: "warning",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/form/page_2.jpg",
            notes: [{
              id: "1_2_0",
              status: "warning",
              title: "Employment status needed",
              top: 295,
              right: 610,
              bottom: 295,
              left: 111
            }, {
              id: "1_2_1",
              status: "warning",
              title: "Type needed",
              top: 295,
              right: 1160,
              bottom: 295,
              left: 651
            }, {
              id: "1_2_2",
              status: "warning",
              title: "Employment start date needed",
              top: 340,
              right: 610,
              bottom: 340,
              left: 111
            }, {
              id: "1_2_3",
              status: "warning",
              title: "Employment end date needed",
              top: 340,
              right: 1160,
              bottom: 340,
              left: 651
            }, {
              id: "1_2_4",
              status: "warning",
              title: "Employer name needed",
              top: 385,
              right: 610,
              bottom: 385,
              left: 111
            }, {
              id: "1_2_5",
              status: "warning",
              title: "Employer location needed",
              top: 385,
              right: 1160,
              bottom: 385,
              left: 651
            }, {
              id: "1_2_6",
              status: "normal",
              title: "Comments",
              top: 425,
              right: 1160,
              bottom: 425,
              left: 111
            }]
          },
          3: {
            status: "normal",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/form/page_3.jpg"
          },
          4: {
            status: "warning",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/form/page_4.jpg",
            notes: [{
              id: "1_4_0",
              status: "warning",
              title: "Signature needed",
              top: 1233,
              right: 636,
              bottom: 1233,
              left: 108
            }, {
              id: "1_4_1",
              status: "warning",
              title: "Signature needed",
              top: 1391,
              right: 721,
              bottom: 1391,
              left: 108
            }, {
              id: "1_4_2",
              status: "warning",
              title: "Date needed",
              top: 1391,
              right: 1039,
              bottom: 1391,
              left: 743
            }, {
              id: "1_4_3",
              status: "warning",
              title: "Signature needed",
              top: 1442,
              right: 723,
              bottom: 1442,
              left: 426
            }]
          },
          5: {
            status: "warning",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/form/page_5.jpg",
            notes: [{
              id: "1_5_0",
              status: "ready",
              title: "Remarks",
              top: 242,
              right: 1165,
              bottom: 339,
              left: 108
            }]
          },
          6: {
            status: "normal",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/form/page_6.jpg"
          }
        }
      }, {
        id: "2",
        name: "Grant Deed",
        note: "",
        status: "warning",
        statusMessage: "Unfilled pages",
        pages: {
          1: {
            status: "warning",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/grant_deed/page_1.jpg"
          },
          2: {
            status: "normal",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/grant_deed/page_2.jpg"
          }
        }
      }, {
        id: "3",
        name: "Purchase and Sale Agreement",
        note: "",
        status: "warning",
        statusMessage: "Unfilled pages",
        pages: {
          1: {
            status: "warning",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/purchaseagreement/page_1.jpg"
          },
          2: {
            status: "normal",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/purchaseagreement/page_2.jpg"
          },
          3: {
            status: "warning",
            width: 1275,
            height: 1650,
            url: "http://dani3lsz.github.io/assets/documents/purchaseagreement/page_3.jpg"
          }
        }
      }, {
        id: "4",
        name: "Required document name",
        status: "missing",
        statusMessage: "Missing document"
      }]
    }, {
      id: "3",
      name: "Third project name",
      note: "",
      status: "normal",
      statusMessage: "Under progress",
      statusMessageAdditional: "",
      contractor: {
        name: "Some Body",
        address: "Address, Washington"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        status: "warning",
        statusMessage: "missing information",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        status: "normal",
        statusMessage: "",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "4",
        name: "Document name",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }]
    }, {
      id: "4",
      name: "Fourth project name",
      note: "",
      status: "warning",
      statusMessage: "Deadline approaching",
      statusMessageAdditional: "deadline: July 19., 2017",
      contractor: {
        name: "Some Body",
        address: "Address, Texas"
      },
      documents: [{
        id: "1",
        name: "Some document name",
        note: "Some short note",
        status: "warning",
        statusMessage: "missing information",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "2",
        name: "Other document name",
        note: "Some short note",
        status: "normal",
        statusMessage: "",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "3",
        name: "Third document name",
        note: "Some short note",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }, {
        id: "4",
        name: "Document name",
        status: "ready",
        statusMessage: "Ready",
        pages: {
          1: {
            status: "ready",
            width: 1275,
            height: 1650,
            url: ""
          }
        }
      }]
    }]
  });
});
define('the-doc/services/login', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Service.extend({
    loggedIn: false,

    init: function init() {
      this._super.apply(this, arguments);
      this.set('loggedIn', localStorage.getItem('loggedIn').toString() === "true");
    },
    logIn: function logIn() {
      this.set('loggedIn', true);
      localStorage.setItem('loggedIn', this.get('loggedIn'));
    },
    logOut: function logOut() {
      this.set('loggedIn', false);
      localStorage.setItem('loggedIn', this.get('loggedIn'));
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
  exports.default = Ember.HTMLBars.template({ "id": "XzWkMwGd", "block": "{\"statements\":[[1,[33,[\"nav-bar\"],null,[[\"logOut\",\"logIn\"],[[33,[\"action\"],[[28,[null]],\"logOut\"],null],[33,[\"action\"],[[28,[null]],\"logIn\"],null]]]],false],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[11,\"footer\",[]],[15,\"class\",\"td_footer\"],[13],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/application.hbs" } });
});
define("the-doc/templates/components/nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8U2wzO1e", "block": "{\"statements\":[[11,\"nav\",[]],[15,\"class\",\"td_nav aa_text--condensed td_noformat aa_text--0\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"aa_text--bold aa_text--22\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"index\"],[[\"class\"],[\"\"]],{\"statements\":[[0,\"the\"],[11,\"span\",[]],[15,\"class\",\"aa_txtc-blue\"],[13],[0,\"Doc\"],[14]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"ul\",[]],[15,\"class\",\"td_nav_list\"],[13],[0,\"\\n    \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"projects\"],[[\"class\"],[\"td_nav_list_a\"]],{\"statements\":[[0,\"Projects\"]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"loggedIn\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[15,\"class\",\"aa_pull--right\"],[13],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"loggingOut\"]],[13],[0,\"Log Out\"],[14],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"li\",[]],[15,\"class\",\"aa_pull--right\"],[13],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"loggingIn\"]],[13],[0,\"Log In\"],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/components/nav-bar.hbs" } });
});
define("the-doc/templates/components/project-header", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gVx97ek0", "block": "{\"statements\":[[11,\"header\",[]],[13],[0,\"\\n  \"],[11,\"h1\",[]],[15,\"class\",\"td_project_ttl aa_text--base\"],[13],[1,[28,[\"project\",\"name\"]],false],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"td_project_info\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Contractor\"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_badge td_project_info_elem_badge-face\"],[13],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_text\"],[13],[0,\"\\n        \"],[11,\"h5\",[]],[15,\"class\",\"td_project_info_elem_text_ttl aa_text--base\"],[13],[1,[28,[\"project\",\"contractor\",\"name\"]],false],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[15,\"class\",\"td_project_info_elem_text_detail\"],[13],[1,[28,[\"project\",\"contractor\",\"address\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Status\"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_project_info_elem_badge td_project_info_elem_badge-\",[28,[\"project\",\"status\"]]]]],[13],[0,\"\\n        \"],[11,\"i\",[]],[16,\"class\",[34,[[33,[\"status-icon-class\"],[[28,[\"project\",\"status\"]]],null]]]],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"td_project_info_elem_text\"],[13],[0,\"\\n        \"],[11,\"h5\",[]],[15,\"class\",\"td_project_info_elem_text_ttl aa_text--base\"],[13],[0,\"\\n          \"],[1,[28,[\"project\",\"statusMessage\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"p\",[]],[15,\"class\",\"td_project_info_elem_text_detail\"],[13],[1,[28,[\"project\",\"statusMessageAdditional\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/components/project-header.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "Q6GgbW/W", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"td aa_clearfix\"],[13],[0,\"\\n  \"],[1,[33,[\"project-header\"],null,[[\"project\"],[[28,[\"model\",\"project\"]]]]],false],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"td_doc\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[15,\"class\",\"td_doc_title aa_text--base\"],[13],[1,[28,[\"model\",\"document\",\"name\"]],false],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[15,\"class\",\"td_doc_text\"],[13],[0,\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum convallis mauris,\\n      non vestibulum quam imperdiet non. Cras vel nisi lacus. Quisque sollicitudin ex vel tempus lobortis.\"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_doc_peak\"],[13],[0,\"\\n\"],[6,[\"each\"],[[33,[\"-each-in\"],[[28,[\"model\",\"document\",\"pages\"]]],null]],null,{\"statements\":[[6,[\"scroll-to\"],null,[[\"href\",\"class\",\"duration\",\"offset\"],[[33,[\"page-anchor-id\"],[[28,[\"key\"]]],null],\"td_doc_peak_elem td_noformat\",300,-10]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_projects_elem_doc td_projects_elem_doc-\",[28,[\"page\",\"status\"]],\" aa_pb\"]]],[16,\"style\",[34,[\"padding-bottom: \",[33,[\"get-page-padding\"],[[28,[\"page\"]]],null]]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"key\",\"page\"]},null],[0,\"    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages\"],[13],[0,\"\\n\"],[6,[\"each\"],[[33,[\"-each-in\"],[[28,[\"model\",\"document\",\"pages\"]]],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[16,\"id\",[34,[\"page_\",[28,[\"key\"]]]]],[15,\"class\",\"td_doc_pages_elem\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_notes\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"page\",\"notes\"]]],null,{\"statements\":[[0,\"              \"],[11,\"p\",[]],[16,\"class\",[34,[\"td_doc_pages_elem_notes_elem td_doc_pages_elem_notes_elem-\",[28,[\"note\",\"status\"]]]]],[13],[0,\"\\n                \"],[1,[28,[\"note\",\"title\"]],false],[0,\" \"],[11,\"button\",[]],[15,\"class\",\"td_doc_pages_elem_notes_elem_clear\"],[13],[0,\"×\"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"note\"]},null],[0,\"          \"],[14],[0,\"\\n\\n          \"],[11,\"div\",[]],[15,\"class\",\"td_doc_pages_elem_page aa_noverflow\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb\"],[16,\"style\",[34,[\"padding-bottom: \",[33,[\"get-page-padding\"],[[28,[\"page\"]]],null]]]],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem td_doc_pages_elem_page_\"],[13],[0,\"\\n                \"],[11,\"img\",[]],[16,\"src\",[34,[[28,[\"page\",\"url\"]]]]],[15,\"class\",\"aa_img\"],[13],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"page\",\"notes\"]]],null,{\"statements\":[[0,\"                  \"],[11,\"span\",[]],[16,\"class\",[34,[\"td_doc_pages_elem_page_note td_doc_pages_elem_page_note-\",[28,[\"note\",\"status\"]]]]],[16,\"style\",[33,[\"page-note-style\"],[[28,[\"page\"]],[28,[\"note\"]]],null],null],[13],[14],[0,\"\\n\"]],\"locals\":[\"note\"]},null],[0,\"              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"key\",\"page\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"td_docs\"],[13],[0,\"\\n    \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name td_project_info_elem_name-right aa_text--base aa_noverflow\"],[13],[0,\"Other documents\"],[14],[0,\"\\n\\n    \"],[11,\"ul\",[]],[15,\"class\",\"td_projects\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"other\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[15,\"class\",\"td_projects_elem\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"document\",[28,[\"model\",\"project\",\"id\"]],[28,[\"doc\",\"id\"]]],[[\"class\"],[\"td_projects_elem_ td_noformat\"]],{\"statements\":[[0,\"            \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_projects_elem_doc td_projects_elem_doc-\",[28,[\"doc\",\"status\"]],\" aa_pb aa_pb--133\"]]],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"not-equal\"],[[28,[\"doc\",\"status\"]],\"normal\"],null]],null,{\"statements\":[[0,\"                  \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[16,\"class\",[34,[[33,[\"status-icon-class\"],[[28,[\"doc\",\"status\"]]],null]]]],[13],[14],[11,\"br\",[]],[13],[14],[1,[28,[\"doc\",\"statusMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"h3\",[]],[15,\"class\",\"td_projects_elem_ttl aa_text--base\"],[13],[1,[28,[\"doc\",\"name\"]],false],[14],[0,\"\\n\\n            \"],[11,\"p\",[]],[15,\"class\",\"td_projects_elem_note\"],[13],[1,[28,[\"doc\",\"note\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[\"doc\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/document.hbs" } });
});
define("the-doc/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KHKu4KBA", "block": "{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/index.hbs" } });
});
define("the-doc/templates/project", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CThR8chm", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"td\"],[13],[0,\"\\n  \"],[1,[33,[\"project-header\"],null,[[\"project\"],[[28,[\"model\"]]]]],false],[0,\"\\n\\n  \"],[11,\"h4\",[]],[15,\"class\",\"td_project_info_elem_name aa_text--base\"],[13],[0,\"Documents\"],[14],[0,\"\\n\\n  \"],[11,\"ul\",[]],[15,\"class\",\"td_projects\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"documents\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[15,\"class\",\"td_projects_elem\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"document\",[28,[\"model\",\"id\"]],[28,[\"doc\",\"id\"]]],[[\"class\"],[\"td_projects_elem_ td_noformat\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_projects_elem_doc td_projects_elem_doc-\",[28,[\"doc\",\"status\"]],\" aa_pb aa_pb--133\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"not-equal\"],[[28,[\"doc\",\"status\"]],\"normal\"],null]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note\"],[13],[11,\"i\",[]],[16,\"class\",[34,[[33,[\"status-icon-class\"],[[28,[\"doc\",\"status\"]]],null]]]],[13],[14],[11,\"br\",[]],[13],[14],[1,[28,[\"doc\",\"statusMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n          \"],[11,\"h3\",[]],[15,\"class\",\"td_projects_elem_ttl aa_text--base\"],[13],[1,[28,[\"doc\",\"name\"]],false],[14],[0,\"\\n\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_projects_elem_note\"],[13],[1,[28,[\"doc\",\"note\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"doc\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/project.hbs" } });
});
define("the-doc/templates/projects", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BictKFwR", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"td\"],[13],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"td_projects\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[15,\"class\",\"td_projects_elem\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"project\",[28,[\"project\",\"id\"]]],[[\"class\"],[\"td_projects_elem_ td_noformat\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[16,\"class\",[34,[\"td_projects_elem_doc td_projects_elem_doc-\",[28,[\"project\",\"status\"]],\" aa_pb aa_pb--133\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"aa_pb__elem\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"not-equal\"],[[28,[\"project\",\"status\"]],\"normal\"],null]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_note td_projects_elem_doc_note-face\"],[13],[11,\"i\",[]],[16,\"class\",[34,[[33,[\"status-icon-class\"],[[28,[\"project\",\"status\"]]],null]]]],[13],[14],[11,\"br\",[]],[13],[14],[1,[28,[\"project\",\"statusMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-70\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"td_projects_elem_doc_span td_projects_elem_doc_span-50\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n          \"],[11,\"div\",[]],[15,\"class\",\"td_projects_elem_face\"],[13],[14],[0,\"\\n\\n          \"],[11,\"h3\",[]],[15,\"class\",\"td_projects_elem_ttl aa_text--base\"],[13],[1,[28,[\"project\",\"name\"]],false],[14],[0,\"\\n\\n          \"],[11,\"p\",[]],[15,\"class\",\"td_projects_elem_note\"],[13],[1,[28,[\"project\",\"note\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[\"project\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "the-doc/templates/projects.hbs" } });
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
  require("the-doc/app")["default"].create({"name":"the-doc","version":"0.0.0+aa45668c"});
}
//# sourceMappingURL=the-doc.map
