var bce = {
    buttons: {
        child: function()
        {
            $('a.btn.child-keys').on('click', function(e)
            {
                e.preventDefault();
                var html = bce.html.forms.child();
                $.fn.blockstrap.core.modal('Derive Child Keys', html);
            });
        },
        decode: function()
        {
            $('body').on('click', 'a.btn.btn-decode', function(e)
            {
                e.preventDefault();
                var raw_tx = $(this).attr('data-raw');
                var chain = $(this).attr('data-chain');
                var wrapper = $('#' + $(this).attr('data-id'));
                var tx = bce.tx.decode(raw_tx, chain);
                var html = '';
                html+= '<span class="alert alert-info alert-block">TXID: <small>' + tx.format.txid + '</small></span>';
                html+= '<div style="text-align: center;">';
                
                if(tx.inputs && tx.outputs)
                {
                    html+= '<hr>';
                    html+= '<div class="row">';
                    html+= '<div class="col-sm-6">';
                    html+= '<span class="alert alert-success alert-block">INPUTS</span>';

                    $.each(tx.inputs, function(i, k)
                    {
                        var input = tx.inputs[i];
                        html+= '<hr><p>TXID: <small>' + input.txid + '</small></p>';
                        html+= '<p>Script: <small>' + input.script + '</small></p>';
                    });

                    html+= '<hr></div>';
                    html+= '<div class="col-sm-6">';
                    html+= '<span class="alert alert-danger alert-block">OUTPUTS</span>';

                    $.each(tx.outputs, function(i, k)
                    {
                        var output = tx.outputs[i];
                        if(
                            typeof output.scriptPubKey.addresses != 'undefined'
                            && $.isArray(output.scriptPubKey.addresses)
                            && output.scriptPubKey.addresses.length > 0
                        ){
                            html+= '<hr><p>Address: <small>' + output.scriptPubKey.addresses[0] + '</small></p>';
                            html+= '<p>Amount: ' + output.value + '</p>';
                        }
                        else if(typeof output.scriptPubKey.hex != 'undefined')
                        {
                            html+= '<hr><span class="alert alert-warning alert-block">Data: <strong>' + $.fn.blockstrap.blockchains.decode(false, output.scriptPubKey.asm) + '</strong></span>';
                        }
                    });
                    html+= '<hr></div>';
                    html+= '</div>';
                }
                html+= '</div>';
                $(wrapper).html(html);
                $(wrapper).removeClass('hidden');
            });
        },
        fetch: function()
        {
            $('a.btn.fetch-data').on('click', function(e)
            {
                e.preventDefault();
                var html = bce.html.forms.fetch();
                $.fn.blockstrap.core.modal('Fetch Data', html);
            });
        },
        init: function()
        {
            bce.buttons.child();
            bce.buttons.decode();
            bce.buttons.fetch();
            bce.buttons.inputs();
            bce.buttons.methods();
            bce.buttons.multi();
            bce.buttons.outputs();
            bce.buttons.pair();
            bce.buttons.post();
            bce.buttons.qr();
            bce.buttons.relay();
            bce.buttons.reset();
            bce.buttons.search();
            bce.buttons.spend();
        },
        inputs: function()
        {
            $('a.add-input-key').on('click', function(e)
            {
                e.preventDefault();
                var input_count = $('.input-wrapper').length;
                var last_wrapper = $('.input-wrapper[data-index="'+(input_count)+'"]');
                var last_wrapper_html = $(last_wrapper).html();
                var next_wrapper_html = '<div class="input-wrapper" data-index="'+(input_count + 1)+'">';
                next_wrapper_html = next_wrapper_html + last_wrapper_html + '</div>';
                $(last_wrapper).after(next_wrapper_html);
                var new_wrapper = $('.input-wrapper[data-index="'+(input_count + 1)+'"]');
                $(new_wrapper).find('.control-label').attr('for', 'input-private-'+(input_count + 1)).text('Private Key '+(input_count + 1));
                $(new_wrapper).find('.input-private').attr('id', 'input-private-'+(input_count + 1)).val('');
            });
        },
        methods: function()
        {   
            $('body').on('change', 'select#bce-method', function(e)
            {
                e.preventDefault();
                var value = $(this).val();
                var form = $(this).parent().parent().parent();
                $(form).find('.form-section-wrapper').removeClass('hidden');
                $(form).find('.form-section-wrapper').hide(250, function()
                {
                    $(form).find('.form-section-wrapper.'+value).show(250);
                });
                $(form).find('.btn-spend').text('SPEND');
                if(value == 'prep')
                {
                    $(form).find('.btn-spend').text('PREPARE');
                }
            });
        },
        multi: function()
        {
            $('a.btn.multi-sig').on('click', function(e)
            {
                e.preventDefault();
                var html = bce.html.forms.multi();
                $.fn.blockstrap.core.modal('Create Multisignature Account', html);
            });
        },
        outputs: function()
        {
            $('a.add-output-key').on('click', function(e)
            {
                e.preventDefault();
                var input_count = $('.output-wrapper').length;
                var last_wrapper = $('.output-wrapper[data-index="'+(input_count)+'"]');
                var last_wrapper_html = $(last_wrapper).html();
                var next_wrapper_html = '<div class="output-wrapper" data-index="'+(input_count + 1)+'">';
                next_wrapper_html = next_wrapper_html + last_wrapper_html + '</div>';
                $(last_wrapper).after(next_wrapper_html);
                var new_wrapper = $('.output-wrapper[data-index="'+(input_count + 1)+'"]');
                $(new_wrapper).find('.address-label').attr('for', 'amount-'+(input_count + 1)).text('Address '+(input_count + 1));
                $(new_wrapper).find('.amount-label').attr('for', 'output-address-'+(input_count + 1)).text('Amount '+(input_count + 1));
                $(new_wrapper).find('.output-address').attr('id', 'output-address-'+(input_count + 1)).val('');
                $(new_wrapper).find('.send-amount').attr('id', 'amount-'+(input_count + 1)).val('');
            });
        },
        pair: function()
        {
            $('a.btn.key-pair').on('click', function(e)
            {
                e.preventDefault();
                var html = bce.html.forms.pair();
                $.fn.blockstrap.core.modal('Generate Key Pairs', html);
            });
        },
        post: function()
        {
            $('a.btn.post-data').on('click', function(e)
            {
                e.preventDefault();
                var html = bce.html.forms.post();
                $.fn.blockstrap.core.modal('Post Data', html);
            });
        },
        qr: function()
        {
            $('.modal').on('click', 'a.btn.btn-qr', function(e)
            {
                e.preventDefault();
                var input = $(this).parent().parent().find('input').val();
                $.fn.blockstrap.core.modal('QR CODE', '<div class="qr-holder" data-content="'+input+'"></div>', false, function()
                {
                    $('.qr-holder').each(function(i)
                    {
                        if($(this).find('img').length < 1)
                        {
                            $(this).qrcode({
                                render: 'image',
                                text: $(this).attr('data-content')
                            });
                        }
                    });
                });
            });
        },
        relay: function()
        {
            $('.modal').on('click', 'a.btn.bce-inline-relay', function(e)
            {
                e.preventDefault();
                var pre = $(this).parent().parent().parent().parent().find('pre');
                var chain = $(pre).attr('data-chain');
                var raw = $(pre).find('code').text();
                if(
                    chain && raw 
                    && $.fn.blockstrap.settings.blockchains[chain] != 'undefined'
                ){
                    $.fn.blockstrap.api.relay(raw, chain, function(tx)
                    {
                        var title = 'Warning';
                        var message = 'Unable to relay transaction';
                        if(tx && tx.txid)
                        {
                            //var base_url = 'http://spinal.neuroware.io/v1/'+chain+'/tx/';
                            //var tx_url = base_url + tx.txid + '/verbose';
                            var base_url = 'https://chain.so/tx/'+chain+'/';
                            var tx_url = base_url + tx.txid;
                            title = 'Success';
                            message = '<p>Successfully <a href="'+tx_url+'" target="_blank">RELAYED</a> Transaction ID: '+tx.txid+'</p>';
                        }
                        $.fn.blockstrap.core.modal(title, message);
                    });
                }
            });
        },
        reset: function()
        {
            $('body').on('click', 'a.btn.btn-reset', function(e)
            {
                e.preventDefault();
                var form = $('#' + $(this).attr('data-id')).find('input').val('');
            });
        },
        search: function()
        {
            $('.dropdown-menu a.searching').on('click', function(e)
            {
                e.preventDefault();
                var chain = $(this).attr('data-chain');
                var func = $(this).attr('data-function');
                var input = $(this).parent().parent().parent().parent().next().find('input');
                var value = $(input).val();
                if(chain && value && (func == 'transaction' || func == 'address'))
                {
                    $.fn.blockstrap.api[func](value, chain, function(obj)
                    {
                        var results = {
                            success: false,
                            title: 'Error',
                            msg: 'Invalid ' + func + ' and (or) API key / request ...'
                        }
                        if(func == 'address')
                        {
                            if(typeof obj.address != 'undefined' && obj.address != 'N/A')
                            {
                                results.title = 'Warning';
                                results.msg = 'This address has not yet been used';
                                if(typeof obj.tx_count != 'undefined' && obj.tx_count > 0)
                                {
                                    $.fn.blockstrap.api.transactions(value, chain, function(full_obj)
                                    {
                                        var txs = false;
                                        if(typeof full_obj.txs != 'undefined' && $.isArray(full_obj.txs))
                                        {
                                            txs = full_obj.txs;
                                        }
                                        
                                        results.success = true;
                                        results.title = 'Address: <small>' + value + '</small>';
                                        results.msg = '<div style="text-align: center;">';

                                        results.msg+= '<hr><div class="well">';
                                        results.msg+= '<div class="row">';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<p><strong>Balance:</strong></p>';
                                        results.msg+= '</div>';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<p>' + parseFloat((obj.balance / 100000000)).toFixed(8) + '</p>';
                                        results.msg+= '</div>';
                                        results.msg+= '</div>';
                                        results.msg+= '<div class="row">';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<p><strong>Received:</strong></p>';
                                        results.msg+= '</div>';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<p>' + parseFloat((obj.received / 100000000)).toFixed(8) + '</p>';
                                        results.msg+= '</div>';
                                        results.msg+= '</div>';
                                        results.msg+= '<div class="row">';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<p><strong>TX Count:</strong></p>';
                                        results.msg+= '</div>';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<p>' + obj.tx_count + '</p>';
                                        results.msg+= '</div>';
                                        results.msg+= '</div>';
                                        results.msg+= '</div>';
                                        
                                        if(txs)
                                        {
                                            $.each(txs, function(i, k)
                                            {
                                                results.msg+= '<span class="alert alert-info alert-block">TXID: <small>' + txs[i].hash + '</small></span>';
                                                results.msg+= '<div style="text-align: center;">';
                                                results.msg+= '<hr><div class="well">';
                                                results.msg+= '<div class="row">';
                                                results.msg+= '<div class="col-sm-6">';
                                                results.msg+= '<p><strong>Block Height:</strong></p>';
                                                results.msg+= '</div>';
                                                results.msg+= '<div class="col-sm-6">';
                                                results.msg+= '<p>' + txs[i].block_height + '</p>';
                                                results.msg+= '</div>';
                                                results.msg+= '</div>';
                                                results.msg+= '<div class="row">';
                                                results.msg+= '<div class="col-sm-6">';
                                                results.msg+= '<p><strong>TX Size:</strong></p>';
                                                results.msg+= '</div>';
                                                results.msg+= '<div class="col-sm-6">';
                                                results.msg+= '<p>' + txs[i].size + '</p>';
                                                results.msg+= '</div>';
                                                results.msg+= '</div>';
                                                results.msg+= '<div class="row">';
                                                results.msg+= '<div class="col-sm-6">';
                                                results.msg+= '<p><strong>TX Fees:</strong></p>';
                                                results.msg+= '</div>';
                                                results.msg+= '<div class="col-sm-6">';
                                                results.msg+= '<p>' + parseFloat((txs[i].fees / 100000000)).toFixed(8) + '</p>';
                                                results.msg+= '</div>';
                                                results.msg+= '</div>';
                                                results.msg+= '</div>';

                                                if(txs[i].inputs && txs[i].outputs)
                                                {
                                                    results.msg+= '<hr>';
                                                    results.msg+= '<div class="row">';
                                                    results.msg+= '<div class="col-sm-6">';
                                                    results.msg+= '<span class="alert alert-success alert-block">INPUTS</span>';

                                                    $.each(txs[i].inputs, function(ii, k)
                                                    {
                                                        var input = txs[i].inputs[ii];
                                                        results.msg+= '<hr><p>Address: <small>' + input.addresses[0] + '</small></p>';
                                                        results.msg+= '<p>Amount: ' + parseFloat((input.output_value / 100000000)).toFixed(8) + '</p>';
                                                    });

                                                    results.msg+= '<hr></div>';
                                                    results.msg+= '<div class="col-sm-6">';
                                                    results.msg+= '<span class="alert alert-danger alert-block">OUTPUTS</span>';

                                                    $.each(txs[i].outputs, function(ii, k)
                                                    {
                                                        var output = txs[i].outputs[ii];
                                                        if(
                                                            typeof output.addresses != 'undefined'
                                                            && output.addresses
                                                        ){
                                                            results.msg+= '<hr><p>Address: <small>' + output.addresses[0] + '</small></p>';
                                                            results.msg+= '<p>Amount: ' + parseFloat((output.value / 100000000)).toFixed(8) + '</p>';
                                                        }
                                                        else if(typeof output.data_string != 'undefined')
                                                        {
                                                            results.msg+= '<hr><span class="alert alert-warning alert-block">Data: <strong>' + output.data_string + '</strong></span>';
                                                        }
                                                    });

                                                    results.msg+= '<hr></div>';
                                                    results.msg+= '</div>';
                                                }
                                                results.msg+= '</div>';
                                            });
                                        }

                                        results.msg+= '</div>';
                                        $.fn.blockstrap.core.modal(results.title, results.msg);
                                    }, $.fn.blockstrap.settings.api_service, true);
                                }
                            }
                            else
                            {
                                $.fn.blockstrap.core.modal(results.title, results.msg);
                            }
                        }
                        else
                        {
                            if(typeof obj.txid != 'undefined' && obj.txid != 'N/A')
                            {
                                $.fn.blockstrap.api[func](value, chain, function(full_obj)
                                {
                                    var inputs = false;
                                    var outputs = false;
                                    if($.fn.blockstrap.settings.api_service == 'blockcypher')
                                    {
                                        inputs = full_obj.inputs;
                                        outputs = full_obj.outputs;
                                    }
                                    
                                    results.success = true;
                                    results.title = 'TXID: <small>' + value + '</small>';
                                    results.msg = '<div style="text-align: center;">';
                                    results.msg+= '<hr><div class="well">';
                                    results.msg+= '<div class="row">';
                                    results.msg+= '<div class="col-sm-6">';
                                    results.msg+= '<p><strong>Block Height:</strong></p>';
                                    results.msg+= '</div>';
                                    results.msg+= '<div class="col-sm-6">';
                                    results.msg+= '<p>' + obj.block + '</p>';
                                    results.msg+= '</div>';
                                    results.msg+= '</div>';
                                    results.msg+= '<div class="row">';
                                    results.msg+= '<div class="col-sm-6">';
                                    results.msg+= '<p><strong>TX Size:</strong></p>';
                                    results.msg+= '</div>';
                                    results.msg+= '<div class="col-sm-6">';
                                    results.msg+= '<p>' + obj.size + '</p>';
                                    results.msg+= '</div>';
                                    results.msg+= '</div>';
                                    results.msg+= '<div class="row">';
                                    results.msg+= '<div class="col-sm-6">';
                                    results.msg+= '<p><strong>TX Fees:</strong></p>';
                                    results.msg+= '</div>';
                                    results.msg+= '<div class="col-sm-6">';
                                    results.msg+= '<p>' + parseFloat((obj.fees / 100000000)).toFixed(8) + '</p>';
                                    results.msg+= '</div>';
                                    results.msg+= '</div>';
                                    results.msg+= '</div>';
                                    
                                    if(inputs && outputs)
                                    {
                                        results.msg+= '<hr>';
                                        results.msg+= '<div class="row">';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<span class="alert alert-success alert-block">INPUTS</span>';
                                        
                                        $.each(inputs, function(i, k)
                                        {
                                            var input = inputs[i];
                                            results.msg+= '<hr><p>Address: <small>' + input.addresses[0] + '</small></p>';
                                            results.msg+= '<p>Amount: ' + parseFloat((input.output_value / 100000000)).toFixed(8) + '</p>';
                                        });
                                        
                                        results.msg+= '<hr></div>';
                                        results.msg+= '<div class="col-sm-6">';
                                        results.msg+= '<span class="alert alert-danger alert-block">OUTPUTS</span>';
                                        
                                        $.each(outputs, function(i, k)
                                        {
                                            var output = outputs[i];
                                            
                                            if(
                                                typeof output.addresses != 'undefined'
                                                && output.addresses
                                            ){
                                                results.msg+= '<hr><p>Address: <small>' + output.addresses[0] + '</small></p>';
                                                results.msg+= '<p>Amount: ' + parseFloat((output.value / 100000000)).toFixed(8) + '</p>';
                                            }
                                            else if(typeof output.data_string != 'undefined')
                                            {
                                                results.msg+= '<hr><span class="alert alert-warning alert-block">Data: <strong>' + output.data_string + '</strong></span>';
                                            }
                                        });
                                        
                                        results.msg+= '<hr></div>';
                                        results.msg+= '</div>';
                                    }
                                    results.msg+= '</div>';
                                    $.fn.blockstrap.core.modal(results.title, results.msg);
                                }, $.fn.blockstrap.settings.api_service, true);
                            }
                            else
                            {
                                $.fn.blockstrap.core.modal(results.title, results.msg);
                            }
                        }
                    });
                }   
            });
        },
        spend: function()
        {
            $('a.btn.multi-spend').on('click', function(e)
            {
                e.preventDefault();
                var html = bce.html.forms.spend();
                $.fn.blockstrap.core.modal('Multisignature Control', html);
            });
        }
    },
    html: {
        forms: {
            checks: function()
            {
                $('body').on('keyup', '.data-length-check', function(e)
                {
                    var input = $(this);
                    var form = $('#' + $(input).attr('data-form-id'));
                    var chain = $(form).find('#' + $(input).attr('data-chain-id')).val();
                    var encryption_type = $(form).find('#' + $(input).attr('data-encrypt-id')).val();
                    var data_length_limit = 0;
                    if(
                        typeof $.fn.blockstrap.settings.blockchains[chain] != 'undefined'
                        && typeof $.fn.blockstrap.settings.blockchains[chain].op_limit != 'undefined'
                    ){
                        data_length_limit = parseInt($.fn.blockstrap.settings.blockchains[chain].op_limit);
                        var data_length = $(input).val().length;
                        if(encryption_type)
                        {
                            var value = $(input).val();
                            var hash_of_key = CryptoJS.SHA3('ENCRYPTION_TYPE', { outputLength: 512 }).toString();
                            var to_data = CryptoJS.AES.encrypt(value, hash_of_key).toString();
                            data_length = to_data.length;
                        }
                        if(
                            data_length > 0 
                            && data_length_limit > 0 
                            && data_length > data_length_limit
                        ){
                            $(input).val('').attr('placeholder', 'Limit of ' + data_length_limit + ' characters');
                        }
                    }
                });
            },
            child: function()
            {
                var chains = [
                    {
                        value: 'doge',
                        text: 'Dogecoin'
                    },
                    {
                        value: 'btc',
                        text: 'Bitcoin'
                    },
                    {
                        value: 'btct',
                        text: 'Bitcoin Testnet'
                    }
                ];  
                var html = '<form id="bce-child-key" class="form-horizontal">';
                    html+= '<p>Derive child keys from any extended key using the form below:</p>';
                    html+= bce.html.forms.select('bce-chain', 'Blockchain', chains);
                    html+= bce.html.forms.input('bce-extended-key', 'Extended Key', 'text', 'An extended public or extended private key');
                    html+= '<div class="row">';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-key-depth', 'Key Depth', 'text', '', true);
                        html+= '</div>';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-key-index', 'Key Index', 'text', '', true);
                        html+= '</div>';
                    html+= '</div>';
                    html+= bce.html.forms.input('bce-derive-path', 'Child Path', 'text', 'Comma separated list for multiple depths');
                    html+= '<div class="row">';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-keys-depth', 'Key Depth', 'text', '', true);
                        html+= '</div>';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-keys-index', 'Key Index', 'text', '', true);
                        html+= '</div>';
                    html+= '</div>';
                    html+= bce.html.forms.input('bce-extended-public', 'Derived HD Public Key', 'text', 'Waiting for path ...', true);
                    html+= bce.html.forms.input('bce-extended-private', 'Derived HD Private Key', 'text', 'Waiting for path ...', true);
                    html+= bce.html.forms.input('bce-extended-wif', 'Derived Private (WIF) Key', 'text', 'Waiting for path ...', true);
                    html+= bce.html.forms.input('bce-extended-address', 'Derived Address', 'text', 'Waiting for path ...', true);
                html+= '</form>';
                return html;
            },
            fetch: function()
            {
                var chains = [
                    {
                        value: 'doge',
                        text: 'Dogecoin'
                    },
                    {
                        value: 'btc',
                        text: 'Bitcoin'
                    },
                    {
                        value: 'btct',
                        text: 'Bitcoin Testnet'
                    }
                ];  
                var encrypts = [
                    {
                        value: '',
                        text: 'None'
                    },
                    {
                        value: 'public',
                        text: 'Public WIF Key'
                    }
                ];
                var html = '<form id="fetch-data" class="form-horizontal">';
                
                html+= bce.html.forms.select('bce-chain', 'Blockchain', chains);
                html+= bce.html.forms.input('bce-extended-key', 'HD Public Key', 'text', 'Expecting an extended public key');
                html+= bce.html.forms.input('bce-derive-path', 'Child Path', 'text', 'Optional oomma separated list');
                html+= bce.html.forms.select('bce-encrypt', 'Decryption', encrypts);
                html+= bce.html.forms.input('bce-extra-encrypt', 'Decryption Salt', 'password', 'Add an optional custom secret');
                html+= bce.html.forms.input('bce-to-data', 'Data', 'text', 'Waiting to be fetched ...', true);
                
                html+= '<hr><div class="row">';
                    html+= '<div class="col-md-6"><a href="#" class="btn btn-default btn-block btn-reset" data-id="fetch-data">RESET</a></div>';
                    html+= '<div class="col-md-6"><a href="#" class="btn btn-primary btn-block btn-fetch">FETCH</a></div>';
                html+= '</div>';
                
                html+= '</form>';
                return html;
            },
            input: function(id, label, type, placeholder, readonly, button, css, attr)
            {
                if(typeof button == 'undefined') button = false;
                if(typeof placeholder == 'undefined') placeholder = '';
                if(typeof css == 'undefined' || !css) css = '';
                if(typeof attr == 'undefined' || !attr) attr = '';
                if(typeof readonly == 'undefined' || !readonly) readonly = '';
                else readonly = 'readonly="readonly"';
                if(typeof id != 'undefined' && typeof label != 'undefined')
                {
                    var html = '<div class="form-group">';
                        html+= '<label for="'+id+'" class="col-sm-5 control-label">';
                        html+= label;
                        if(button && (button == 'check' || button == 'qr' || button == 'lookup'))
                        {
                            html+= ' <a href="#" class="btn btn-xs pull-right btn-default btn-'+button+'">'+button+'</a>';
                        }
                        else if(button && button == 'check/qr')
                        {
                            html+= '<a href="#" class="btn btn-xs pull-right btn-default btn-check">check</a>';
                            html+= '<a href="#" class="btn btn-xs pull-right btn-default btn-qr">qr</a>';
                        }
                        html+= '</label>';
                        html+= '<div class="col-sm-7">';
                            if(typeof type != 'undefined' && (type == 'text' || type  == 'password'))
                            {
                                html+= '<input type="'+type+'" class="form-control ' + css + '" id="'+id+'" placeholder="'+placeholder+'" '+readonly+' ' + attr + ' />';
                            }
                        html+= '</div>';
                    html+= '</div>';
                    return html;
                }
                else
                {
                    return false;
                }
            },
            multi: function()
            {
                var chains = [
                    {
                        value: 'doge',
                        text: 'Dogecoin'
                    },
                    {
                        value: 'btc',
                        text: 'Bitcoin'
                    },
                    {
                        value: 'btct',
                        text: 'Bitcoin Testnet'
                    }
                ];  
                var types = [
                    {
                        value: '2-3',
                        text: '2 of 3'
                    }
                ];  
                var html = '<form id="bce-multi-sig" class="form-horizontal">';
                    html+= '<p>Generate a multi-signature account by filling-out the details below:</p>';
                    html+= bce.html.forms.select('bce-chain', 'Blockchain', chains);
                    html+= bce.html.forms.select('bce-ms-type', 'Contract Type', types);
                    html+= bce.html.forms.input('bce-public-01', '1st HD Extended Key', 'text', 'Expecting a hex public key ...');
                    html+= bce.html.forms.input('bce-public-02', '2nd HD Extended Key', 'text', 'Expecting a hex public key ...');
                    html+= bce.html.forms.input('bce-public-03', '3rd HD Extended Key', 'text', 'Expecting a hex public key ...');
                    html+= '<p>The three keys are combined via the following function:</p>';
                    html+= '<code>var ms_keys = $.fn.blockstrap.multisig.generate(false, chain, keys, 2);</code><hr>';
                    html+= bce.html.forms.input('bce-ms-address', 'Multi-Sig Address', 'text', 'Waiting for inputs ...', true);
                    html+= bce.html.forms.input('bce-ms-script', 'Redeem Script', 'text', 'Waiting for inputs ...', true);
                html+= '</form>';
                return html;
            },
            pair: function()
            {
                var html = '<form id="bce-key-pair" class="form-horizontal">';
                    var chains = [
                        {
                            value: 'doge',
                            text: 'Dogecoin'
                        },
                        {
                            value: 'btc',
                            text: 'Bitcoin'
                        },
                        {
                            value: 'btct',
                            text: 'Bitcoin Testnet'
                        },
                        {
                            value: 'ltc',
                            text: 'Litecoin'
                        }
                    ];  
                    html+= '<p>Generate standard key-pairs using any and (or) all of the options below. However, please note that by not using all 3 fields and (or) insecure values, you may be vulnerable. These tools are merely designed to help understand how cryptographic transactions work.</p><hr>';
                    html+= bce.html.forms.select('bce-chain', 'Blockchain', chains);
                    html+= bce.html.forms.input('bce-salt', 'Salt / Full Name', 'text', 'Optional salt for added security...');
                    html+= bce.html.forms.input('bce-seed', 'Seed / Username', 'text', 'Optional seed for added security...');
                    html+= bce.html.forms.input('bce-pw', 'Password', 'password', 'Optional password for added security...');
                    html+= '<hr>Combining the fields above will result in the following key-pairs and public address:</p><small><code>var hash = bitcoin.crypto.sha256(salt + seed + pw + chain).toString("hex")</code><br><code>var keys = $.fn.blockstrap.blockchains.keys(hash, chain, 1, false, true);</code></small><hr>';
                    html+= '<div class="row">';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-hd-public', 'HD Public', 'text', 'Waiting for inputs ...', true);
                        html+= '</div>';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-hd-private', 'HD Private', 'text', 'Waiting for inputs ...', true);
                        html+= '</div>';
                    html+= '</div>';
                    html+= '<div class="row">';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-public', 'Public', 'text', 'Waiting for inputs ...', true, 'qr');
                        html+= '</div>';
                        html+= '<div class="col-md-6">';
                            html+= bce.html.forms.input('bce-private', 'Private', 'text', 'Waiting for inputs ...', true, 'qr');
                        html+= '</div>';
                    html+= '</div>';
                    html+= bce.html.forms.input('bce-address', 'Public Address', 'text', 'Waiting for inputs ...', true, 'check/qr');
                    html+= '<span class="alert alert-block alert-empty"></span>';
                html+= '</form>';
                return html;
            },
            post: function()
            {
                var chains = [
                    {
                        value: 'doge',
                        text: 'Dogecoin'
                    },
                    {
                        value: 'btc',
                        text: 'Bitcoin'
                    },
                    {
                        value: 'btct',
                        text: 'Bitcoin Testnet'
                    }
                ];  
                var encrypts = [
                    {
                        value: '',
                        text: 'None'
                    },
                    {
                        value: 'private',
                        text: 'Private WIF Key'
                    },
                    {
                        value: 'public',
                        text: 'Public WIF Key'
                    }
                ];
                var html = '<form id="post-data" class="form-horizontal">';
               
                html+= bce.html.forms.select('bce-chain', 'Blockchain', chains);
                html+= bce.html.forms.input('bce-extended-key', 'HD Private Key', 'text', 'Expecting an extended private key');
                html+= bce.html.forms.input('bce-to-data', 'Data', 'text', 'Added to blockchain', '', false, 'data-length-check', 'data-form-id="post-data" data-chain-id="bce-chain" data-encrypt-id="bce-encrypt"');
                html+= bce.html.forms.input('bce-derive-path', 'Child Path', 'text', 'Optional oomma separated list');
                html+= bce.html.forms.select('bce-encrypt', 'Encryption', encrypts);
                html+= bce.html.forms.input('bce-extra-encrypt', 'Encryption Salt', 'password', 'Add an optional custom secret');
                
                html+= '<hr><div class="row">';
                    html+= '<div class="col-md-6"><a href="#" class="btn btn-default btn-block btn-reset" data-id="post-data">RESET</a></div>';
                    html+= '<div class="col-md-6"><a href="#" class="btn btn-primary btn-block btn-post">POST</a></div>';
                html+= '</div>';
                
                html+= '</form>';
                return html;
            },
            select: function(id, label, values)
            {
                if(typeof id != 'undefined' && typeof label != 'undefined')
                {
                    var html = '<div class="form-group">';
                        html+= '<label for="'+id+'" class="col-sm-5 control-label">'+label+'</label>';
                        html+= '<div class="col-sm-7">';
                            if(typeof values != 'undefined' && $.isArray(values))
                            {
                                html+= '<select class="form-control" id="'+id+'">';
                                    $.each(values, function(i)
                                    {
                                        if(typeof values[i].value != 'undefined' && typeof values[i].text != 'undefined')
                                        {
                                            html+= '<option value="'+values[i].value+'">'+values[i].text+'</option>';
                                        }
                                    });
                                html+= '</select>';
                            }
                        html+= '</div>';
                    html+= '</div>';
                    return html;
                }
                else
                {
                    return false;
                }
            },
            spend: function()
            {
                var chains = [
                    {
                        value: 'doge',
                        text: 'Dogecoin'
                    },
                    {
                        value: 'btc',
                        text: 'Bitcoin'
                    },
                    {
                        value: 'btct',
                        text: 'Bitcoin Testnet'
                    }
                ];
                var methods = [
                    {
                        value: 'live',
                        text: 'Both Keys - Same Browser'
                    },
                    {
                        value: 'prep',
                        text: 'Prepare TX - Send for Relaying'
                    },
                    {
                        value: 'relay',
                        text: 'Import TX - Sign for Relaying'
                    }
                ];
                var html = '<form id="bce-spend" class="form-horizontal">';
                    html+= '<p>Send a transaction from a multi-signature account using the form below:</p>';
                    html+= bce.html.forms.select('bce-chain', 'Blockchain', chains);
                    html+= bce.html.forms.select('bce-method', 'Method', methods);
                
                    html+= '<div class="form-section-wrapper live">';
                
                    html+= bce.html.forms.input('bce-ms-address', 'Multi-Sig Address', 'text', 'The address to check / use ...', false, 'lookup');
                    html+= bce.html.forms.input('bce-ms-redeem', 'Redeem Script', 'text', 'For validating keys ...', false);
                    html+= '<br><span class="alert alert-warning alert-live alert-block">waiting for inputs</span><br>';
                    html+= bce.html.forms.input('bce-to-address', 'To Address', 'text', 'Where to send...?');
                    html+= bce.html.forms.input('bce-to-amount', 'Amount', 'text', 'How much to send...?');
                    html+= bce.html.forms.input('bce-to-data', 'Optional Data', 'text', 'Added to blockchain', false, false, 'data-length-check', 'data-form-id="bce-spend" data-chain-id="bce-chain"');
                    html+= '<hr>';
                    html+= bce.html.forms.input('bce-private-01', '1st Private Key', 'text', 'Any one of the three ...');
                    html+= bce.html.forms.input('bce-private-02', '2nd Private Key', 'text', 'Any one of the three ...');
                
                    html+= '</div>';
                    html+= '<div class="form-section-wrapper prep hidden">';
                
                    html+= bce.html.forms.input('bce-ms-address-prep', 'Multi-Sig Address', 'text', 'The address to check / use ...', false, 'lookup');
                    html+= bce.html.forms.input('bce-ms-redeem-prep', 'Redeem Script', 'text', 'For validating keys ...', false);
                    html+= '<br><span class="alert alert-warning alert-prep alert-block">waiting for inputs</span><br>';
                    html+= bce.html.forms.input('bce-to-address-prep', 'To Address', 'text', 'Where to send...?');
                    html+= bce.html.forms.input('bce-to-amount-prep', 'Amount', 'text', 'How much to send...?');
                    html+= bce.html.forms.input('bce-to-data-prep', 'Optional Data', 'text', 'Added to blockchain', '', false, 'data-length-check', 'data-form-id="bce-spend" data-chain-id="bce-chain"');
                    html+= '<hr>';
                    html+= bce.html.forms.input('bce-private-01-prep', '1st Private Key', 'text', 'Any one of the three ...');
                
                    html+= '</div>';
                
                    html+= '<div class="form-section-wrapper relay hidden">';
                
                    html+= bce.html.forms.input('bce-ms-redeem-relay', 'Redeem Script', 'text', 'For validating keys ...', false);
                    html+= bce.html.forms.input('bce-raw-tx-relay', 'Imported Raw TX', 'text', 'Can be decoded but not altered');
                    html+= '<hr>';
                    html+= bce.html.forms.input('bce-private-02-relay', '2nd Private Key', 'text', 'Any one of the three ...');
                
                    html+= '</div>';
                
                    html+= '<hr>';
                    html+= '<div class="row">';
                        html+= '<div class="col-md-6"><a href="#" class="btn btn-default btn-block btn-reset" data-id="bce-spend">RESET</a></div>';
                        html+= '<div class="col-md-6"><a href="#" class="btn btn-primary btn-block btn-spend">SEND</a></div>';
                    html+= '</div>';
                html+= '</form>';
                return html;
            }
        },
        init: function()
        {
            bce.html.forms.checks();
            $('span.api-provider').text($.fn.blockstrap.settings.api_service);
            $('input#ad-hoc-api-key').change(function(e)
            {
                var api = $.fn.blockstrap.settings.api_service;
                var original_keys = false;
                if(
                    typeof $.fn.blockstrap.settings.keys != 'undefined'
                    && typeof $.fn.blockstrap.settings.keys.apis != 'undefined'
                    && typeof $.fn.blockstrap.settings.keys.apis[api] != 'undefined'
                )
                {
                    original_keys = $.fn.blockstrap.settings.keys.apis[api];
                }
                else
                {
                    $.fn.blockstrap.settings.keys = {};
                    $.fn.blockstrap.settings.keys.apis = {};
                }
                var content = $(this).val();
                if(content && content != original_keys)
                {
                    $.fn.blockstrap.settings.keys.apis[api] = {
                        key_name: "token",
                        key: content
                    };
                }
                else
                {
                    $.fn.blockstrap.settings.keys.apis[api] = original_keys;
                }
            });
        }
    },
    init: function()
    {
        bce.buttons.init();
        bce.forms.init();
        bce.html.init();
    },
    forms: {
        child: function()
        {
            $('body').on('keyup', 'form#bce-child-key input#bce-extended-key', function()
            {
                var form = $(this).parent().parent().parent();
                var chain = $(form).find('select#bce-chain').val();
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = nwbs.bitcoin.networks[bitcoinjs_chain];
                var key = $(this).val();
                try{
                    var keys = nwbs.bitcoin.HDNode.fromBase58(key, network);
                }
                catch(e)
                {
                    var keys = false;
                }
                if(typeof keys.depth != 'undefined')
                {
                    $(form).find('input#bce-key-depth').val(keys.depth);
                }
                if(typeof keys.index != 'undefined')
                {
                    $(form).find('input#bce-key-index').val(keys.index);
                }
                if(typeof keys.depth == 'undefined' && typeof keys.index == 'undefined')
                {
                    $(form).find('input#bce-key-depth').val('');
                    $(form).find('input#bce-key-index').val('');
                    $(form).find('input#bce-extended-address').val('');
                    $(form).find('input#bce-extended-private').val('');
                    $(form).find('input#bce-extended-wif').val('');
                    $(form).find('input#bce-extended-public').val('');
                    $(form).find('input#bce-derive-path').val('');
                    $(form).find('input#bce-keys-index').val('');
                    $(form).find('input#bce-keys-depth').val('');
                }
            });
            $('body').on('keyup', 'form#bce-child-key input#bce-derive-path', function()
            {
                var chain = $('form#bce-child-key select#bce-chain').val();
                var key = $('form#bce-child-key input#bce-extended-key').val();
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = nwbs.bitcoin.networks[bitcoinjs_chain];
                var path = $(this).val();
                var paths = path.split(',');
                try{
                    var keys = nwbs.bitcoin.HDNode.fromBase58(key, network);
                    $.each(paths, function(i)
                    {
                        if(paths[i])
                        {
                            var index = parseInt(paths[i]);
                            keys = keys.derive(index);
                        }
                    });
                }
                catch(e)
                {
                    var keys = false;
                }
                if(typeof keys.depth != 'undefined')
                {
                    $('form#bce-child-key input#bce-keys-depth').val(keys.depth);
                }
                if(typeof keys.index != 'undefined')
                {
                    $('form#bce-child-key input#bce-keys-index').val(keys.index);
                }
                if(typeof keys.depth != 'undefined' && keys.index != 'undefined')
                {
                    var this_address = keys.keyPair.getAddress(network).toString('hex');
                    var priv_key = keys.toBase58();
                    var wif = 'N/A';
                    if(!keys.isNeutered())
                    {
                        wif = keys.keyPair.toWIF();
                    }
                    var pub_key = keys.neutered().toBase58();
                    if(pub_key == priv_key) priv_key = 'N/A';
                    $('form#bce-child-key input#bce-extended-address').val(this_address);
                    $('form#bce-child-key input#bce-extended-private').val(priv_key);
                    $('form#bce-child-key input#bce-extended-public').val(pub_key);
                    $('form#bce-child-key input#bce-extended-wif').val(wif);
                }
                else
                {
                    $('form#bce-child-key input#bce-extended-address').val('');
                    $('form#bce-child-key input#bce-extended-private').val('');
                    $('form#bce-child-key input#bce-extended-wif').val('');
                    $('form#bce-child-key input#bce-extended-public').val('');
                    $('form#bce-child-key input#bce-keys-index').val('');
                    $('form#bce-child-key input#bce-keys-depth').val('');
                }
            });
        },
        fetch: function()
        {
            $('.modal').on('click', 'a.btn-fetch', function(e)
            {
                e.preventDefault();
                var form = $(this).parent().parent().parent();
                var chain = $(form).find('select#bce-chain').val();
                var extended_key = $(form).find('input#bce-extended-key').val();
                var path = $(form).find('input#bce-derive-path').val();
                var data_input = $(form).find('input#bce-to-data');
                var encryption_method = $(form).find('select#bce-encrypt').val();
                var encryption_salt = $(form).find('input#bce-extra-encrypt').val();
                
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = nwbs.bitcoin.networks[bitcoinjs_chain];
                try{
                    var keys = nwbs.bitcoin.HDNode.fromBase58(extended_key, network);
                }
                catch(e)
                {
                    var keys = false;
                }
                if(!extended_key)
                {
                    $.fn.blockstrap.core.modal('Warning', 'Must input a HD extended key')
                }
                else if(
                    typeof $.fn.blockstrap.settings.blockchains[chain] == 'undefined'
                    || typeof $.fn.blockstrap.settings.blockchains[chain].fee == 'undefined'
                ){
                    $.fn.blockstrap.core.modal('Warning', 'This blockchain is not supported')
                }
                else if(!keys)
                {
                    $.fn.blockstrap.core.modal('Warning', 'Must provide a valid HD (extended) key')
                }
                else if(keys && typeof keys.keyPair == 'undefined')
                {
                    $.fn.blockstrap.core.modal('Warning', 'Must provide a private HD key - not a public one')
                }
                else
                {
                    var derived = false;   
                    if(path)
                    {
                        derived = JSON.parse(JSON.stringify(path.split(',')));
                        path = [];
                        $.each(derived, function(i)
                        {
                            var this_path = parseInt(derived[i].replace(/ /g,''));
                            keys = keys.derive(this_path);
                        });
                    }
                    var address = keys.keyPair.getAddress(network).toString('hex');
                    var public_key = keys.keyPair.getPublicKeyBuffer(network).toString('hex');
                    $.fn.blockstrap.api.transactions(address, chain, function(obj)
                    {
                        var output_length = obj.txs[0].outputs.length;
                        var data = false;
                        if(
                            typeof obj.txs != 'undefined'
                            && $.isArray(obj.txs)
                            && typeof obj.txs[0].outputs != 'undefined'
                            && $.isArray(obj.txs[0].outputs)
                            && typeof obj.txs[0].outputs[output_length - 1].data_string != 'undefined'
                        ){
                            data = obj.txs[0].outputs[output_length - 1].data_string;
                        }
                        if(data)
                        {
                            if(encryption_method || encryption_salt)
                            {
                                var encrypt = false;
                                if(encryption_method == 'public')
                                {
                                    if(encryption_salt) encrypt = encryption_salt + '_' + public_key;
                                    else encrypt = public_key;
                                }
                                else if(!encryption_method && encryption_salt)
                                {
                                    encrypt = encryption_salt;
                                }
                                if(encrypt)
                                {
                                    var value = JSON.parse(JSON.stringify(data));
                                    var hash_of_key = CryptoJS.SHA3(encrypt, { outputLength: 512 }).toString();
                                    data = CryptoJS.AES.decrypt(value, hash_of_key).toString(CryptoJS.enc.Utf8);
                                }
                            }
                            $(data_input).val(data);
                            $(data_input).parent().parent().effect('shake');
                        }
                        else
                        {
                            $.fn.blockstrap.core.modal('Warning', 'Unable to find any data at address: ' + address);
                        }
                    }, $.fn.blockstrap.settings.api_service, true);
                }
            });
        },
        init: function()
        {
            bce.forms.child();
            bce.forms.fetch();
            bce.forms.pair();
            bce.forms.multi();
            bce.forms.post();
            bce.forms.spend();
            bce.forms.txs();
        },
        multi: function()
        {
            $('body').on('keyup', 'form#bce-multi-sig input#bce-public-01, form#bce-multi-sig input#bce-public-02, form#bce-multi-sig input#bce-public-03', function()
            {
                var chain = $('form#bce-multi-sig select#bce-chain').val();
                var type = $('form#bce-multi-sig select#bce-ms-type').val();
                var key1 = $('form#bce-multi-sig input#bce-public-01').val();
                var key2 = $('form#bce-multi-sig input#bce-public-02').val();
                var key3 = $('form#bce-multi-sig input#bce-public-03').val();
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = nwbs.bitcoin.networks[bitcoinjs_chain];
                if(key1 && key2 && key3)
                {
                    try{
                        var multisig_keys = $.fn.blockstrap.multisig.generate(false, chain, [
                            nwbs.bitcoin.HDNode.fromBase58(key1, network).getPublicKeyBuffer(),
                            nwbs.bitcoin.HDNode.fromBase58(key2, network).getPublicKeyBuffer(),
                            nwbs.bitcoin.HDNode.fromBase58(key3, network).getPublicKeyBuffer()
                        ], 2);
                    }
                    catch(e)
                    {
                        var multisig_keys = false;
                    }
                    if(multisig_keys)
                    {
                        if(typeof multisig_keys[0].address != 'undefined' && multisig_keys[0].script != 'undefined')
                        {
                            var ms_address = multisig_keys[0].address;
                            var ms_script = multisig_keys[0].script;
                            $('form#bce-multi-sig input#bce-ms-address').val(ms_address);
                            $('form#bce-multi-sig input#bce-ms-script').val(ms_script);
                        }
                        else
                        {
                            $('form#bce-multi-sig input#bce-ms-address').val('');
                            $('form#bce-multi-sig input#bce-ms-script').val('');
                        }
                    }
                    else
                    {
                        $('form#bce-multi-sig input#bce-ms-address').val('');
                        $('form#bce-multi-sig input#bce-ms-script').val('');
                    }
                }
            });
        },
        pair: function()
        {
            $('body').on('keyup', 'form#bce-key-pair input#bce-salt, form#bce-key-pair input#bce-seed, form#bce-key-pair input#bce-pw', function()
            {
                var salt = $('form#bce-key-pair input#bce-salt').val();
                var seed = $('form#bce-key-pair input#bce-seed').val();
                var pw = $('form#bce-key-pair input#bce-pw').val();
                var chain = $('form#bce-key-pair select#bce-chain').val();
                if(salt || seed || pw && chain)
                {
                    if(!salt) salt = '';
                    if(!seed) seed = '';
                    if(!pw) pw = '';
                    var hash = nwbs.bitcoin.crypto.sha256(salt + seed + pw + chain).toString('hex');
                    var keys = $.fn.blockstrap.blockchains.keys(hash, chain, 1, false, true);
                    $('form#bce-key-pair #bce-hd-private').val(keys.raw.toBase58());
                    $('form#bce-key-pair #bce-private').val(keys.priv);
                    $('form#bce-key-pair #bce-public').val(keys.raw.getPublicKeyBuffer().toString('hex'));
                    $('form#bce-key-pair #bce-address').val(keys.pub);
                    $('form#bce-key-pair #bce-hd-public').val(keys.raw.neutered().toBase58());
                }
                else
                {
                    
                }
            });
            $('body').on('change', 'form#bce-key-pair select#bce-chain', function()
            {
                $('form#bce-key-pair input#bce-salt').trigger('keyup');
            });
            $('body').on('click', 'form#bce-key-pair a.btn-check', function(e)
            {
                e.preventDefault();
                var css = 'alert-warning';
                var form = $(this).parent().parent().parent();
                var address = $(form).find('input#bce-address').val();
                var chain = $(form).find('select#bce-chain').val();
                var blockchain = $.fn.blockstrap.settings.blockchains[chain].blockchain;
                var base_url = 'http://spinal.neuroware.io/v1/' + chain;
                if(chain && address)
                {
                    $.fn.blockstrap.api.address(address, chain, function(results)
                    {
                        var full_url = base_url + '/addr/' + address + '/1/txfull';
                        var title = '<strong>Address</strong>: <a href="' + full_url + '" target="_blank">' + address + '</a><hr>';
                        var message = '<p>This address has not yet been recorded on the blockchain</p>';
                        if(typeof results.tx_count != 'undefined' && results.tx_count)
                        {
                            css = 'alert-danger';
                            message = '<p>This address has a balance of zero</p>';
                            if(typeof results.balance != 'undefined' && results.balance && results.balance != 'N/A')
                            {
                                css = 'alert-info';
                                message = '<p>This address has a balance of ' + parseFloat((parseInt(results.balance) / 100000000)).toFixed(8) + ' ' + blockchain + '</p><hr>';
                                message+= '<p>It contains the following information:</p><hr>';
                                message+= '<ul class="list-group">';
                                    if(typeof results.hash != 'undefined' && results.hash && results.tx_count != 'N/A')
                                    {
                                        message+= '<li class="list-group-item"><strong>Hash:</strong> ' + results.hash + '</li>';
                                    }
                                    if(typeof results.received != 'undefined' && results.received && results.tx_count != 'N/A')
                                    {
                                        message+= '<li class="list-group-item"><strong>Received:</strong> ' + parseFloat((parseInt(results.received) / 100000000)).toFixed(8) + '</li>';
                                    }
                                    if(typeof results.tx_count != 'undefined' && results.tx_count && results.tx_count != 'N/A')
                                    {
                                        message+= '<li class="list-group-item"><strong>TX Count:</strong> ' + results.tx_count + '</li>';
                                    }
                                message+= '</ul>';
                            }
                        }
                        $(form).find('span.alert-block').removeClass('alert-warning');
                        $(form).find('span.alert-block').removeClass('alert-danger');
                        $(form).find('span.alert-block').removeClass('alert-info');
                        $(form).find('span.alert-block').html(title + message).removeClass('alert-empty').addClass(css);
                    });
                }
            });
        },
        post: function()
        {
            $('.modal').on('click', 'a.btn-post', function(e)
            {
                e.preventDefault();
                var form = $(this).parent().parent().parent();
                var chain = $(form).find('select#bce-chain').val();
                var extended_key = $(form).find('input#bce-extended-key').val();
                var to_data = $(form).find('input#bce-to-data').val();
                var path = $(form).find('input#bce-derive-path').val();
                var encryption_method = $(form).find('select#bce-encrypt').val();
                var encryption_salt = $(form).find('input#bce-extra-encrypt').val();
                var fee = false;
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = nwbs.bitcoin.networks[bitcoinjs_chain];
                try{
                    var keys = nwbs.bitcoin.HDNode.fromBase58(extended_key, network);
                }
                catch(e)
                {
                    var keys = false;
                }
                if(!extended_key || !data)
                {
                    $.fn.blockstrap.core.modal('Warning', 'Must input a private key and required data to continue')
                }
                else if(
                    typeof $.fn.blockstrap.settings.blockchains[chain] == 'undefined'
                    || typeof $.fn.blockstrap.settings.blockchains[chain].fee == 'undefined'
                ){
                    $.fn.blockstrap.core.modal('Warning', 'This blockchain is not supported')
                }
                else if(!keys)
                {
                    $.fn.blockstrap.core.modal('Warning', 'Must provide a valid HD (extended) key')
                }
                else if(keys && typeof keys.keyPair == 'undefined')
                {
                    $.fn.blockstrap.core.modal('Warning', 'Must provide a private HD key - not a public one')
                }
                else
                {
                    fee = parseInt((parseFloat($.fn.blockstrap.settings.blockchains[chain].fee) * 100000000));   
                    var derived = false;
                    
                    if(path)
                    {
                        derived = JSON.parse(JSON.stringify(path.split(',')));
                        path = [];
                        $.each(derived, function(i)
                        {
                            var this_path = parseInt(derived[i].replace(/ /g,''));
                            keys = keys.derive(this_path);
                        });
                    }
                    
                    var checked = 0;
                    var inputs = [];
                    var outputs = [];
                    var input_index = 0;
                    var inputs_to_sign = [];
                    var amount_needed = fee * 2;
                    var amount_used = 0;
                    
                    var private_key = keys.keyPair.toWIF();
                    var key_signer = nwbs.bitcoin.ECPair.fromWIF(private_key, network);
                    var address = keys.keyPair.getAddress(network).toString('hex');
                    var public_key = keys.keyPair.getPublicKeyBuffer(network).toString('hex');
                    
                    $.fn.blockstrap.api.unspents(address, chain, function(results)
                    {
                        var tx = new nwbs.bitcoin.TransactionBuilder(network);
                        
                        if($.isArray(results) && blockstrap_functions.array_length(results) > 0)
                        {
                            $.each(results, function(i, o)
                            {
                                var unspent = results[i];
                                if(amount_used < amount_needed)
                                {
                                    tx.addInput(o.txid, o.index);
                                    amount_used = amount_used + unspent.value;
                                    inputs_to_sign.push(input_index);
                                    input_index++;
                                }
                            });
                        }
                        
                        if(amount_used >= amount_needed)
                        {
                            outputs.push({
                                address: address,
                                value: fee
                            });
                            var change = amount_used - amount_needed;
                            if(change > 0)
                            {
                                outputs.push({
                                    address: address,
                                    value: change
                                });
                            }
                            $.each(outputs, function(i, o)
                            {
                                tx.addOutput(o.address, o.value);
                            });
                            if(typeof to_data == 'string' && to_data)
                            {
                                if(encryption_method || encryption_salt)
                                {
                                    var encrypt = false;
                                    if(encryption_method == 'private')
                                    {
                                        if(encryption_salt) encrypt = encryption_salt + '_' + private_key;
                                        else encrypt = private_key;
                                    }
                                    else if(encryption_method == 'public')
                                    {
                                        if(encryption_salt) encrypt = encryption_salt + '_' + public_key;
                                        else encrypt = public_key;
                                    }
                                    else if(!encryption_method && encryption_salt)
                                    {
                                        encrypt = encryption_salt;
                                    }
                                    if(encrypt)
                                    {
                                        var value = JSON.parse(JSON.stringify(to_data));
                                        var hash_of_key = CryptoJS.SHA3(encrypt, { outputLength: 512 }).toString();
                                        to_data = CryptoJS.AES.encrypt(value, hash_of_key).toString();
                                    }
                                }
                                var op = Crypto.util.base64ToBytes(btoa(to_data));
                                var op_return_data = nwbs.bitcoin.script.compile(op);
                                var op_return = nwbs.bitcoin.script.nullData.output.encode(op_return_data);
                                tx.addOutput(op_return, 0);
                            }
                            $.each(inputs_to_sign, function(k)
                            {
                                tx.sign(k, key_signer);
                            });
                            var built = tx.build();
                            var raw = built.toHex();
                            if(raw)
                            {
                                var title = 'Raw Transaction';
                                var message = '<p>This is the raw transaction - waiting to be sent:</p>';
                                message+= '<pre data-chain="'+chain+'"><code>'+raw+'</code></pre>';
                                message+= '<div class="hidden" id="decoded-tx"></div>';
                                message+= '<div class="well" style="margin-bottom: 0">';
                                    message+= '<div class="row">';
                                        message+= '<div class="col-md-2"></div>';
                                        message+= '<div class="col-md-4">';
                                            message+= '<a href="#" class="btn btn-default btn-block btn-decode" data-raw="'+raw+'" data-chain="'+chain+'" data-id="decoded-tx">decode</a>';
                                        message+= '</div>';
                                        message+= '<div class="col-md-4">';
                                            message+= '<a href="#" class="btn btn-primary btn-block bce-inline-relay">relay</a>';
                                        message+= '</div>';
                                        message+= '<div class="col-md-2"></div>';
                                    message+= '</div>';
                                message+= '</div>';
                                $.fn.blockstrap.core.modal(title, message);
                            }
                        }
                        else
                        {
                            var title = 'Warning';
                            var message = 'There is not enough unspent inputs to use for this transaction';
                            $.fn.blockstrap.core.modal(title, message);
                        }
                    });
                }
            });
        },
        spend: function()
        {
            $('.modal').on('click', 'a.btn-spend', function(e)
            {
                e.preventDefault();
                var form = $(this).parent().parent().parent();
                var chain = $(form).find('select#bce-chain').val();
                var method = $(form).find('select#bce-method').val();
                var address = $(form).find('input#bce-ms-address').val();
                var address_prep = $(form).find('input#bce-ms-address-prep').val();
                var redeem = $(form).find('input#bce-ms-redeem').val();
                var redeem_prep = $(form).find('input#bce-ms-redeem-prep').val();
                var redeem_relay = $(form).find('input#bce-ms-redeem-relay').val();
                var to_data = $(form).find('input#bce-to-data').val();
                var to_data_prep = $(form).find('input#bce-to-data-prep').val();
                var to_address = $(form).find('input#bce-to-address').val();
                var to_address_prep = $(form).find('input#bce-to-address-prep').val();
                var to_amount = $(form).find('input#bce-to-amount').val();
                var raw_tx = $(form).find('input#bce-raw-tx-relay').val();
                var to_amount_prep = $(form).find('input#bce-to-amount-prep').val();
                var priv1 = $(form).find('input#bce-private-01').val();
                var priv1_prep = $(form).find('input#bce-private-01-prep').val();
                var priv2 = $(form).find('input#bce-private-02').val();
                var priv2_relay = $(form).find('input#bce-private-02-relay').val();
                var fee = parseInt((parseFloat($.fn.blockstrap.settings.blockchains[chain].fee) * 100000000));
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = nwbs.bitcoin.networks[bitcoinjs_chain];
                
                if(method == 'prep')
                {
                    priv1 = priv1_prep;
                    priv2 = true;
                    redeem = redeem_prep;
                    address = address_prep;
                    to_data = to_data_prep;
                    to_address = to_address_prep;
                    to_amount = to_amount_prep;
                }
                else if(method == 'relay')
                {
                    priv1 = true;
                    priv2 = priv2_relay;
                    address = true;
                    to_address = true;
                    to_amount = true;
                    redeem = redeem_relay;
                }
                
                if(priv1 && priv2 && chain && address && to_address && to_amount)
                {
                    var checked = 0;
                    var inputs = [];
                    var outputs = [];
                    var input_index = 0;
                    var inputs_to_sign = [];
                    var amount_needed = parseInt((parseFloat(to_amount) * 100000000)) + fee;
                    var amount_used = 0;
                    
                    if(method == 'relay')
                    {
                        amount_needed = 0;
                        amount_used = 1;
                    }
                    
                    if(method != 'prep')
                    {
                        var keys2 = nwbs.bitcoin.ECPair.fromWIF(priv2, network);
                    }
                    else
                    {
                        var keys1 = nwbs.bitcoin.ECPair.fromWIF(priv1, network);
                    }
                    
                    if(method == 'relay')
                    {
                        // Recover transaction from raw_transaction created by bitcoind || or raw_signed_transaction
                        var txt  = nwbs.bitcoin.Transaction.fromHex(raw_tx);
                        var tx = nwbs.bitcoin.TransactionBuilder.fromTransaction(txt);
                        tx.network = network;
                    }
                    else
                    {
                        var tx = new nwbs.bitcoin.TransactionBuilder(network);
                    }
                    
                    $.fn.blockstrap.api.unspents(address, chain, function(results)
                    {
                        if(method != 'relay')
                        {
                            if($.isArray(results) && blockstrap_functions.array_length(results) > 0)
                            {
                                $.each(results, function(i)
                                {
                                    var unspent = results[i];
                                    if(amount_used < amount_needed)
                                    {
                                        tx.addInput(unspent.txid, unspent.index);
                                        amount_used = amount_used + unspent.value;
                                        inputs_to_sign.push(input_index);
                                        input_index++;
                                    }
                                });
                            }
                        }
                        if(amount_used >= amount_needed)
                        {
                            var reedeem_script = Crypto.util.hexToBytes(redeem);
                            var redeem_data = nwbs.bitcoin.script.compile(reedeem_script);
                            if(method != 'relay')
                            {
                                outputs.push({
                                    address: to_address,
                                    value: parseInt((parseFloat(to_amount) * 100000000))
                                });
                                var change = amount_used - amount_needed;
                                if(change > 0)
                                {
                                    outputs.push({
                                        address: address,
                                        value: change
                                    });
                                }
                                $.each(outputs, function(i, o)
                                {
                                    tx.addOutput(o.address, o.value);
                                });
                                if(typeof to_data == 'string' && to_data)
                                {
                                    var op = Crypto.util.base64ToBytes(btoa(to_data));
                                    var op_return_data = nwbs.bitcoin.script.compile(op);
                                    var op_return = nwbs.bitcoin.script.nullData.output.encode(op_return_data);
                                    tx.addOutput(op_return, 0);
                                }
                                $.each(inputs_to_sign, function(k)
                                {
                                    tx.sign(k, keys1, redeem_data);
                                    if(method != 'prep')
                                    {
                                        tx.sign(k, keys2, redeem_data);
                                    }
                                });
                            }
                            else
                            {
                                for(k = 0; k < tx.inputs.length; k++)
                                {   
                                    tx.sign(k, keys2, redeem_data);
                                }
                            }
                            var built = tx.build();
                            var raw = built.toHex();
                            if(raw)
                            {
                                var title = 'Raw Transaction';
                                var message = '<p>This is the raw transaction - waiting to be sent:</p>';
                                
                                if(method == 'prep')
                                {
                                    message = '<p>This is the raw transaction - waiting for second signature:</p>';
                                }
                                
                                message+= '<pre data-chain="'+chain+'"><code>'+raw+'</code></pre>';
                                message+= '<div class="hidden" id="decoded-tx"></div>';
                                message+= '<div class="well" style="margin-bottom: 0">';
                                    message+= '<div class="row">';
                                        message+= '<div class="col-md-2"></div>';
                                        message+= '<div class="col-md-4">';
                                            message+= '<a href="#" class="btn btn-default btn-block btn-decode" data-raw="'+raw+'" data-chain="'+chain+'" data-id="decoded-tx">decode</a>';
                                        message+= '</div>';
                                        message+= '<div class="col-md-4">';
                                            
                                            if(method == 'prep')
                                            {
                                                message+= '<a class="btn btn-block">forward</a>';
                                            }
                                            else
                                            {
                                                message+= '<a href="#" class="btn btn-primary btn-block bce-inline-relay">relay</a>';
                                            }
                                
                                        message+= '</div>';
                                        message+= '<div class="col-md-2"></div>';
                                    message+= '</div>';
                                message+= '</div>';
                                $.fn.blockstrap.core.modal(title, message);
                            }
                        }
                        else
                        {
                            var title = 'Warning';
                            var message = 'There is not enough unspent inputs to use for this transaction';
                            $.fn.blockstrap.core.modal(title, message);
                        }
                    });
                }
            });
            $('.modal').on('click', 'a.btn-lookup', function(e)
            {
                e.preventDefault();
                var form = $(this).parent().parent().parent();
                var chain = $(form).find('select#bce-chain').val();
                var blockchain = $.fn.blockstrap.settings.blockchains[chain].blockchain;
                var address = $(form).find('input#bce-ms-address').val();
                if(chain && address)
                {
                    $.fn.blockstrap.api.address(address, chain, function(results)
                    {
                        var css = 'alert-warning';
                        var base_url = 'http://spinal.neuroware.io/v1/'+chain;
                        var full_url = base_url + '/addr/' + address + '/1/txfull';
                        var title = '<strong>Address</strong>: <a href="' + full_url + '" target="_blank">' + address + '</a><hr>';
                        var message = '<p>This address has not yet been recorded on the blockchain</p>';
                        if(typeof results.tx_count != 'undefined' && results.tx_count)
                        {
                            css = 'alert-danger';
                            message = '<p>This address has a balance of zero</p>';
                            if(typeof results.balance != 'undefined' && results.balance && results.balance != 'N/A')
                            {
                                css = 'alert-info';
                                message = '<p>This address has a balance of ' + parseFloat((parseInt(results.balance) / 100000000)).toFixed(8) + ' ' + blockchain + '</p><hr>';
                                message+= '<p>It contains the following information:</p><hr>';
                                message+= '<ul class="list-group">';
                                    if(typeof results.hash != 'undefined' && results.hash && results.tx_count != 'N/A')
                                    {
                                        message+= '<li class="list-group-item"><strong>Hash:</strong> ' + results.hash + '</li>';
                                    }
                                    if(typeof results.received != 'undefined' && results.received && results.tx_count != 'N/A')
                                    {
                                        message+= '<li class="list-group-item"><strong>Received:</strong> ' + parseFloat((parseInt(results.received) / 100000000)).toFixed(8) + '</li>';
                                    }
                                    if(typeof results.tx_count != 'undefined' && results.tx_count && results.tx_count != 'N/A')
                                    {
                                        message+= '<li class="list-group-item"><strong>TX Count:</strong> ' + results.tx_count + '</li>';
                                    }
                                message+= '</ul>';
                            }
                        }
                        $(form).find('span.alert-block').removeClass('alert-warning');
                        $(form).find('span.alert-block').removeClass('alert-danger');
                        $(form).find('span.alert-block').removeClass('alert-info');
                        $(form).find('span.alert-block').html(title + message).removeClass('alert-empty').addClass(css);
                    });
                }
            });
        },
        txs: function()
        {
            $('body').on('click', 'form#tx-control a.btn-build', function(e)
            {
                e.preventDefault();
                var form = $('form#tx-control');
                var private_keys = [];
                var send_addresses = [];
                var chain = $(form).find('select#chain').val();
                var amount = 0;
                var fee = $(form).find('input#fee').val();
                var to_data = $(form).find('input#data').val();
                var title = 'Warning';
                var message = 'Need to select a valid blockchain';
                if(
                    chain 
                    && typeof $.fn.blockstrap.settings.blockchains[chain] != 'undefined'
                    && typeof $.fn.blockstrap.settings.blockchains[chain].blockchain != 'undefined'
                ){
                    var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                    var network = nwbs.bitcoin.networks[bitcoinjs_chain];
                    message = 'Need to send something somewhere, even if encoding data and sending back to yourself';
                    $('.send-amount').each(function(i)
                    {
                        amount = amount + parseInt($(this).val() * 100000000);
                    });
                    if(amount)
                    {
                        $('.input-private').each(function(i)
                        {
                            private_keys.push($(this).val());
                        });
                        $('.input-address').each(function(i)
                        {
                            send_addresses.push({
                                address: $(this).val(),
                                val: parseInt($(this).parent().parent().parent().find('.send-amount').val())
                            });
                        });
                        if(blockstrap_functions.array_length(private_keys) > 0)
                        {
                            if(blockstrap_functions.array_length(send_addresses) > 0)
                            {
                                if(fee)
                                {
                                    fee = parseInt((parseFloat(fee) * 100000000));
                                }
                                else
                                {
                                    fee = $.fn.blockstrap.settings.blockchains[chain].fee;
                                    fee = parseInt((parseFloat(fee) * 100000000));
                                }
                                if(fee)
                                {
                                    // Get address from private key
                                    // Check unspents for address
                                    // Construct new TX with change returning to address
                                    var checked = 0;
                                    var inputs = [];
                                    var input_index = 0;
                                    var inputs_to_sign = [];
                                    var outputs = [];
                                    var amount_needed = amount + fee;
                                    var amount_used = 0;
                                    var tx = new nwbs.bitcoin.TransactionBuilder(network);
                                    $.each(private_keys, function(key_index)
                                    {
                                        var keys = nwbs.bitcoin.ECPair.fromWIF(private_keys[key_index], network);
                                        var address = keys.getAddress(network).toString('hex');
                                        $.fn.blockstrap.api.unspents(address, chain, function(results)
                                        {
                                            checked++;
                                            if($.isArray(results) && blockstrap_functions.array_length(results) > 0)
                                            {
                                                $.each(results, function(i, o)
                                                {
                                                    if(amount_used < amount_needed)
                                                    {
                                                        tx.addInput(o.txid, o.index);
                                                        amount_used = amount_used + o.value;
                                                        inputs_to_sign.push(input_index);
                                                        input_index++;
                                                    }
                                                });
                                            }
                                            if(amount_used >= amount_needed)
                                            {
                                                if(checked >= blockstrap_functions.array_length(private_keys))
                                                {

                                                    $.each(send_addresses, function(i, send)
                                                    {
                                                        outputs.push({
                                                            address: send.address,
                                                            value: parseInt(send.val) * 100000000
                                                        });
                                                    })
                                                    var change = amount_used - amount_needed;
                                                    if(change > 0)
                                                    {
                                                        outputs.push({
                                                            address: address,
                                                            value: change
                                                        });
                                                    }

                                                    $.each(outputs, function(i, o)
                                                    {
                                                        tx.addOutput(o.address, o.value);
                                                    });

                                                    if(typeof to_data == 'string' && to_data)
                                                    {
                                                        var op = Crypto.util.base64ToBytes(btoa(to_data));
                                                        var op_return_data = nwbs.bitcoin.script.compile(op);
                                                        var op_return = nwbs.bitcoin.script.nullData.output.encode(op_return_data);
                                                        tx.addOutput(op_return, 0);
                                                    }

                                                    $.each(inputs_to_sign, function(k)
                                                    {
                                                        tx.sign(k, keys);
                                                    });

                                                    var built = tx.build();
                                                    var raw = built.toHex();

                                                    if(raw)
                                                    {
                                                        var title = 'Raw Transaction';
                                                        var message = '<p>This is the raw transaction - waiting to be sent:</p>';
                                                        message+= '<pre data-chain="'+chain+'"><code>'+raw+'</code></pre>';
                                                        message+= '<div class="hidden" id="decoded-tx"></div>';
                                                        message+= '<div class="well" style="margin-bottom: 0">';
                                                            message+= '<div class="row">';
                                                                message+= '<div class="col-md-2"></div>';
                                                                message+= '<div class="col-md-4">';
                                                                    message+= '<a href="#" class="btn btn-default btn-block btn-decode" data-raw="'+raw+'" data-chain="'+chain+'" data-id="decoded-tx">decode</a>';
                                                                message+= '</div>';
                                                                message+= '<div class="col-md-4">';
                                                                    message+= '<a href="#" class="btn btn-primary btn-block bce-inline-relay">relay</a>';
                                                                message+= '</div>';
                                                                message+= '<div class="col-md-2"></div>';
                                                            message+= '</div>';
                                                        message+= '</div>';
                                                        $.fn.blockstrap.core.modal(title, message);
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                var title = 'Warning';
                                                var message = 'There is not enough unspent inputs to use for this transaction';
                                                $.fn.blockstrap.core.modal(title, message);
                                            }
                                        
                                        });
                                    });
                                }
                                else
                                {
                                    message = 'Missing or invalid fees';
                                    $.fn.blockstrap.core.modal(title, message);
                                }
                            }
                            else
                            {
                                message = 'No addresses selected to send to';
                                $.fn.blockstrap.core.modal(title, message);
                            }
                        }
                        else
                        {
                            message = 'No private keys to use for signing';
                            $.fn.blockstrap.core.modal(title, message);
                        }
                    }
                    else
                    {
                        $.fn.blockstrap.core.modal(title, message);
                    }
                }
                else
                {
                    $.fn.blockstrap.core.modal(title, message);
                }
            });
        }
    },
    tx: {
        decode: function(rawtx, chain)
        {
            var tx_info = {};
            var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
            var network = nwbs.bitcoin.networks[bitcoinjs_chain];
            tx_info.tx = nwbs.bitcoin.Transaction.fromHex(rawtx);
            tx_info.network = network;
            tx_info.format = bce.tx.format(tx_info.tx);
            tx_info.inputs = bce.tx.input(tx_info.tx);
            tx_info.outputs = bce.tx.output(tx_info.tx, network);
            return tx_info;
        },
        format: function(tx)
        {
            var result = {
                txid: tx.getId(),
                version: tx.version,
                locktime: tx.locktime,
            };
            return result;
        },
        input: function(tx)
        {
            var result = [];
            tx.ins.forEach(function(input, n){
                var vin = {
                    txid: input.hash.reverse().toString('hex'),
                    n : input.index,
                    script: nwbs.bitcoin.script.toASM(input.script),
                    sequence: input.sequence,
                }
                result.push(vin);
            })
            return result
        },
        output: function(tx, network)
        {
            var format = function(out, n, network){
                var vout = {
                    satoshi: out.value,
                    value: (1e-8 * out.value).toFixed(8),
                    n: n,
                    scriptPubKey: {
                        asm: nwbs.bitcoin.script.toASM(out.script),
                        hex: out.script.toString('hex'),
                        type: nwbs.bitcoin.script.classifyOutput(out.script),
                        addresses: [],
                    },
                };
                switch(vout.scriptPubKey.type){
                case 'pubkeyhash':
                case 'scripthash':
                    vout.scriptPubKey.addresses.push(nwbs.bitcoin.address.fromOutputScript(out.script, network));
                    break;
                }
                return vout
            }
            var result = [];
            tx.outs.forEach(function(out, n){
                result.push(format(out, n, network));
            })
            return result
        }
    }
}

document.addEventListener('DOMContentLoaded', function()
{
    bce.init();
});