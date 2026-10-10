import { coreCatalog } from './packages/weimo-ui-core/manifest'

const packageCatalogs = [coreCatalog] as const

export type ComponentPackageName = (typeof packageCatalogs)[number]['id']
export type ComponentId = (typeof packageCatalogs)[number]['pages'][number]['id']

export type ComponentManifestItem = {
  id: string
  name: string
  exportName?: string
  registryName: string
  packageExport: string
  packageName: ComponentPackageName
  page: ComponentId
  docs: boolean
  registry: true
}

export const componentPackages = packageCatalogs.map(({ id, title }) => ({ id, title }))

export const componentManifest: ComponentManifestItem[] = packageCatalogs.flatMap(
  (packageCatalog) => packageCatalog.pages.flatMap((page) => [
    {
      id: page.id,
      name: page.name,
      ...('exportName' in page ? { exportName: page.exportName } : {}),
      registryName: page.registryName,
      packageExport: page.packageExport,
      packageName: packageCatalog.id,
      page: page.id,
      docs: true,
      registry: true as const,
    },
    ...('components' in page ? page.components : []).map((component) => ({
      ...component,
      packageName: packageCatalog.id,
      page: page.id,
      docs: false,
      registry: true as const,
    })),
  ]),
)
