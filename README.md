# jquery-face

A comprehensive profile picture renderer.

![Demo](http://g.recordit.co/Lum0bLIr1E.gif)

jQuery-face is a jQuery plugin for seamless profile picture rendering. At first, until the image request is resolved, it renders a content placeholder insired by [Facebook](https://codepen.io/Mestika/pen/ByNYBa). As soon as the image is retrieved, it replaces the placeholder. If fetching fails, an exponential backoff retrieval strategy kicks in and tries to refetch the original image. Lastly, when maximum retries have been reached, it renders a fallback image and prevents broken UIs.

Although the plugin can be used for any type of image, at the moment, it's optimal for squared images such as those used in Facebook or Twitter profile pictures.

[![Build Status](https://travis-ci.org/SokratisVidros/jquery-face.svg?branch=master)](https://travis-ci.org/SokratisVidros/jquery-face)

## Usage

1. Copy and include javascript, stylesheet to your project.

2. Set the data-face attribute on the avatar element

   ```
   <section>
      <div data-face='image_url_goes_here'/>`.
    </section>
   ```

3. Invoke the plugin in your document ready handler.

   ```
   $(function() {
      $('section').face();
   });
   ```

## Options

### className
A string representing the class attribute assigned to the wrapping div element.

Default: 'crop'

### imgProps
An object rendered as the img HTML properties.

Default: {}

### defaultImgProps
An object representing the default avatar configuration. The default url property is a an image embedded with data-uri. 

Alternatively, the template string property can be used to render the provided markup as a fallback.

Default:
```
{
   url: DEFAULT_AVATAR,
   template: false
}
```

### retries
An integer indicating the number of failed attempts.

Default: 3

### interval
An integer indicating the exponential backoff interval between failed attempts.

Default: 250

## License

[The MIT License](./LICENSE)

Copyright (c) 2016 Sokratis Vidros
