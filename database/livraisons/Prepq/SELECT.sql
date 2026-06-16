SELECT
	p.id as paysId,
    p.libelle as pays,
	r.id as regionsId,
    r.libelle as regions
FROM lapostegnapp.regions r
LEFT JOIN lapostegnapp.payss p on p.id = lapostegnapp.r.paysId

;
SELECT
	r.id as regionsId,
    r.libelle as regions,
    pr.id as prefecturesId,
    pr.libelle as prefectures
FROM lapostegnapp.prefectures pr
LEFT JOIN lapostegnapp.regions r on r.id = lapostegnapp.pr.regionId

;
SELECT
    pr.id as prefecturesId,
    pr.libelle as prefectures,
    c.id as communesId,
    c.libelle as communes,
    q.id as quartierdistrictsId,
    q.libelle as quartierdistricts
FROM lapostegnapp.quartierdistricts q
LEFT JOIN lapostegnapp.communes c on c.id = lapostegnapp.q.communeId
LEFT JOIN lapostegnapp.prefectures pr on pr.id = lapostegnapp.c.prefectureId

;
SELECT
    c.id as communesId,
    c.libelle as communes,
    q.id as quartierdistrictsId,
    q.libelle as quartierdistricts
FROM lapostegnapp.quartierdistricts q
LEFT JOIN lapostegnapp.communes c on c.id = lapostegnapp.q.communeId

;
SELECT
    q.id as quartierdistrictsId,
    q.libelle as quartierdistricts,
    s.id as secteursId,
    s.libelle as secteurs
FROM lapostegnapp.secteurs s
LEFT JOIN lapostegnapp.quartierdistricts q on q.id = lapostegnapp.s.quartierdistrictId

;
