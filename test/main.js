import {compileURLs} from '../mod.js'
const result = window.result = await compileURLs([new URL('./main.urls', import.meta.url).href])
document.body.append(result.documentFragment)