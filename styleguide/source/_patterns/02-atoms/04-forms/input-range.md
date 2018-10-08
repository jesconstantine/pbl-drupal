---
title: 'Range Input'
---
#### Description
input elements of type "range" let the user specify a numeric value which must be no less than a given value, and no more than another given value. The precise value, however, is not considered important. This is typically represented using a slider or dial control rather than a text entry box like the "number" input type. Because this kind of widget is imprecise, it shouldn't typically be used unless the control's exact value isn't important.

*[Source: MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)*

#### Variables
~~~
id: string / required
min: integer / required
max: integer / required
step: integer / required / default 'any'
~~~
