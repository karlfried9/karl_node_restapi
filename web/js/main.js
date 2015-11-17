require.config({
  shim: {
    jquery: {
      exports: '$'
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    select2: {
      deps: [
        'jquery'
      ]
    },
    icheck: {
      deps: [
        'jquery'
      ]
    },
    redactor: {
      deps: [
        'jquery'
      ]
    }
  },
  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    bootstrap: '../vendor/bootstrap-sass/assets/javascripts/bootstrap.min',
    underscore: '../vendor/underscore/underscore',
    select2: '../vendor/select2/dist/js/select2',
    autosize: '../vendor/autosize/dist/autosize',
    icheck: '../vendor/icheck/icheck.min',
    redactor: '../vendor/imperavi-redactor/redactor/redactor.min'
  },
  packages: [

  ]
});


require(['jquery'], function ($) {
    

});


require(['jquery', 'autosize', 'bootstrap', 'select2', 'icheck', 'redactor'], function ($, autosize) {

  // Fix Bootstrap modals preventing select2 fields from focusing
  $.fn.modal.Constructor.prototype.enforceFocus = function () {};

  function initPlugins() {
  

  }

  $(function () {

    initPlugins();

  

    $(document).on('click', '.collection .remove-item', function() {
      $(this).closest('.item').remove();
    });

  });

  });