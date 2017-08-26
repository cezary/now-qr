# now-qrcode

This API serves static SVG images via URLs you can place in the src
attribute of an <img> tag.

A breakdown of the URL:

    https://qrcode.now.sh/qr?value=Hello%20World&width=500

- **https://qrcode.now.sh/qr?** - All URLS start with this root URL,
  followed by one or more parameters.
- **value** - The data to encode. Must be URL-encoded.
- **width** - The size of the image in pixels

## Alternatives

[Google Charts](https://developers.google.com/chart/infographics/docs/qr_codes) *deprecated*
# now-qr
