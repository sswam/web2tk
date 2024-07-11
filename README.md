# web2tk

a web toolkit focused on separation of concerns

## Motivation

A large web application may be implemented by several developers, having different responsibilities such as UI structural design, UI styling, UI functionality, back-end functionality, authentication and security, database design, deployment, and operations. It is good if each developer can work independently as much as possible, so that for example the user interface can be styled or themed without having to edit the files that define its structure, and the user interface structure can be rearranged without having to change the backend.

Popular front-end web frameworks do not separate these elements sufficiently, so it would not be possible for a front-end developer to change the styling or structure of the user interface without high-level programming skills. React JSX, for example, entangles HTML, JavaScript and CSS together, which is the opposite of what we are wanting to do here. Vue and Svelte are much more pleasant to work with, but still include HTML, JavaScript and CSS together in each file.


## Basic Technology

- HTML
- CSS
- JavaScript
- REST APIs
- Cookies
- Local Storage

## Components of a Web Application

- data store
  - filesystem
  - database
  - user records
- security
  - authentication
    - front-end authentication (cookies)
  - authorization
  - access control
    - filesystem users and permissions
- back-end
  - operations
  - API services
    - input validation
- front-end
  - user interface templates (HTML)
  - user interface functionality (JavaScript)
    - input validation
  - user interface styling (CSS)
- Internationalization
  - tag

## Front-end Toolkit

### Goals

- Keep things as simple as possible.
- Use simple, standard languages: HTML, CSS and JavaScript by default.
  - Do not add any additional syntax to HTML, CSS or JavaScript.
  - Add only simple class attributes to connect the HTML to CSS and JavaScript.
  - Add only one simple attribute to connect the HTML to data.
- Keep UI structure, style and functionality separate as much as possible.
  - A developer who knows only CSS can develop new styles for the app, pages and components.
  - A developer who knows only HTML can develop new pages and components for the app.
  - A developer who knows only JavaScript can develop new functionality for the app, pages and components.
- Input validation should be unified across front-end and back-end, with no duplication of effort.
- Pages can be rendered on front-end or back-end using the same rendering code.
- It should not be necessary to alter data-structures from the back-end to suit the front-end.

### Solution

- HTML template pages and components use only standard HTML features with no extra syntax.
- HTML template pages and components include placeholder data, and look similar to rendered pages and components.
- We can embed components into a page using an include function.
- We implement repeated and optional components by binding a single component in a template to a list in the page data.
  - In the data structure, null is equivalent to [], and "foo" is equivalent to ["foo"].
- HTML is connected to data using the data-field or d attribute.

- In the case that we want to show a message when a datum "foo" is empty or missing, we can use the data-field="foo!", i.e. append "!" to the field name.
- When a component with a data-field="bar" is nested inside a container with data-field="foo", the full field name is "foo.bar".
- To access an absolute field name, prefix it with ".", for example data-field=".user.name"
- When a component with data-field `foo` is repeated 3 times, for example, the final field names are "foo.0", "foo.1" and "foo.2".
- When a component is hidden because it is bound to an empty list or null, it is marked with class "null", rather than being entirely removed from the document. That class will set CSS `display: none`. This enables to repopulate the component if the data changes.
- Where data "foo" is to be substituted into other text, use `<span data-field="foo">` or similar.
- Data is plain-text by default.
  - HTML data could be processed into DOM nodes before presentation to distinguish it from text data
  - Field names that end in -html could be interpreted as HTML.
- To bind `<a data-field="link" href="...">` or `<img data-field="image" src="...">` to data, we can have `link.href` and `foo.src` in the data. This would work similarly for any attribute.
- We can bind data to form fields with just `<form data-field=".">` or `<form data-field="user.settings">` etc., and it will bind data to each named form field e.g. `<input name="fullname">` would be bound to data `user.settings.fullname`.
- the [attribute^="value"] selector can be used to select elements with the specified attribute, whose value starts with the specified value.
- In some cases we need to format data before display, such as dates, numbers, and amounts of money. We can use the data-format or f attribute, with the name of a format. The format name is used to look up a formatting function.
- For editable data, the specified format name is also used to look up a parsing function.
- For dynamic messages, the data might be { "template": "There are <span d='items' f='.cardinal'>12</span> <span d='.plurals.ITEM' d2='items' f='.plural'>items</span>.", "items": 12 }.
  - This still isn't quite right. Need to be able to bind a message to any set of data by name. Could use like data-field-items=".items" or d-items=".items"?
