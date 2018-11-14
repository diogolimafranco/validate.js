# validate.js
Uma pequena lib javascript para validar tipos de dados enviador por formulários.

## Instalação

```js
<script src="dist/validate.min.js"></script>
```

## Implementação
Após a importação, a lib fica acessível globalmente através da propriedade 'Validate'

```js
<script>
  Validate.isEmail('email@sample.com')
  // return is true or false
</script>
```

## Métodos
* isNumber [value]
* isFunction [value]
* isInteger [value]
* isBoolean [value]
* isObject [value]
* isDate [value]
* isDefined [value]
* isDomElement [value]
* isEmpty [value]
* isString [value]
* isStringNumber [value]
* isArray [value]
* isEmail [value]
* isUrl [value]
* isZip [value]
* isCpf [value]
* isCnpj [value]
* isHexColor [value]
* isImage [value]
* isPdf [value]
* isVideo [value]
* isPhone [value]
* isCellphone [value]
* isStringDate [value]
* isTime [value]
* isRangeWords [value, min, max]
* isRangeChars [value, min, max]
* isOneChecked [nodeList]
* isYes [nodeList]
* isNo [nodeList]

## Colabore com este projeto
Se você gostou desta lib é quer contríbuir, basta abrir Issues ;)