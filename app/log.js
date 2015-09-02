define([], function(){

	var DEBUG_ENABLED = DEBUG_MODE || true;
	var _error, _warn, _info, _log, _debug, _dir;
	if(DEBUG_ENABLED && (typeof console != 'undefined')) {
		_error = console.error.bind(console);
		_warn = console.warn.bind(console);
		_info = console.info.bind(console);
		_log = console.log.bind(console);
    	_debug = console.debug.bind(console);
    	_dir = console.dir.bind(console);
	}
	else {
	    _error = _warn = _info = _log = _dir = _debug = function() {};
	}

	return {
		error: _error,
		warn: _warn,
		info: _info,
		log: _log,
		debug: _debug,
		dir: _dir
	};
});