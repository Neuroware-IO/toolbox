/*
 * 
 *  Blockstrap v0.6.0.1
 *  http://blockstrap.com
 *
 *  Designed, Developed and Maintained by Neuroware.io Inc
 *  All Work Released Under MIT License
 * 
 */

(function($) 
{   
    var multisig = {};
    
    multisig.address = function(seed, chain, keys, required)
    {
        var key_pairs = multisig.generate(seed, chain, keys, required);
        var index = blockstrap_functions.array_length(key_pairs) - 1;
        if(typeof key_pairs[index].address != 'undefined') return key_pairs[index].address;
        else return false;
    }
    
    multisig.decode = function(script, chain)
    {
        var keys = [];
        var script = nwbs.bitcoin.Script.fromHex(script);
        var blockchain_key = $.fn.blockstrap.blockchains.key(chain);
        var blockchain_obj = nwbs.bitcoin.networks[blockchain_key];
        var chunks = script.chunks;
        chunks = chunks.slice(1, blockstrap_functions.array_length(chunks) - 2);
        $.each(chunks, function(k, key)
        {
            keys.push({
                address: nwbs.bitcoin.ECPubKey.fromBuffer(key).getAddress(blockchain_obj).toString(),
                key: nwbs.bitcoin.ECPubKey.fromBuffer(key).toHex()
            });
        });
        return keys;
    }
    
    multisig.generate = function(seed, chain, keys, required)
    {
        if(typeof keys == 'undefined')
        {
            keys = 3;
        }
        if(typeof required == 'undefined' || !parseInt(required))
        {
            required = 2;
        }
        if(typeof seed == 'undefined' || !seed && typeof keys == 'number')
        {
            hashed_seed = CryptoJS.SHA3(navigator.userAgent + Date.now(), { outputLength: 512 }).toString();
            seed = CryptoJS.SHA3(hashed_seed, { outputLength: 512 }).toString();
        }
        else if(typeof keys == 'number')
        {
            seed = CryptoJS.SHA3(seed, { outputLength: 512 }).toString();
            hashed_seed = seed;
        }
        else
        {
            hashed_seed = '';
        }
        if(typeof chain == 'undefined' || !chain)
        {
            var chain = 'btc';
        }
        var address = false;
        var key_pairs = keys;
        var lib = $.fn.blockstrap.settings.blockchains[chain].lib;
        if(typeof keys == 'number')
        {
            key_pairs = $.fn.blockstrap.blockchains.keys(seed, chain, keys);
        }
        if($.isArray(key_pairs))
        {
            var keys = [];
            var redeem_script = nwbs.bitcoin.script.multisig.output.encode(2, key_pairs); // 2 of 3
            var script_key = nwbs.bitcoin.script.scriptHash.output.encode(nwbs.bitcoin.crypto.hash160(redeem_script));
            var address = nwbs.bitcoin.address.fromOutputScript(script_key);
            keys.push({
                seed: hashed_seed,
                script: redeem_script.toString('hex'),
                address: address
            });
            return keys;
        }
        else
        {
            return false;
        }
    }
    
    multisig.publicize = function(keys)
    {
        var public_keys = [];
        if($.isArray(keys))
        {
            $.each(keys, function(k, key)
            {
                public_keys.push(nwbs.bitcoin.ECPubKey.fromHex(key));
            });
        }
        return public_keys;
    }
    
    // MERGE THE NEW FUNCTIONS WITH CORE
    $.extend(true, $.fn.blockstrap, {multisig:multisig});
})
(jQuery);
