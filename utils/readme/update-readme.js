const getResourcesList = require('../get-resources-list')
const createTree = require('./create-tree')
const createIndex = require('./create-index')
const createTables = require('./create-tables')
const writeToFile = require('../write-to-file')

const resourcesList = getResourcesList()

const url = 'https://devresourc.es/?ref=github-readme'

const logo = `<a href="${url}"><p align="center"><img width="5000" src="./assets/logo.png" /></p></a>\n\n`

const description = `<div align="center">The resources that power <a href="${url}" target="_blank" rel="noopener">Dev Resources</a></div>\n\n`

const warning =
    '---\n>❗️ This `README.md` file and the `/db` folder are auto-generated, so please ***do not*** edit them. Changes related to resources should happen within the `/resources` folder.\n---\n\n'

const contributionGuide = 'To add a resource, check the [contributing guide](CONTRIBUTING.md).\n\n'

const publicApisLink = `Looking for public APIs? Visit [github.com/public-apis-dev/public-apis](https://github.com/public-apis-dev/public-apis).\n\n`

const resourcesCount = `### Total resources: ${resourcesList.length}\n\n`

async function updateReadme() {
    try {
        const resourcesTree = createTree(resourcesList)
        const index = createIndex(resourcesTree)
        const tables = createTables(resourcesTree)

        await writeToFile({
            data: `${logo} ${description} ${warning} ${contributionGuide}${publicApisLink} ${resourcesCount} ${index} ${tables}`,
            filePath: './README.md',
        })
    } catch (error) {
        throw new Error(error)
    }
}

updateReadme()
