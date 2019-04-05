
(function ($, Drupal, drupalSettings) {

    'use strict';

    Drupal.behaviors.lambdaForm = {
      attach: function (context, settings) {
        const form = document.getElementById('lambda-form');
        const url = form.action;
        const toast = document.getElementById('edit-toast');
        const submit = document.getElementById('edit-submit');

        function post(url, body, callback) {
          var req = new XMLHttpRequest();
          req.open("POST", url, true);
          req.setRequestHeader("Content-Type", "application/json");
          req.addEventListener("load", function () {
            if (req.status < 400) {
              callback(null, JSON.parse(req.responseText));
            } else {
              console.log('Request failed: ' + req.responseText);
              const message = (req.status < 500) ? req.responseText : 'There was an error with sending your message, hold up until I fix it. Thanks for waiting.';
              callback(new Error(message));
            }
          });
          req.send(JSON.stringify(body));
        }

        function success () {
          toast.innerHTML = 'Thanks for sending me a message! I\'ll get in touch with you ASAP. :)';
          submit.disabled = false;
          submit.blur();
          form.name.focus();
          form.name.value = '';
          form.email.value = '';
          form.content.value = '';
        }

        function error (err) {
          toast.innerHTML = err.message;
          submit.disabled = false;
        }

        $('form#lambda-form').once('lambda.form').each(function () {
          form.addEventListener('submit', function (e) {
            e.preventDefault();
            toast.innerHTML = 'Sending';
            submit.disabled = true;

            const payload = {
              name: form.name.value,
              email: form.email.value,
              content: form.content.value
            };
            post(url, payload, function (err, res) {
              if (err) {
                return error(err)
              }
              success();
            })
          })
        });
      },

    };

})(jQuery, Drupal, drupalSettings);
