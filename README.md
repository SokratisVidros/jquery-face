# jquery-face
A comprehensive profile picture renderer.

jQuery-face is a jQuery plugin for seamless profile picture rendering. At first, until the image request is resolved, it renders a content placeholder insired by [Facebook](https://codepen.io/Mestika/pen/ByNYBa). As soon as the image is retrieved, it replaces the placeholder with it. If fetching fails, an exponential backoff retrieval strategy kicks in and tries to refetch the original image. Lastly, when maximum retries have been reached, it renders a fallback image and prevents broken UIs.

Although the plugin can be used for any type of image, it is preferable at the moment to optimize it for squared images such as Facebook or Twitter profile pictures.

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

### defaultURL
A string representing the URL of the fallback image.

Default: The defaultURL is a an image embedded with data-uri.

### retries
An integer indicating the number of failed attempts.

Default: 3

### interval
An integera indicating the exponential backoff interval between failed attempts.

Default: 250
