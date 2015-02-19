# umdt
Unified Mobile Device Tracker

## Useful queries

`select * from data where tracking_data @> '{"shost": "6c:ad:f8:8b:23:0"}';`

`select count(*), tracking_data->'shost' as shost from data group by shost;`

`select count(*), tracking_data->'shost' as shost from data group by shost having count(*) > 4;`


