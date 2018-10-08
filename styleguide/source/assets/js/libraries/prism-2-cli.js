Prism.languages.cli = Prism.languages.insertBefore('bash', 'punctuation', {
    'command-name': {
        'pattern': /((?:\b(?:akamai)\s+))[\w.\\]+/,
        'lookbehind': true
    },
    'command': /\b(?:akamai)\b/,
    'comment': /#.*/,
    'prompt': /(\$\s)/,
            'status': {
                'pattern': /(?:\[.*?])/,
                'inside': {
                    'ok': /(?:OK)/,
                    'warning': /(?:WARN)/,
                    'fail': /(?:FAIL)/
                }
            }
});