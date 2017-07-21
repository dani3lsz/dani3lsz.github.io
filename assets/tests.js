'use strict';

define('the-doc/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/draw-canvas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/draw-canvas.js should pass ESLint\n\n');
  });

  QUnit.test('components/nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-bar.js should pass ESLint\n\n');
  });

  QUnit.test('components/upload-field.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/upload-field.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/document.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/document.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/documents.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/documents.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/document-count.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/document-count.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/get-page-padding.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-page-padding.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/is-equal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/is-equal.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/not-equal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/not-equal.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/note-helper-style.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/note-helper-style.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/page-anchor-id.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/page-anchor-id.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/page-note-style.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/page-note-style.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/status-icon-class.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/status-icon-class.js should pass ESLint\n\n');
  });

  QUnit.test('models/document.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/document.js should pass ESLint\n\n');
  });

  QUnit.test('models/redacted-elem.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/redacted-elem.js should pass ESLint\n\n');
  });

  QUnit.test('models/redacted.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/redacted.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/document.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/document.js should pass ESLint\n\n');
  });

  QUnit.test('routes/documents.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/documents.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('services/data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/data.js should pass ESLint\n\n');
  });

  QUnit.test('services/docu.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/docu.js should pass ESLint\n\n');
  });

  QUnit.test('services/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/login.js should pass ESLint\n\n');
  });
});
define('the-doc/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    _ember.default.run(application, 'destroy');
  }
});
define('the-doc/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'the-doc/tests/helpers/start-app', 'the-doc/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var Promise = _ember.default.RSVP.Promise;
});
define('the-doc/tests/helpers/resolver', ['exports', 'the-doc/resolver', 'the-doc/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('the-doc/tests/helpers/start-app', ['exports', 'ember', 'the-doc/app', 'the-doc/config/environment'], function (exports, _ember, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = _ember.default.merge({}, _environment.default.APP);
    attributes = _ember.default.merge(attributes, attrs); // use defaults, but you can override;

    return _ember.default.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('the-doc/tests/integration/components/draw-canvas-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('draw-canvas', 'Integration | Component | draw canvas', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "9Zwiq1eY",
      "block": "{\"statements\":[[1,[26,[\"draw-canvas\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Sx/I1dyt",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"draw-canvas\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('the-doc/tests/integration/components/nav-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('nav-bar', 'Integration | Component | nav bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ntAlUnVm",
      "block": "{\"statements\":[[1,[26,[\"nav-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "UKwhv7kh",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"nav-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('the-doc/tests/integration/components/upload-field-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('upload-field', 'Integration | Component | upload field', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "iZVHfWiA",
      "block": "{\"statements\":[[1,[26,[\"upload-field\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7zxwU6jM",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"upload-field\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('the-doc/tests/integration/helpers/document-count-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('document-count', 'helper:document-count', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "MBD13Wto",
      "block": "{\"statements\":[[1,[33,[\"document-count\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/integration/helpers/get-page-padding-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('get-page-padding', 'helper:get-page-padding', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "zw2rBdjn",
      "block": "{\"statements\":[[1,[33,[\"get-page-padding\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/integration/helpers/is-equal-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('is-equal', 'helper:is-equal', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "c7U3Ujiu",
      "block": "{\"statements\":[[1,[33,[\"is-equal\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/integration/helpers/not-equal-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('not-equal', 'helper:not-equal', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "B2bFh99Z",
      "block": "{\"statements\":[[1,[33,[\"not-equal\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/integration/helpers/note-helper-style-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('note-helper-style', 'helper:note-helper-style', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "Yhq8YT7e",
      "block": "{\"statements\":[[1,[33,[\"note-helper-style\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/integration/helpers/page-anchor-id-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('page-anchor-id', 'helper:page-anchor-id', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "mQfD/tO/",
      "block": "{\"statements\":[[1,[33,[\"page-anchor-id\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/integration/helpers/page-note-style-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('page-note-style', 'helper:page-note-style', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "8CmqGSEu",
      "block": "{\"statements\":[[1,[33,[\"page-note-style\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/integration/helpers/status-icon-class-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('status-icon-class', 'helper:status-icon-class', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "tU6LXX1S",
      "block": "{\"statements\":[[1,[33,[\"status-icon-class\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('the-doc/tests/test-helper', ['the-doc/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('the-doc/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/draw-canvas-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/draw-canvas-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/nav-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/nav-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/upload-field-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/upload-field-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/document-count-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/document-count-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/get-page-padding-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/get-page-padding-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/is-equal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/is-equal-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/not-equal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/not-equal-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/note-helper-style-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/note-helper-style-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/page-anchor-id-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/page-anchor-id-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/page-note-style-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/page-note-style-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/status-icon-class-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/status-icon-class-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/document-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/document-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/documents-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/documents-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/document-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/document-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/redacted-elem-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/redacted-elem-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/redacted-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/redacted-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/document-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/document-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/documents-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/documents-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/login-test.js should pass ESLint\n\n');
  });
});
define('the-doc/tests/unit/controllers/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('the-doc/tests/unit/controllers/document-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:document', 'Unit | Controller | document', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('the-doc/tests/unit/controllers/documents-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:documents', 'Unit | Controller | documents', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('the-doc/tests/unit/controllers/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:index', 'Unit | Controller | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('the-doc/tests/unit/models/document-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('document', 'Unit | Model | document', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('the-doc/tests/unit/models/redacted-elem-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('redacted-elem', 'Unit | Model | redacted elem', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('the-doc/tests/unit/models/redacted-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('redacted', 'Unit | Model | redacted', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('the-doc/tests/unit/routes/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('the-doc/tests/unit/routes/document-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:document', 'Unit | Route | document', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('the-doc/tests/unit/routes/documents-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:documents', 'Unit | Route | documents', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('the-doc/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('the-doc/tests/unit/services/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:login', 'Unit | Service | login', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
require('the-doc/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
