(function(){
  'use strict';
  
  function Validate () {

    const clazz = {
      // If the given argument is a call: function the and: function return the value
      // otherwise just return the value. Additional arguments will be passed as
      // arguments to the function.
      // Example:
      // ```
      // result('foo') // 'foo'
      // result(Math.max, 1, 2) // 2
      // ```
      result: function(value){
        let args = [].slice.call(arguments, 1);
        if (typeof value === 'function') {
          value = value.apply(null, args);
        }
        return value;
      },

      // Checks if the value is a number. This function does not consider NaN a
      // number like many other `isNumber` functions do.
      isNumber: function(value) {
        return typeof value === 'number' && !isNaN(value);
      },

      // Returns false if the object is not a function
      isFunction: function(value) {
        return typeof value === 'function';
      },

      // A simple check to verify that the value is an integer. Uses `isNumber`
      // and a simple modulo check.
      isInteger: function(value) {
        return this.isNumber(value) && value % 1 === 0;
      },

      // Checks if the value is a boolean
      isBoolean: function(value) {
        return typeof value === 'boolean';
      },

      // Uses the `Object` function to check if the given argument is an object.
      isObject: function(value) {
        return value === Object(value);
      },

      // Simply checks if the object is an instance of a date
      isDate: function(value) {
        return value instanceof Date;
      },

      // Returns false if the object is `null` of `undefined`
      isDefined: function(value) {
        return value !== null && value !== undefined;
      },

      isDomElement: function(value) {
        if (!value) {
          return false;
        }

        if (!value.querySelectorAll || !value.querySelector) {
          return false;
        }

        if (this.isObject(document) && value === document) {
          return true;
        }

        // http://stackoverflow.com/a/384380/699304
        /* istanbul ignore else */
        if (typeof HTMLElement === "object") {
          return value instanceof HTMLElement;
        } else {
          return value &&
            typeof value === "object" &&
            value !== null &&
            value.nodeType === 1 &&
            typeof value.nodeName === "string";
        }
      },

      isEmpty: function(value) {
        // Null and undefined are empty
        if (!this.isDefined(value)) {
          return true;
        }

        // functions are non empty
        if (this.isFunction(value)) {
          return false;
        }

        // Whitespace only strings are empty
        if (this.isString(value)) {
          const emptyRegex = /^\s*$/
          return emptyRegex.test(value);
        }

        // For arrays we use the length property
        if (this.isArray(value)) {
          return value.length === 0;
        }

        // Dates have no attributes but aren't empty
        if (this.isDate(value)) {
          return false;
        }

        // If we find at least one property we consider it non empty
        if (this.isObject(value)) {
          for (attr in value) {
            return false;
          }
          return true;
        }
        return false;
      },

      isString: function(value) {
        return typeof value === 'string';
      },

      isStringNumber: function(value){
        const PATTERN = /^\d+$/i
        if (this.isString(value)){
          return PATTERN.test(value)
        }
        return this.isNumber(value)
      },

      isArray: function(value) {
        return {}.toString.call(value) === '[object Array]';
      },

      isEmail: function(value){
        const PATTERN = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
        
        if (!this.isDefined(value)) {
          return false;
        }

        if (!this.isString(value)) {
          return false;
        }

        return PATTERN.test(value);
      },

      isUrl: function(value){
        const PATTERN = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isZip: function(value){
        const PATTERN = /^[0-9]{5}-[0-9]{3}$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isCpf: function(value){
        const PATTERN = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isCnpj: function(value){
        const PATTERN = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isHexColor: function(value){
        const PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isImage: function(value){
        const PATTERN = /^.*\.(jpg|gif|png)$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isPdf: function(value){
        const PATTERN = /^.*\.(pdf)$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isVideo: function(value){
        const PATTERN = /^.*\.(avi|mov|wmv|mp4|flv|mkv|rm)$/i
        if (!this.isString(value))
          return false
        if (this.isEmpty(value))
          return false
        return PATTERN.test(value)
      },

      isPhone: function(value) {
        if ( typeof value !== 'string' ) {
          value = value.toString();
        }
        value = value.replace(/[^0-9]/g,'');
        return value.length === 10;
      },

      isCellphone: function(value) {
        if ( typeof value !== 'string' ) {
          value = value.toString();
        }
        value = value.replace(/[^0-9]/g,'');
        return value.length === 11 && value.substring(2,3) == 9;
      },

      isStringDate: function(value){
        const PATTERN = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i
        if (this.isString(value)) {
          return PATTERN.test(value)
        }
        return this.isDate(value)
      },

      isTime: function(value){
        const PATTERN = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i
        if ( typeof value !== 'string' ) {
          value = value.toString();
        }
        return PATTERN.test(value)
      },

      isRangeWords: function(value, min, max) {
        if(!this.isString(value))
          return false
        const words = value.trim().split(' ').length
        if(min && max)
          return words >= min && words <= max
        if(min && !max)
          return words >= min
        if(!min && max)
          return words <= max
      },

      isRangeChars: function(value, min, max) {
        if(!this.isString(value))
          return false
        if(!min && !max)
          return true
        const chars = value.length
        if(min && max)
          return chars >= min && chars <= max
        if(min && !max)
          return chars >= min
        if(!min && max)
          return chars <= max
      },

      // @param {nodelist} list of inputs checkbox
      isOneChecked: function(nodeList) {
        let checked = false;
        for (var i = 0; i < nodeList.length; i++) {
          if ( nodeList[i].checked ) {
            checked = true;
            break;
          }
        }
        return checked;
      },

      isYes: function(nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
          if ( nodeList[i].checked === true && nodeList[i].value == 1 || nodeList[i].value === 'yes' ) {
            return true;
          }
        }
        return false;
      },


      isNo: function(nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
          if ( nodeList[i].checked === true && nodeList[i].value == 0 || nodeList[i].value === 'no' ) {
            return true;
          }
        }
        return false;
      },
    }
    return clazz;
  };
  window.Validate = new Validate();
})()