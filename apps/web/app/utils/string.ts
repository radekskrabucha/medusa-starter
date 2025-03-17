import { kebabCase } from 'scule'
import { appName } from '~web/config/app'

export const getAppNameKebabCase = () => kebabCase(appName.replace(' ', ''))
