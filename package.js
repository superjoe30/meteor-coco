Package.describe({
  summary: "JavaScript dialect that fixes CoffeeScript's WTFs. See https://github.com/satyr/coco"
});

var coco = require('coco');
var fs = require('fs');

Package.register_extension(
  "co", function (bundle, source_path, serve_path, where) {
    serve_path = serve_path + '.js';

    var contents = fs.readFileSync(source_path);
    var options = {bare: true};
    contents = new Buffer(coco.compile(contents.toString('utf8'), options));
    // XXX report coco compile failures better?

    bundle.add_resource({
      type: "js",
      path: serve_path,
      data: contents,
      where: where
    });
  }
);

Package.on_test(function (api) {
  api.add_files(['coco_tests.co', 'coco_tests.js'],
                ['client', 'server']);
});
