
desc "build src for development"
task :build do
  `cp src/popup.js dev/popup.js`
  `cp src/popup.html dev/popup.html`
  `cp src/manifest.json dev/manifest.json`
  # TODO erbで埋める
end

desc "build src for production"
task :production_build do
  `cp src/popup.js dev/popup.js`
  `cp src/popup.html dev/popup.html`
  `cp src/manifest.json dev/manifest.json`
end

task default: :build
