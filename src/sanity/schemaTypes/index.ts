import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolio'
import { blockTextType } from './blockText'
import { blockImageTextType } from './blockImageText'
import { blockStatsType } from './blockStats'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType, blockTextType, blockImageTextType, blockStatsType],
}
