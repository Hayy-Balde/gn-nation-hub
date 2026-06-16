import { queryRows, type DbRow } from './db';

export type ZoneKind = 'regions' | 'prefectures' | 'communes' | 'quartiers' | 'secteurs';
type ParentKind = ZoneKind | 'pays';

export type Zone = {
    id: number;
    nom: string;
    code: string | null;
    parent?: {
        id: number;
        nom: string;
        kind: ParentKind;
    } | null;
};

export type ZoneSummary = {
    regions: number;
    prefectures: number;
    communes: number;
    quartiers: number;
    secteurs: number;
};

type ZoneConfig = {
    table: string;
    parentTable?: string;
    parentKey?: string;
    parentKind?: ParentKind;
};

const zoneConfigs: Record<ZoneKind, ZoneConfig> = {
    regions: { table: 'regions', parentTable: 'pays', parentKey: 'pays_id', parentKind: 'pays' },
    prefectures: { table: 'prefectures', parentTable: 'regions', parentKey: 'region_id', parentKind: 'regions' },
    communes: { table: 'communes', parentTable: 'prefectures', parentKey: 'prefecture_id', parentKind: 'prefectures' },
    quartiers: { table: 'quartiers', parentTable: 'communes', parentKey: 'commune_id', parentKind: 'communes' },
    secteurs: { table: 'secteurs', parentTable: 'quartiers', parentKey: 'quartier_id', parentKind: 'quartiers' },
};

const childRelations: Partial<Record<ZoneKind, ZoneKind>> = {
    regions: 'prefectures',
    prefectures: 'communes',
    communes: 'quartiers',
    quartiers: 'secteurs',
};

const relationKeys: Partial<Record<ZoneKind, string>> = {
    prefectures: 'region_id',
    communes: 'prefecture_id',
    quartiers: 'commune_id',
    secteurs: 'quartier_id',
};

function mapZone(row: DbRow, parentKind?: ParentKind): Zone {
    return {
        id: Number(row.id),
        nom: String(row.nom),
        code: row.code ? String(row.code) : null,
        parent: row.parent_id
            ? {
                  id: Number(row.parent_id),
                  nom: String(row.parent_nom),
                  kind: parentKind ?? 'pays',
              }
            : null,
    };
}

export function getChildKind(kind: ZoneKind) {
    return childRelations[kind];
}

export async function listZones(kind: ZoneKind, limit = 60) {
    const config = zoneConfigs[kind];
    const parentJoin = config.parentTable && config.parentKey
        ? `left join ${config.parentTable} parent on parent.id = zone.${config.parentKey}`
        : '';

    const rows = await queryRows<DbRow>(
        `select zone.id, zone.nom, zone.code, parent.id as parent_id, parent.nom as parent_nom
         from ${config.table} zone
         ${parentJoin}
         where coalesce(zone.est_actif, 1) = 1
         order by zone.nom asc
         limit :limit`,
        { limit },
    );

    return rows.map((row) => mapZone(row, config.parentKind));
}

export async function getZone(kind: ZoneKind, id: number) {
    const config = zoneConfigs[kind];
    const parentJoin = config.parentTable && config.parentKey
        ? `left join ${config.parentTable} parent on parent.id = zone.${config.parentKey}`
        : '';

    const rows = await queryRows<DbRow>(
        `select zone.id, zone.nom, zone.code, parent.id as parent_id, parent.nom as parent_nom
         from ${config.table} zone
         ${parentJoin}
         where zone.id = :id
         limit 1`,
        { id },
    );

    return rows[0] ? mapZone(rows[0], config.parentKind) : null;
}

export async function listChildren(kind: ZoneKind, id: number) {
    const childKind = getChildKind(kind);

    if (!childKind) {
        return [];
    }

    const childConfig = zoneConfigs[childKind];
    const relationKey = relationKeys[childKind];

    const rows = await queryRows<DbRow>(
        `select child.id, child.nom, child.code, parent.id as parent_id, parent.nom as parent_nom
         from ${childConfig.table} child
         left join ${zoneConfigs[kind].table} parent on parent.id = child.${relationKey}
         where child.${relationKey} = :id and coalesce(child.est_actif, 1) = 1
         order by child.nom asc`,
        { id },
    );

    return rows.map((row) => mapZone(row, kind));
}

export async function getSummary(): Promise<ZoneSummary> {
    const rows = await queryRows<DbRow>(
        `select
            (select count(*) from regions where coalesce(est_actif, 1) = 1) as regions,
            (select count(*) from prefectures where coalesce(est_actif, 1) = 1) as prefectures,
            (select count(*) from communes where coalesce(est_actif, 1) = 1) as communes,
            (select count(*) from quartiers where coalesce(est_actif, 1) = 1) as quartiers,
            (select count(*) from secteurs where coalesce(est_actif, 1) = 1) as secteurs`,
    );

    const row = rows[0];
    return {
        regions: Number(row.regions),
        prefectures: Number(row.prefectures),
        communes: Number(row.communes),
        quartiers: Number(row.quartiers),
        secteurs: Number(row.secteurs),
    };
}

export const zoneLabels: Record<ZoneKind, { singular: string; plural: string; childTitle?: string }> = {
    regions: { singular: 'Région', plural: 'Régions', childTitle: 'Préfectures' },
    prefectures: { singular: 'Préfecture', plural: 'Préfectures', childTitle: 'Communes' },
    communes: { singular: 'Commune', plural: 'Communes', childTitle: 'Quartiers' },
    quartiers: { singular: 'Quartier', plural: 'Quartiers', childTitle: 'Secteurs' },
    secteurs: { singular: 'Secteur', plural: 'Secteurs' },
};
