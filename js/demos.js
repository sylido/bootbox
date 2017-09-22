var shiftWindow = function () {
    scrollBy(0, -85)
};

$(function () {
    if (window.location.hash) {
        shiftWindow();
    }

    var doc = $('html, body');
    var canPushState = false;
    if (typeof history.pushState === "function") {
        // Yup, have it
        canPushState = true;
    }

    try {
        window.prettyPrint && prettyPrint();
        
        $('#download-bootbox').on('click', function(e){
            e.preventDefault();

            bootbox.alert({
                title: 'Bootbox.js',
                message: '<h3><i class="fa fa-smile-o"></i> Hey there!</h3> <p>Thank you for your interest. Unfortunately, Bootbox 5 is not ready for distribution yet. ' 
                    + 'If you want to start testing it, grab <a href="https://github.com/tiesont/bootbox">the source code</a> and ' 
                    + 'report any issues you find.</p>'
            });
        });

        Example.init({
            "selector": ".bb-alert"
        });

        if(anchors){
            anchors.options.placement = 'left';
            anchors.add('.bb-example .bb-anchor');
        }
    }
    catch (ex) {
        console.log(ex.message);
    }

    try {
        $(document)
            .on('click', '.dropdown-menu a[href^="#"]', function (e) {
                e.preventDefault();

                var target = $(this).attr('href');
                var offset = 75;

                if (target && $(target).offset()) {
                    offset = $(target).offset().top - 85;
                }

                doc.animate({
                    scrollTop: offset
                }, 'slow', function () {
                    if (canPushState) {
                        history.pushState(null, null, target);
                    }
                });
            });
    }
    catch (ex) {
        console.log(ex.message);
    }


    try {
        var locales = Object.keys(bootbox.locales());
        for(var i = 0; i < locales.length; i++){
            var option = $('<option value=""></option>');
            option.attr('value', locales[i]);
            option.html(locales[i]);

            $('#locales').append(option);
        }

        $('.example-button').on('click', function (e) {
            e.preventDefault();

            var key = $(this).data('bb-example-key');
            if ($.trim(key) != "") {
                switch (key) {

                    /* Alerts */

                    case 'alert-default':
                        bootbox.alert("This is the default alert!");
                        Example.show('Default alert');
                        break;

                    case 'alert-callback':
                        bootbox.alert("This is an alert with a callback!", function () {
                            Example.show('This was logged in the callback!');
                        });
                        break;

                    case 'alert-options':
                        bootbox.alert({
                            message: "This is an alert with a callback!",
                            callback: function () {
                                Example.show('This was logged in the callback!');
                            }
                        });
                        break;

                    case 'alert-small':
                        bootbox.alert({
                            message: "This is the small alert!",
                            size: 'small'
                        });
                        Example.show('Small alert shown');
                        break;

                    case 'alert-large':
                        bootbox.alert({
                            message: "This is the large alert!",
                            size: 'large'
                        });
                        Example.show('Large alert shown');
                        break;

                    case 'alert-custom-class':
                        bootbox.alert({
                            message: "This is an alert with an additional class!",
                            className: 'rubberBand animated'
                        });
                        Example.show('Custom class alert shown');
                        break;

                    case 'alert-overlay-click':
                        bootbox.alert({
                            message: "This alert can be dismissed by clicking on the background!",
                            backdrop: true
                        });
                        Example.show('Dismissable background alert shown');
                        break;
                        
                    case 'alert-locale':
                        bootbox.alert({
                            message: "This alert uses the Arabic locale!",
                            locale: 'ar'
                        });
                        Example.show('Arabic locale alert shown');
                        break;


                        /* Confirms */

                    case 'confirm-default':
                        bootbox.confirm("This is the default confirm.", function (result) {
                            Example.show('This was logged in the callback: ' + result);
                        });
                        break;

                    case 'confirm-options':
                        bootbox.confirm({
                            message: "This is a confirm with custom button text and color! Do you like it?",
                            buttons: {
                                confirm: {
                                    label: 'Yes',
                                    className: 'btn-success'
                                },
                                cancel: {
                                    label: 'No',
                                    className: 'btn-danger'
                                }
                            },
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'confirm-button-text':
                        bootbox.confirm({
                            title: "Destroy planet?",
                            message: "Do you want to activate the Deathstar now? This cannot be undone.",
                            buttons: {
                                cancel: {
                                    label: '<i class="fa fa-times"></i> Cancel'
                                },
                                confirm: {
                                    label: '<i class="fa fa-check"></i> Confirm'
                                }
                            },
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;
                        
                    case 'confirm-locale':
                        var locale = $('#locales').val();
                        bootbox.confirm({
                            message: "This confirm uses the selected locale. Were the labels what you expected?",
                            locale: locale,
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;


                        /* Prompts */
                    case 'prompt-default':
                        bootbox.prompt("This is the default prompt!", function (result) {
                            Example.show('This was logged in the callback: ' + result);
                        });
                        break;
                        
                    case 'prompt-custom-locale':
                        var locale = {
                            OK: 'I Suppose',
                            CONFIRM: 'Go Ahead',
                            CANCEL: 'Maybe Not'
                        };

                        bootbox.addLocale('custom', locale);

                        bootbox.prompt({ 
                            title: "This is a prompt with a custom locale! What do you think?", 
                            locale: 'custom',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-checkbox':
                        bootbox.prompt({
                            title: "This is a prompt with a set of checkbox inputs!",
                            inputType: 'checkbox',
                            inputOptions: [
                                {
                                    text: 'Choice One',
                                    value: '1',
                                },
                                {
                                    text: 'Choice Two',
                                    value: '2',
                                },
                                {
                                    text: 'Choice Three',
                                    value: '3',
                                }
                            ],
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;
                        
                        case 'prompt-radio':
                            bootbox.prompt({
                                title: "This is a prompt with a set of radio inputs!",
                                message: '<p>Please select an option below:</p>',
                                inputType: 'radio',
                                inputOptions: [
                                    {
                                        text: 'Choice One',
                                        value: '1',
                                    },
                                    {
                                        text: 'Choice Two',
                                        value: '2',
                                    },
                                    {
                                        text: 'Choice Three',
                                        value: '3',
                                    }
                                ],
                                callback: function (result) {
                                    Example.show('This was logged in the callback: ' + result);
                                }
                            });
                            break;

                    case 'prompt-date':
                        bootbox.prompt({
                            title: "This is a prompt with a date input!",
                            inputType: 'date',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-email':
                        bootbox.prompt({
                            title: "This is a prompt with an email input!",
                            inputType: 'email',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-number':
                        bootbox.prompt({
                            title: "This is a prompt with a number input!",
                            inputType: 'number',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-password':
                        bootbox.prompt({
                            title: "This is a prompt with a password input!",
                            inputType: 'password',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-select':
                        bootbox.prompt({
                            title: "This is a prompt with select!",
                            inputType: 'select',
                            inputOptions: [
                                {
                                    text: 'Choose one...',
                                    value: '',
                                },
                                {
                                    text: 'Choice One',
                                    value: '1',
                                },
                                {
                                    text: 'Choice Two',
                                    value: '2',
                                },
                                {
                                    text: 'Choice Three',
                                    value: '3',
                                }
                            ],
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-textarea':
                        bootbox.prompt({
                            title: "This is a prompt with a textarea!",
                            inputType: 'textarea',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;

                    case 'prompt-time':
                        bootbox.prompt({
                            title: "This is a prompt with a time input!",
                            inputType: 'time',
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;
                        
                    case 'prompt-range':
                        bootbox.prompt({
                            title: "This is a prompt with a range input!",
                            inputType: 'range',
                            min: 0,
                            max: 100,
                            step: 5,
                            value: 35,
                            callback: function (result) {
                                Example.show('This was logged in the callback: ' + result);
                            }
                        });
                        break;


                        /* Custom dialogs */

                    case 'custom-dialog-as-overlay':
                        var timeout = 3000; // 3 seconds
                        var dialog = bootbox.dialog({
                            message: '<p class="text-center mb-0">Please wait while we do something...</p>',
                            closeButton: false
                        });

                        setTimeout(function () {
                            dialog.modal('hide');
                        }, timeout);

                        break;

                    case 'custom-dialog-init':
                        var dialog = bootbox.dialog({
                            title: 'A custom dialog with init',
                            message: '<p class="mb-0"><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
                        });

                        dialog.init(function () {
                            setTimeout(function () {
                                dialog.find('.bootbox-body').html('<p class="mb-0">I was loaded after the dialog was shown!</p>');
                            }, 3000);
                        });

                        break;
                }
            }
        });
    }
    catch (ex) {
        console.log(ex.message);
    }

});