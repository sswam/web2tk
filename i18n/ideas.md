### Internationalization

- For internationalization, text such as headings and messages should not be simply hard-coded into templates, rather given a message-ID which maps to message data.
- Actual message text should still be included in templates as placeholder data.
- For simplicity, try to avoid messages having different language depending on plurals and gender.
- To avoid adding extra syntax, message data can be given as HTML, and processed to insert data and inflect words as needed.
- We need to be able to render messages both on the front-end and the back-end.
- We can format plurals based on Intl.PluralRules.
- We can also use formatting functions for numbers and dates.
- It might be easier to work out the details while implementing concrete examples.
- The problem here is that there is a gap between raw data and what should be displayed.
  - Simple example, local number and date formatting.
  - Complex example, adjusting a message sentence to match number and gender.
  - I guess we need a minimal JavaScript library to transform the raw data into display data.
  - Transforming input data into raw data to submit to the backend is a similar problem, and might be combined with validation.
  - Ideally we don't want to transform ALL raw data into display data, but do it only as needed.
  - I don't really want to add function calls into the data-field syntax, but it might be necessary.
  - We need functions that take a message and also reference data arguments. Build from primitive functions.
  - Computed fields might be an answer.



- Special data-field names can be used to look up plural suffixes and inflected words, e.g.:
  - <span data-field="number">12</span><span data-field=".messages.ordinal" data-ref="number">th</span>
  - We have <span id="item_count">42</span> <span id="messages.item:item_count">items</span>
