var blockstrap_options = {
    v: "0.8.0.1",
    id: "blockstrap",
    account_poll: false,
    api_service: 'blockcypher',
    default_api: 'blockcypher',
    install: false,
    skip_config: true,
    html_base: "html/",
    data_base: "data/",
    core_base: "blockstrap/",
    theme_base: "themes/",
    dependency_base: "js/dependencies/",
    module_base: "js/modules/",
    bootstrap: false,
    buttons: false,
    styles: false,
    timeouts: {
        default: 750,
        loader: 750,
        isotope_delay: 750,
        clear_forms: 50, // Related to a strange firefox bug
        delayed_init: 750, // Are we sure we need this? Was 3000
        bs_buttons_submit_payment: 750, // Are we sure we need this? Was 6000
        bs_forms_switch_address: 750, // Are we sure we need this? Was 6000
        bs_widgets_request: 750, // Are we sure we need this? Was 6000
        es_buttons_confirm: 750, // Are we sure we need this? Was 6000
        es_ready_iso_delay: 750, // Are we sure we need this? Was 6000
        es_forms_edit: 750, // Are we sure we need this? Was 6000
        es_forms_record: 750, // Are we sure we need this? Was 6000
        es_instances_setup: 750, // Are we sure we need this? Was 6000
        es_txs_commit: 750, // Are we sure we need this? Was 6000
        es_txs_confirm: 750, // Are we sure we need this? Was 6000
        es_txs_prepare: 750, // Are we sure we need this? Was 6000
    },
    confirmations: {
        default: 0
    },
    styles: false,
    blockchains: {
        btct: {
            blockchain: "Bitcoin (Testnet)",
            lib: "bitcointestnet",
            apis: {
                blockcypher: "http://api.blockcypher.com/v1/btc/test3/",
                blocktrail: "https://api.blocktrail.com/v1/tBTC/",
                toshi: "https://testnet3.toshi.io/api/v0/",
                qt: "proxies/rpc.php?blockchain=btct"
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 38
        },
        dasht: {
            blockchain: "DashPay (Testnet)",
            lib: "dashpaytestnet",
            apis: {
                
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 78
        },
        doget: {
            blockchain: "Dogecoin (Testnet)",
            lib: "dogecointestnet",
            apis: {
                blockstrap: "http://officeapi.neuroware.io/v0/doget/",
                spinal: "http://spinal.neuroware.io/v1/doget/"
            },
            fee: 2,
            op_return: true,
            op_limit: 78
        },
        ltct: {
            blockchain: "Litecoin (Testnet)",
            lib: "litecointestnet",
            apis: {
                
            },
            fee: 0.001,
            op_return: true,
            op_limit: 0
        },
        multi: {
            private: true,
            apis: {
                blockstrap: "http://officeapi.neuroware.io/v0/multi/"
            }
        },
        btc: {
            blockchain: "Bitcoin",
            lib: "bitcoin",
            apis: {
                blockcypher: "http://api.blockcypher.com/v1/btc/main/",
                blocktrail: "https://api.blocktrail.com/v1/btc/",
                spinal: "http://spinal.neuroware.io/v1/btc/",
                toshi: "https://bitcoin.toshi.io/api/v0/"
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 38
        },
        dash: {
            blockchain: "DashPay",
            lib: "dashpay",
            apis: {
                
            },
            fee: 0.0001,
            op_return: true,
            op_limit: 78
        },
        doge: {
            blockchain: "Dogecoin",
            lib: "dogecoin",
            apis: {
                blockcypher: "http://api.blockcypher.com/v1/doge/main/",
                qt: "proxies/rpc.php?blockchain=doge"
            },
            fee: 1,
            op_return: true,
            op_limit: 78
        },
        ltc: {
            blockchain: "Litecoin",
            lib: "litecoin",
            apis: {
                
            },
            fee: 0.001,
            op_return: true,
            op_limit: 0
        }
    },
    apis: {
        available: {
            blockcypher: "BlockCypher",
            spinal: "Spinal"
        },
        defaults: {
            blockcypher: {
                async: false,
                functions: {
                    to: {
                        address: "addrs/$call/full",
                        addresses: "addrs/$call/full",
                        block: "blocks/",
                        op_returns: "addrs/$call/full",
                        relay: "txs/push/",
                        relay_param: "tx",
                        relay_json: "tx",
                        transaction: "txs/",
                        transactions: "addrs/$call/full",
                        unspents: "addrs/$call?unspentOnly=true&includeScript=true"
                    },
                    from: {
                        address: {
                            key: "",
                            address: "address",
                            hash: "",
                            tx_count: "final_n_tx",
                            received: "total_received",
                            balance: "final_balance"
                        },
                        addresses: {
                            key: "",
                            address: "address",
                            hash: "",
                            tx_count: "final_n_tx",
                            received: "total_received",
                            balance: "final_balance"
                        },
                        block: {
                            key: "",
                            height: "height",
                            hash: "hash",
                            prev: "prev_block",
                            next: "",
                            next: "",
                            tx_count: "n_tx",
                            time: "[time, utctoepoch]"
                        },
                        op_returns: {
                            key: "",
                            inner: "txs",
                            txid: "hash",
                            data: "script"
                        },
                        relay: {
                            txid: "hash",
                            inner: "tx"
                        },
                        transaction: {
                            key: "",
                            txid: "hash",
                            size: "size",
                            block: "block_height",
                            time: "[received, utctoepoch]",
                            input: "[total, +, fees, int]",
                            output: "total",
                            value: "[total, -, fees, int]",
                            fees: "fees",
                            data: "transactions.outputs.data_string"
                        },
                        transactions: {
                            key: "",
                            inner: "txs",
                            txid: "hash",
                            size: "size",
                            block: "block_height",
                            time: "[received, utctoepoch]",
                            input: "[total, +, fees, int]",
                            output: "total",
                            value: "[outputs, value]",
                            fees: "fees",
                            data: "transactions.outputs.data_string",
                            transactions: "txs"
                        },
                        unspents: {
                            key: "",
                            inner: "txrefs",
                            inner_unconfirmed: "unconfirmed_txrefs",
                            confirmations: "confirmations",
                            txid: "tx_hash",
                            index: "tx_output_n",
                            value: "value",
                            script: "script"
                        }
                    }
                }
            },
            spinal: {
                async: false,
                key: [],
                key_name: "",
                functions: {
                    to: {
                        address: 'addr/$call/1/txfull',
                        dnkeys: 'dnkey/',
                        op_returns: "addr/$call/1/txfull",
                        relay: "tx/relay/",
                        relay_param: "tx",
                        relay_json: "tx",
                        transaction: "tx/$call/verbose",
                        transactions: "addr/$call/1/txfull",
                        unspents: "addr/$call/1/unspent"
                    },
                    from: {
                        address: {
                            key: "",
                            address: "address",
                            hash: "address_hash160",
                            tx_count: "transaction_count_total",
                            received: "[tx_list]",
                            balance: "[tx_list]",
                            txs: "tx_list"
                        },
                        dnkeys: {
                            key: "",
                            dnkeys: "dnkeys"
                        },
                        op_returns: {
                            key: "",
                            inner: "tx_list",
                            txid: "id",
                            data: "script_hex"
                        },
                        relay: {
                            key: "",
                            txid: "tx"
                        },
                        transaction: {
                            key: "",
                            txid: "id",
                            size: "N/A",
                            block: "block_height",
                            time: "time",
                            input: "input_value",
                            output: "output_value",
                            value: "N/A",
                            fees: "fees_value"
                        },
                        transactions: {
                            key: "tx_list",
                            txid: "id",
                            size: "N/A",
                            block: "block_height",
                            time: "time",
                            input: "input_value",
                            output: "output_value",
                            value: "N/A",
                            fees: "fees_value"
                        },
                        unspents: {
                            key: "",
                            inner: "uxto_list",
                            confirmations: "",
                            txid: "tx_hash",
                            index: "pos",
                            value: "value",
                            script: "script_hex"
                        }
                    }
                }
            }
        }
    }
};
    
var blockstrap_defaults = JSON.stringify(blockstrap_options);