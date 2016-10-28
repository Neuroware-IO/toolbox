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
        init: function()
        {
            bce.buttons.child();
            bce.buttons.multi();
            bce.buttons.pair();
            bce.buttons.qr();
            bce.buttons.relay();
            bce.buttons.spend();
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
        pair: function()
        {
            $('a.btn.key-pair').on('click', function(e)
            {
                e.preventDefault();
                var html = bce.html.forms.pair();
                $.fn.blockstrap.core.modal('Generate Key Pairs', html);
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
                            var base_url = 'http://spinal.neuroware.io/v1/'+chain+'/tx/';
                            var tx_url = base_url + tx.txid + '/verbose';
                            title = 'Success';
                            message = '<p>Successfully <a href="'+tx_url+'" target="_blank">RELAYED</a> Transaction ID: '+tx.txid+'</p>';
                        }
                        $.fn.blockstrap.core.modal(title, message);
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
            child: function()
            {
                var chains = [
                    {
                        value: 'doget',
                        text: 'Dogecoin Testnet'
                    },
                    {
                        value: 'doge',
                        text: 'Dogecoin'
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
            input: function(id, label, type, placeholder, readonly, button)
            {
                if(typeof button == 'undefined') button = false;
                if(typeof placeholder == 'undefined') placeholder = '';
                if(typeof readonly == 'undefined' || !readonly) readonly = '';
                else readonly = 'readonly="readonly"';
                if(typeof id != 'undefined' && typeof label != 'undefined')
                {
                    var html = '<div class="form-group">';
                        html+= '<label for="'+id+'" class="col-sm-5 control-label">';
                        html+= label;
                        if(button && (button == 'check' || button == 'qr' || button == 'lookup' || button == 'test'))
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
                                html+= '<input type="'+type+'" class="form-control" id="'+id+'" placeholder="'+placeholder+'" '+readonly+' />';
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
                        value: 'doget',
                        text: 'Dogecoin Testnet'
                    },
                    {
                        value: 'doge',
                        text: 'Dogecoin'
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
                            value: 'doget',
                            text: 'Dogecoin Testnet'
                        },
                        {
                            value: 'doge',
                            text: 'Dogecoin'
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
                        value: 'doget',
                        text: 'Dogecoin Testnet'
                    },
                    {
                        value: 'doge',
                        text: 'Dogecoin'
                    }
                ];  
                var html = '<form id="bce-spend" class="form-horizontal">';
                    html+= '<p>Send a transaction from a multi-signature account using the form below:</p>';
                    html+= bce.html.forms.select('bce-chain', 'Blockchain', chains);
                    html+= bce.html.forms.input('bce-ms-address', 'Multi-Sig Address', 'text', 'The address to check / use ...', false, 'lookup');
                    html+= bce.html.forms.input('bce-ms-redeem', 'Redeem Script', 'text', 'For validating keys ...', false, 'test');
                    html+= '<br><span class="alert alert-warning alert-block">waiting for inputs</span><br>';
                    html+= bce.html.forms.input('bce-to-address', 'To Address', 'text', 'Where to send...?');
                    html+= bce.html.forms.input('bce-to-amount', 'Amount', 'text', 'How much to send...?');
                    html+= bce.html.forms.input('bce-to-data', 'Optional Data', 'text', 'Limited to 38 characters');
                    html+= '<hr>';
                    html+= bce.html.forms.input('bce-private-01', '1st Private Key', 'text', 'Any one of the three ...');
                    html+= bce.html.forms.input('bce-private-02', '2nd Private Key', 'text', 'Any one of the three ...');
                    html+= '<hr>';
                    html+= '<div class="row">';
                        html+= '<div class="col-md-6"><a href="#" class="btn btn-default btn-block">RESET</a></div>';
                        html+= '<div class="col-md-6"><a href="#" class="btn btn-primary btn-block btn-spend">SEND</a></div>';
                    html+= '</div>';
                html+= '</form>';
                return html;
            }
        }
    },
    init: function()
    {
        bce.buttons.init();
        bce.forms.init();
    },
    forms: {
        child: function()
        {
            $('body').on('keyup', 'form#bce-child-key input#bce-extended-key', function()
            {
                var chain = $('form#bce-child-key select#bce-chain').val();
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = bitcoin.networks[bitcoinjs_chain];
                var key = $(this).val();
                try{
                    var keys = bitcoin.HDNode.fromBase58(key, network);
                }
                catch(e)
                {
                    var keys = false;
                }
                if(typeof keys.depth != 'undefined')
                {
                    $('form#bce-child-key input#bce-key-depth').val(keys.depth);
                }
                if(typeof keys.index != 'undefined')
                {
                    $('form#bce-child-key input#bce-key-index').val(keys.index);
                }
                if(typeof keys.depth == 'undefined' && typeof keys.index == 'undefined')
                {
                    $('form#bce-child-key input#bce-key-depth').val('');
                    $('form#bce-child-key input#bce-key-index').val('');
                    $('form#bce-child-key input#bce-extended-address').val('');
                    $('form#bce-child-key input#bce-extended-private').val('');
                    $('form#bce-child-key input#bce-extended-wif').val('');
                    $('form#bce-child-key input#bce-extended-public').val('');
                    $('form#bce-child-key input#bce-derive-path').val('');
                    $('form#bce-child-key input#bce-keys-index').val('');
                    $('form#bce-child-key input#bce-keys-depth').val('');
                }
            });
            $('body').on('keyup', 'form#bce-child-key input#bce-derive-path', function()
            {
                var chain = $('form#bce-child-key select#bce-chain').val();
                var key = $('form#bce-child-key input#bce-extended-key').val();
                var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                var network = bitcoin.networks[bitcoinjs_chain];
                var path = $(this).val();
                var paths = path.split(',');
                try{
                    var keys = bitcoin.HDNode.fromBase58(key, network);
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
                    var this_address = keys.getAddress().toString();
                    var priv_key = keys.toString();
                    var wif = keys.privKey.toWIF(network);
                    var pub_key = keys.neutered().toString();
                    if(pub_key == priv_key) priv_key = 'N/A';
                    $('form#bce-child-key input#bce-extended-address').val(this_address);
                    $('form#bce-child-key input#bce-extended-private').val(priv_key);
                    $('form#bce-child-key input#bce-extended-wif').val(wif);
                    $('form#bce-child-key input#bce-extended-public').val(pub_key);
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
        init: function()
        {
            bce.forms.child();
            bce.forms.pair();
            bce.forms.multi();
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
                var network = bitcoin.networks[bitcoinjs_chain];
                if(key1 && key2 && key3)
                {
                    try{
                        var multisig_keys = $.fn.blockstrap.multisig.generate(false, chain, [
                            {hex:bitcoin.HDNode.fromBase58(key1, network).pubKey.toHex()},
                            {hex:bitcoin.HDNode.fromBase58(key2, network).pubKey.toHex()},
                            {hex:bitcoin.HDNode.fromBase58(key3, network).pubKey.toHex()}
                        ], 2);
                    }
                    catch(e)
                    {
                        var multisig_keys = false;
                    }
                    if(multisig_keys)
                    {
                        if(typeof multisig_keys[3].address != 'undefined' && multisig_keys[3].script != 'undefined')
                        {
                            var ms_address = multisig_keys[3].address;
                            var ms_script = multisig_keys[3].script;
                            $('form#bce-multi-sig input#bce-ms-address').val(ms_address);
                            $('form#bce-multi-sig input#bce-ms-script').val(ms_script);
                        }
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
                    var hash = bitcoin.crypto.sha256(salt + seed + pw + chain).toString('hex');
                    var keys = $.fn.blockstrap.blockchains.keys(hash, chain, 1, false, true);
                    var keys = $.fn.blockstrap.blockchains.keys(hash, chain, 1, false, true);
                    $('form#bce-key-pair #bce-hd-private').val(keys.raw.toString());
                    $('form#bce-key-pair #bce-private').val(keys.priv);
                    $('form#bce-key-pair #bce-public').val(keys.raw.pubKey.toHex());
                    $('form#bce-key-pair #bce-address').val(keys.pub);
                    $('form#bce-key-pair #bce-hd-public').val(keys.raw.neutered().toString());
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
        spend: function()
        {
            $('.modal').on('click', 'a.btn-spend', function(e)
            {
                e.preventDefault();
                var form = $(this).parent().parent().parent();
                var chain = $(form).find('select#bce-chain').val();
                var address = $(form).find('input#bce-ms-address').val();
                var redeem = $(form).find('input#bce-ms-redeem').val();
                var to_data = $(form).find('input#bce-to-data').val();
                var to_address = $(form).find('input#bce-to-address').val();
                var to_amount = $(form).find('input#bce-to-amount').val();
                var priv1 = $(form).find('input#bce-private-01').val();
                var priv2 = $(form).find('input#bce-private-02').val();
                var fee = parseInt((parseFloat($.fn.blockstrap.settings.blockchains[chain].fee) * 100000000));
                if(priv1 && priv2 && chain && address && to_address && to_amount)
                {
                    // Get address from private key
                    // Check unspents for address
                    // Construct new TX with change returning to address
                    var checked = 0;
                    var inputs = [];
                    var outputs = [];
                    var input_index = 0;
                    var inputs_to_sign = [];
                    var amount_needed = parseInt((parseFloat(to_amount) * 100000000)) + fee;
                    var amount_used = 0;
                    var keys1 = bitcoin.ECKey.fromWIF(priv1);
                    var keys2 = bitcoin.ECKey.fromWIF(priv2);
                    var tx = new bitcoin.TransactionBuilder();
                    $.fn.blockstrap.api.unspents(address, chain, function(results)
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
                        if(amount_used >= amount_needed)
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
                                var op_out = bitcoin.Script.fromHex(op).toBuffer();
                                var op_return = bitcoin.Script.fromChunks(
                                [
                                    bitcoin.opcodes.OP_RETURN,
                                    op_out
                                ]);
                                tx.addOutput(op_return, 0);
                            }
                            $.each(inputs_to_sign, function(k)
                            {
                                tx.sign(k, keys1, bitcoin.Script.fromHex(redeem));
                                tx.sign(k, keys2, bitcoin.Script.fromHex(redeem));
                            });
                            var built = tx.build();
                            var raw = built.toHex();
                            if(raw)
                            {
                                var title = 'Raw Transaction';
                                var message = '<p>This is the raw transaction - waiting to be sent.</p>';
                                message+= '<pre data-chain="'+chain+'"><code>'+raw+'</code></pre>';
                                message+= '<div class="well" style="margin-bottom: 0">';
                                    message+= '<div class="row">';
                                        message+= '<div class="col-md-2"></div>';
                                        message+= '<div class="col-md-4">';
                                            message+= '<a href="#" class="btn btn-default btn-block">decode</a>';
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
                var amount = $(form).find('input#amount').val();
                var fee = $(form).find('input#fee').val();
                var data = $(form).find('input#data').val();
                var title = 'Warning';
                var message = 'Need to select a valid blockchain';
                if(
                    chain 
                    && typeof $.fn.blockstrap.settings.blockchains[chain] != 'undefined'
                    && typeof $.fn.blockstrap.settings.blockchains[chain].blockchain != 'undefined'
                ){
                    var bitcoinjs_chain = $.fn.blockstrap.blockchains.key(chain);
                    var network = bitcoin.networks[bitcoinjs_chain];
                    message = 'Need to send something somewhere, even if encoding data and sending back to yourself';
                    if(amount)
                    {
                        $('.input-private').each(function(i)
                        {
                            private_keys.push($(this).val());
                        });
                        $('.input-address').each(function(i)
                        {
                            send_addresses.push($(this).val());
                        });
                        if(blockstrap_functions.array_length(private_keys) > 0)
                        {
                            if(blockstrap_functions.array_length(send_addresses) > 0)
                            {
                                amount = parseInt((parseFloat(amount) * 100000000));
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
                                    var tx = new bitcoin.TransactionBuilder();
                                    $.each(private_keys, function(key_index)
                                    {
                                        var keys = bitcoin.ECKey.fromWIF(private_keys[key_index]);
                                        var address = keys.pub.getAddress(network).toString();
                                        $.fn.blockstrap.api.unspents(address, chain, function(results)
                                        {
                                            checked++;
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
                                            if(blockstrap_functions.array_length(send_addresses) == 1)
                                            {
                                                if(amount_used >= amount_needed)
                                                {
                                                    if(checked >= blockstrap_functions.array_length(private_keys))
                                                    {
                                                        outputs.push({
                                                            address: send_addresses[0],
                                                            value: amount
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
                                                        if(typeof data == 'string' && data)
                                                        {
                                                            var op = Crypto.util.base64ToBytes(btoa(data));
                                                            var op_out = bitcoin.Script.fromHex(op).toBuffer();
                                                            var op_return = bitcoin.Script.fromChunks(
                                                            [
                                                                bitcoin.opcodes.OP_RETURN,
                                                                op_out
                                                            ]);
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
                                                            var message = '<p>This is the raw transaction - waiting to be sent.</p>';
                                                            message+= '<pre data-chain="'+chain+'"><code>'+raw+'</code></pre>';
                                                            message+= '<div class="well" style="margin-bottom: 0">';
                                                                message+= '<div class="row">';
                                                                    message+= '<div class="col-md-2"></div>';
                                                                    message+= '<div class="col-md-4">';
                                                                        message+= '<a href="#" class="btn btn-default btn-block">decode</a>';
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
                                            }
                                            else
                                            {
                                                console.log('NOT READY FOR THIS YET');
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
    }
}

document.addEventListener('DOMContentLoaded', function()
{
    bce.init();
});