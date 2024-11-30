// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require('@expo/metro-config')
const metroDefault = require('metro-config/src/defaults/defaults');
const path = require('node:path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true

config.transformer = { ...config.transformer, unstable_allowRequireContext: true }
config.transformer.minifierPath = require.resolve('metro-minify-terser')

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@brandonblack/musig/base_crypto') {
    return {
      filePath: path.resolve(workspaceRoot, 'node_modules/@brandonblack/musig/lib/base_crypto.js'),
      type: 'sourceFile',
    }
  }
  if (moduleName === 'entities/lib/maps/entities.json') {
    return {
      filePath: path.resolve(
        workspaceRoot,
        'node_modules/htmlparser2/node_modules/entities/lib/maps/entities.json'
      ),
      type: 'sourceFile',
    }
  }
  if (moduleName === 'entities/lib/maps/legacy.json') {
    return {
      filePath: path.resolve(
        workspaceRoot,
        'node_modules/htmlparser2/node_modules/entities/lib/maps/legacy.json'
      ),
      type: 'sourceFile',
    }
  }
  if (moduleName === 'entities/lib/maps/xml.json') {
    return {
      filePath: path.resolve(
        workspaceRoot,
        'node_modules/htmlparser2/node_modules/entities/lib/maps/xml.json'
      ),
      type: 'sourceFile',
    }
  }
  if (moduleName === '@silencelaboratories/dkls-wasm-ll-node') {
    return {
      filePath: path.resolve(
        workspaceRoot,
        'node_modules/@silencelaboratories/dkls-wasm-ll-web/dkls-wasm-ll-web.js'
      ),
      type: 'sourceFile',
    }
  }
  if (moduleName === '@silencelaboratories/dkls-wasm-ll-web') {
    return {
      filePath: path.resolve(
        workspaceRoot,
        'node_modules/@silencelaboratories/dkls-wasm-ll-web/dkls-wasm-ll-web.js'
      ),
      type: 'sourceFile',
    }
  }
  // otherwise chain to the standard Metro resolver.
  return context.resolveRequest(context, moduleName, platform)
}
config.resolver.extraNodeModules = {
  '@brandonblack/musig/base_crypto': path.resolve(
    workspaceRoot,
    'node_modules/@brandonblack/musig/lib/base_crypto.js'
  ),
  '@silencelaboratories/dkls-wasm-ll-node': path.resolve(
    workspaceRoot,
    'node_modules/@silencelaboratories/dkls-wasm-ll-web/dkls-wasm-ll-web.js'
  ),
  '@silencelaboratories/dkls-wasm-ll-web': path.resolve(
    workspaceRoot,
    'node_modules/@silencelaboratories/dkls-wasm-ll-web/dkls-wasm-ll-web.js'
  ),
  'entities/lib/maps/entities.json': path.resolve(
    workspaceRoot,
    'node_modules/entities/lib/maps/entities.json'
  ),
}

// config.resolver.extraNodeModules = require('node-libs-expo')
config.resolver.assetExts = metroDefault.assetExts.concat(['wasm'])

module.exports = config
