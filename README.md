# umdt
Unified Mobile Device Tracker

## Useful queries

`select * from data where tracking_data @> '{"shost": "6c:ad:f8:8b:23:0"}';`

`select count(*), tracking_data->'shost' as shost from data group by shost;`

`select count(*), tracking_data->'shost' as shost from data group by shost having count(*) > 4;`

```sql
select count(*), trunc(mac::macaddr) as mac_prefix
from (select tracking_data->>'shost' as mac from data group by mac)S
group by mac_prefix
order by count desc;
```

`select * from data where created_at > NOW() - INTERVAL '1 minute';`

`select count(*), tracking_data->'shost' as mac from data where created_at > NOW() - INTERVAL '4 minutes' group by mac order by count desc;`

`select trunc(mac::macaddr) as mac_prefix from (select tracking_data->>'shost' as mac from data group by mac)S group by mac_prefix order by count(*) desc;`
