Prism.languages.http['request-line'] = {
    pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s\S+\sHTTP\/[0-9.]+/m,
    inside: {
        // HTTP Verb
        property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
        // Path or query argument
        'attr-name': /:\w+/
    }
}