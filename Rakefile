require 'yaml'
require 'erb'
require 'logger'


def logger
  Logger.new($stdout)
end

# @return [String]
# @param [Hash] env
def build_from_erb(env, from: )
  popup_js = ERB.new(
    File.open(from).read,
    trim_mode: '-'
  ).result(binding)
end

desc "build src for development"
task :build do
  `mkdir -p dev`
  env = YAML.load_file('src/env.yml')['development']
  File.write('dev/popup.js', build_from_erb(env, from: './src/popup.js.erb'))
  File.write('dev/manifest.json', build_from_erb(env, from: './src/manifest.json.erb'))
  File.write('dev/popup.html', build_from_erb(env, from: './src/popup.html.erb'))
  `cp ./src//icon16.png ./dev/`
  `cp ./src//icon48.png ./dev/`
  `cp ./src//icon128.png ./dev/`

  logger.info 'built!'
end

desc "build src for production"
task :production_build do
  `mkdir -p dist`
  env = YAML.load_file('src/env.yml')['production']
  File.write('dist/popup.js', build_from_erb(env, from: './src/popup.js.erb'))
  File.write('dist/manifest.json', build_from_erb(env, from: './src/manifest.json.erb'))
  File.write('dist/popup.html', build_from_erb(env, from: './src/popup.html.erb'))
  `cp ./src//icon16.png ./dist/`
  `cp ./src//icon48.png ./dist/`
  `cp ./src//icon128.png ./dist/`

  logger.info 'built!'
end

task default: :build
