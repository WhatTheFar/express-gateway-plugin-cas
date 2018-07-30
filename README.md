# express-gateway-plugin-cas

CAS plugin for [Express Gateway](http://www.express-gateway.io/) with external Database

## Installation

Simply type from your shell environment:

```bash
eg plugin install express-gateway-plugin-cas
```

## Quick start

1.  Make sure the plugin is listed in [system.config.yml file](https://www.express-gateway.io/docs/configuration/system.config.yml/).
    This is done automatically for you if you used the command above. See [Configuration](#configuration) for more details.

2.  Add the configuration keys to [gateway.config.yml file](https://www.express-gateway.io/docs/configuration/gateway.config.yml/).

```yaml
policies:
  - secure-auth:
  -
    basic-auth:
      -
        action:
          passThrough: true
  -
    jwt-auth:
      -
        action:
          passThroughSafeMethod: true
```

### Configuration

The plugin requires a few configurations in `system.config.yml`.

```yaml
plugins:
  cas:
    package: express-gateway-plugin-cas
    DATABASE_URL: 'postgres://username:password@localhost:5432/db_name'
```
|Name|Description|Default|Require|
|----|-----------|:-----:|:-----:|
|DATABASE_URL|[PostgreSQL Connection Url](https://www.postgresql.org/docs/current/static/libpq-connect.html#LIBPQ-CONNSTRING)|-|Yes|
|AUTH_HEADER|a header for authenticated username|auth-user|-|
|ADMIN_KEY|custom api key, used for admin api authorisation|admin_key|-|
|JWT_SECRET|a string used to sign and verify jwt|jwt_secret|-|
|JWT_EXPIRATION_DELTA|This will be used to set the jwt expiration time.|null|-|
|JWT_REFRESH_EXPIRATION_DELTA|This is how much time after the original token that future tokens can be refreshed from.|null|-|
|USER_MODEL_PATH|path to sequelize model definition for a [custom user model](#customization)|null|-|
|ADMIN_CORS|the plugin is using [Express Cors](https://github.com/expressjs/cors) which follows [Configuration Options](https://github.com/expressjs/cors#configuration-options)|[default](#the-default-configuration-is-the-equivalent-of:)||

**Note:** `JWT_EXPIRATION_DELTA`, `JWT_REFRESH_EXPIRATION_DELTA` are strings describing a time span [zeit/ms](https://github.com/zeit/ms). Eg: "2 days", "10h", "7d". A string must provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").

#### The default configuration is the equivalent of:
```json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```

### Policies

`auth-secure`:
* Use to secure authenication of plugin
* Recommended to be used as a first policy in a pipline 

`basic-auth`:
* The Basic Authorization policy follows the [RFC-7617](https://tools.ietf.org/html/rfc7617) standard. From the standard, if a user agent wanted to send the user-id “Aladdin” and password “open sesame”, it would use the following HTTP header.

* Example: Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

`jwt-auth`: 
* The policy can verify requests containing JSON Web Tokens. A token must be passed through the Authorization header with the scheme 'bearer'

### Configuration Parameters

`action.passThrough`:

-   determines whether the gateway should execute the successive policy in case the auth process fails. If set to false, the gateway will return an Unauthorized response.
-   default value: false

`action.passThroughSafeMethod`:

-   same as `action.passThrough`, but determines only Safe Method
-   default value: false

**Note:** if you provide both actions, the `action.passThrough` has a higher priority.

## Customization

### User model

The plugin can import a custom model definition for User's table by providing a path to the exported model, otherwise it would use a default model.

We're using [Sequelize](http://docs.sequelizejs.com/) ORM to connect to the SQL database, which support [importing model definitions](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import) from a file. So, you can customize new model by using [Sequelize model definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html).
 And make sure that `USER_MODEL_PATH` has been set to your custom model in `system.config.yml` file.

**The username and password field are required in custom model for authentication stuff. For security, there is a built-in password hashing feature. The password will be hashed automatically without extra configuration in your custom model.**

For example, see [`custom-user-model.js`](https://gist.github.com/WhatTheFar/a8f26d692ea758ea06238eb1d7f3bc86).

**Note:** a path is relative to root project directory.

## Example

[drf-with-eg-cas](https://github.com/WhatTheFar/drf-with-eg-cas-example) is an example usecase of this plugin on top [Express gateway](https://www.express-gateway.io/) and [Django REST framework](http://www.django-rest-framework.org/) api

---

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
