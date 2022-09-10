require 'yaml'
require 'erb'
require 'logger'


def logger
  Logger.new($stdout)
end

# @return [String]
# @param [Hash] env
def build_from_erb(env)
  popup_js = ERB.new(
    File.open('./src/popup.js.erb').read,
    nil, '-'
  ).result(binding)
end

desc "build src for development"
task :build do
  `mkdir -p dev`
  env = YAML.load_file('src/env.yml')['development']
  File.write('dev/popup.js', build_from_erb(env))

  `cp src/popup.html dev/popup.html`
  `cp src/manifest.json dev/manifest.json`

  logger.info 'built!'
end

desc "build src for production"
task :production_build do
  `mkdir -p dist`
  env = YAML.load_file('src/env.yml')['production']
  File.write('dist/popup.js', build_from_erb(env))

  `cp src/popup.html dist/popup.html`
  `cp src/manifest.json dist/manifest.json`

  logger.info 'built!'
end

task default: :build
