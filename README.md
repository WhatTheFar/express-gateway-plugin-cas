# express-gateway-plugin-cas
CAS plugin for [Express Gateway](http://www.express-gateway.io/) with external Database

## Installation

Simply type from your shell environment:

```bash
eg plugin install express-gateway-plugin-rewrite
```

## Quick start

1. Make sure the plugin is listed in [system.config.yml file](https://www.express-gateway.io/docs/configuration/system.config.yml/).
This is done automatically for you if you used the command above.

2. Add the configuration keys to [gateway.config.yml file](https://www.express-gateway.io/docs/configuration/gateway.config.yml/).

```yaml
policies:
  -
    jwt-auth:
```

### Configuration Policies

`jwt-auth`: The policy can verify requests containing JSON Web Tokens. A token must be passed through the Authorization header with the scheme 'bearer'

### Detailed documentation:

[Express Gateway Overview](http://www.express-gateway.io/about/)

Express Gateway plugin explanation:
[Plugin Documentation](http://www.express-gateway.io/docs/plugins/)

CLI for installing and configuring plugin: 
[Plugins CLI](http://localhost:4000/docs/cli/plugins/)

Guidlines how to write your custom plugin:
[Plugin Development Guide](http://www.express-gateway.io/docs/plugins/development-guide)

[Express Gateway Boot Sequence](http://www.express-gateway.io/docs/plugins/boot-sequence) explains order in which plugin entities are loaded and executed. 

## Want to make your own plugin?

Just check out our [plugin development guide](https://www.express-gateway.io/docs/plugins/).
We can't wait to see your custom stuff in the Gateway!